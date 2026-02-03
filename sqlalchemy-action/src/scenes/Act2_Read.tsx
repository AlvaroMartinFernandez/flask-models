import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  interpolate,
} from 'remotion';
import { AnimatedTitle } from '../components/AnimatedTitle';
import { CodeBlock } from '../components/CodeBlock';
import { AnimatedList } from '../components/AnimatedList';
import { codeSnippets } from '../data/codeSnippets';
import { TIMINGS } from '../data/timings';
import { theme } from '../styles/theme';

export const Act2_Read: React.FC = () => {
  const { act2 } = TIMINGS;

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.background }}>
      {/* Seccion 1: GET /users - Obtener todos */}
      <Sequence from={act2.getAll.start} durationInFrames={act2.getAll.duration}>
        <GetAllSection />
      </Sequence>

      {/* Seccion 2: GET /users/<id> - Obtener por ID */}
      <Sequence from={act2.getById.start} durationInFrames={act2.getById.duration}>
        <GetByIdSection />
      </Sequence>

      {/* Seccion 3: filter_by() */}
      <Sequence from={act2.filterBy.start} durationInFrames={act2.filterBy.duration}>
        <FilterBySection />
      </Sequence>
    </AbsoluteFill>
  );
};

// ===== GET ALL =====
const GetAllSection: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing.xxl,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.lg }}>
        <HttpBadge method="GET" color={theme.colors.http.get} />
        <AnimatedTitle
          text="Obtener Todos los Usuarios"
          subtitle="/users"
          fontSize={theme.fontSizes.xl}
          color={theme.colors.http.get}
        />
      </div>

      <div
        style={{
          flex: 1,
          display: 'flex',
          gap: theme.spacing.xl,
          marginTop: theme.spacing.lg,
          alignItems: 'center',
        }}
      >
        <div style={{ flex: 1 }}>
          <CodeBlock
            code={codeSnippets.getAllEndpoint}
            language="python"
            fontSize={theme.fontSizes.codeSmall}
            animateLines
            durationInFrames={400}
            annotation="User.query.all() trae todos los registros"
          />
        </div>

        <div style={{ flex: 1 }}>
          <CodeBlock
            code={codeSnippets.queryMethods}
            language="python"
            fontSize={theme.fontSizes.codeSmall}
            animateLines
            startFrame={300}
            durationInFrames={400}
            annotation="3 formas de consultar datos"
          />
        </div>
      </div>

      {/* Flujo visual */}
      <FlowBar
        steps={['GET /users', 'query.all()', 'serialize()', 'jsonify()', '200 OK']}
        frame={frame}
        startDelay={700}
      />
    </AbsoluteFill>
  );
};

// ===== GET BY ID =====
const GetByIdSection: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing.xxl,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.lg }}>
        <HttpBadge method="GET" color={theme.colors.http.get} />
        <AnimatedTitle
          text="Obtener Usuario por ID"
          subtitle="/users/<id>"
          fontSize={theme.fontSizes.xl}
          color={theme.colors.http.get}
        />
      </div>

      <div
        style={{
          flex: 1,
          display: 'flex',
          gap: theme.spacing.xl,
          marginTop: theme.spacing.lg,
        }}
      >
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <CodeBlock
            code={codeSnippets.getByIdEndpoint}
            language="python"
            fontSize={theme.fontSizes.codeSmall}
            animateLines
            durationInFrames={400}
            highlightLines={[4, 5]}
            annotation="query.get() busca por primary key"
          />
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <CodeBlock
            code={codeSnippets.serializeMethod}
            language="python"
            fontSize={theme.fontSizes.codeSmall}
            animateLines
            startFrame={400}
            durationInFrames={300}
            annotation="serialize() convierte a diccionario"
          />
        </div>
      </div>

      <FlowBar
        steps={['GET /users/1', 'query.get(1)', 'None?', 'abort(404)', 'serialize()', '200 OK']}
        frame={frame}
        startDelay={700}
      />
    </AbsoluteFill>
  );
};

// ===== FILTER BY =====
const FilterBySection: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'row',
        padding: theme.spacing.xxl,
        gap: theme.spacing.xxl,
      }}
    >
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <AnimatedTitle
          text="query.filter_by()"
          subtitle="Buscar por cualquier campo"
          fontSize={theme.fontSizes.xl}
          color={theme.colors.warning}
        />

        <div style={{ marginTop: theme.spacing.xl }}>
          <AnimatedList
            items={[
              'Buscar por email, username, etc.',
              '.first() -> primer resultado o None',
              '.all() -> lista de resultados',
              'Ideal para verificar duplicados',
            ]}
            icon=">"
            delayBetweenItems={25}
          />
        </div>
      </div>

      <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: theme.spacing.lg }}>
        <CodeBlock
          code={codeSnippets.filterByBasico}
          language="python"
          fontSize={theme.fontSizes.codeXs}
          animateLines
          durationInFrames={500}
          annotation="Ejemplos de filter_by()"
        />

        <CodeBlock
          code={codeSnippets.filterByDuplicados}
          language="python"
          fontSize={theme.fontSizes.codeXs}
          animateLines
          startFrame={500}
          durationInFrames={300}
          annotation="Verificar duplicados antes de crear"
        />
      </div>
    </AbsoluteFill>
  );
};

// ===== Componentes auxiliares =====

const HttpBadge: React.FC<{ method: string; color: string }> = ({ method, color }) => (
  <div
    style={{
      backgroundColor: color,
      color: 'white',
      padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
      borderRadius: theme.borderRadius.md,
      fontFamily: theme.fonts.code,
      fontSize: theme.fontSizes.md,
      fontWeight: theme.fontWeights.bold,
    }}
  >
    {method}
  </div>
);

interface FlowBarProps {
  steps: string[];
  frame: number;
  startDelay: number;
}

const FlowBar: React.FC<FlowBarProps> = ({ steps, frame, startDelay }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: theme.spacing.sm,
      marginTop: theme.spacing.md,
      padding: theme.spacing.md,
      backgroundColor: '#0e0e0e',
      borderRadius: theme.borderRadius.lg,
    }}
  >
    {steps.map((step, index) => {
      const delay = startDelay + index * 15;
      const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });

      return (
        <React.Fragment key={index}>
          <div
            style={{
              opacity,
              backgroundColor: theme.colors.primary,
              color: 'white',
              padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
              borderRadius: theme.borderRadius.md,
              fontSize: theme.fontSizes.xs,
              fontFamily: theme.fonts.code,
              whiteSpace: 'nowrap',
            }}
          >
            {step}
          </div>
          {index < steps.length - 1 && (
            <div style={{ opacity, color: theme.colors.secondary, fontSize: theme.fontSizes.sm }}>
              {'->'}
            </div>
          )}
        </React.Fragment>
      );
    })}
  </div>
);
