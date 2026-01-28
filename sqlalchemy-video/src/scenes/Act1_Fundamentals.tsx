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

export const Act1_Fundamentals: React.FC = () => {
  const { act1 } = TIMINGS;
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.background }}>
      {/* Seccion 1: Intro y titulo (0-15s) */}
      <Sequence from={act1.intro.start} durationInFrames={act1.intro.duration}>
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: theme.spacing.xxl,
          }}
        >
          <AnimatedTitle
            text="SQLAlchemy Models"
            subtitle="en Flask"
            color={theme.colors.primary}
          />

          <div
            style={{
              marginTop: theme.spacing.xl,
              fontSize: theme.fontSizes.lg,
              color: theme.colors.secondary,
              opacity: interpolate(frame, [60, 90], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          >
            ORM, Modelos, Relaciones y Serializacion
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Seccion 2: Que es un ORM (15-45s) */}
      <Sequence
        from={act1.queEsOrm.start}
        durationInFrames={act1.queEsOrm.duration}
      >
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing.xxl,
          }}
        >
          <AnimatedTitle
            text="Que es un ORM?"
            subtitle="Object Relational Mapping"
            fontSize={theme.fontSizes.xl}
            color={theme.colors.primary}
          />

          <div
            style={{
              flex: 1,
              display: 'flex',
              gap: theme.spacing.xxl,
              marginTop: theme.spacing.xl,
            }}
          >
            {/* Lado izquierdo: Sin ORM */}
            <div style={{ flex: 1 }}>
              <ORMComparisonBox
                title="Sin ORM"
                subtitle="SQL directo"
                color={theme.colors.error}
                frame={frame - act1.queEsOrm.start}
                delay={30}
              />
              <div style={{ marginTop: theme.spacing.lg }}>
                <CodeBlock
                  code={codeSnippets.sinOrm}
                  language="python"
                  fontSize={theme.fontSizes.codeSmall}
                  animateLines
                  durationInFrames={300}
                />
              </div>
            </div>

            {/* Centro: Flecha */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: interpolate(
                  frame - act1.queEsOrm.start,
                  [300, 350],
                  [0, 1],
                  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                ),
              }}
            >
              <div
                style={{
                  fontSize: theme.fontSizes.xxl,
                  color: theme.colors.secondary,
                }}
              >
                vs
              </div>
            </div>

            {/* Lado derecho: Con ORM */}
            <div style={{ flex: 1 }}>
              <ORMComparisonBox
                title="Con ORM"
                subtitle="Objetos Python"
                color={theme.colors.success}
                frame={frame - act1.queEsOrm.start}
                delay={400}
              />
              <div style={{ marginTop: theme.spacing.lg }}>
                <CodeBlock
                  code={codeSnippets.conOrm}
                  language="python"
                  fontSize={theme.fontSizes.codeSmall}
                  animateLines
                  startFrame={400}
                  durationInFrames={300}
                />
              </div>
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Seccion 3: Que es SQLAlchemy (45-70s) */}
      <Sequence
        from={act1.queEsSqlalchemy.start}
        durationInFrames={act1.queEsSqlalchemy.duration}
      >
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'row',
            padding: theme.spacing.xxl,
            gap: theme.spacing.xxl,
          }}
        >
          {/* Lado izquierdo: Info */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <AnimatedTitle
              text="SQLAlchemy"
              subtitle="El ORM mas popular de Python"
              fontSize={theme.fontSizes.xl}
              color={theme.colors.sqlalchemy.model}
            />

            <div style={{ marginTop: theme.spacing.xl }}>
              <AnimatedList
                items={[
                  'Facilita comunicacion Python <-> BD',
                  'Soporta PostgreSQL, MySQL, SQLite...',
                  'Flask-SQLAlchemy para integracion',
                  'Sintaxis moderna con type hints',
                ]}
                icon=">"
                delayBetweenItems={20}
              />
            </div>
          </div>

          {/* Lado derecho: Instalacion */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <CodeBlock
              code={codeSnippets.instalacion}
              language="bash"
              animateLines
              durationInFrames={200}
              annotation="Instalacion con pip"
            />

            <DatabasesGrid frame={frame - act1.queEsSqlalchemy.start} />
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Seccion 4: Inicializacion (70-120s) */}
      <Sequence
        from={act1.inicializacion.start}
        durationInFrames={act1.inicializacion.duration}
      >
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing.xxl,
          }}
        >
          <AnimatedTitle
            text="Inicializar SQLAlchemy"
            subtitle="Configuracion en Flask"
            fontSize={theme.fontSizes.xl}
            color={theme.colors.primary}
          />

          <div
            style={{
              flex: 1,
              display: 'flex',
              gap: theme.spacing.xl,
              marginTop: theme.spacing.lg,
            }}
          >
            {/* Paso 1: models.py */}
            <div style={{ flex: 1 }}>
              <StepIndicator
                step={1}
                title="models.py"
                frame={frame - act1.inicializacion.start}
                delay={0}
              />
              <CodeBlock
                code={codeSnippets.modelsInit}
                language="python"
                animateLines
                durationInFrames={200}
                annotation="Crear instancia de SQLAlchemy"
              />
            </div>

            {/* Paso 2: app.py */}
            <div style={{ flex: 1.2 }}>
              <StepIndicator
                step={2}
                title="app.py"
                frame={frame - act1.inicializacion.start}
                delay={300}
              />
              <CodeBlock
                code={codeSnippets.appConfig}
                language="python"
                fontSize={theme.fontSizes.codeSmall}
                animateLines
                startFrame={300}
                durationInFrames={400}
                annotation="Configurar y conectar con Flask"
              />
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};

// Componente de comparacion ORM
interface ORMComparisonBoxProps {
  title: string;
  subtitle: string;
  color: string;
  frame: number;
  delay: number;
}

const ORMComparisonBox: React.FC<ORMComparisonBoxProps> = ({
  title,
  subtitle,
  color,
  frame,
  delay,
}) => {
  const opacity = interpolate(frame, [delay, delay + 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        opacity,
        backgroundColor: '#0e0e0e',
        border: `2px solid ${color}`,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
        textAlign: 'center',
      }}
    >
      <div
        style={{
          color,
          fontWeight: theme.fontWeights.bold,
          fontSize: theme.fontSizes.lg,
        }}
      >
        {title}
      </div>
      <div
        style={{
          color: theme.colors.textDark,
          fontSize: theme.fontSizes.sm,
          marginTop: theme.spacing.xs,
        }}
      >
        {subtitle}
      </div>
    </div>
  );
};

// Grid de bases de datos soportadas
interface DatabasesGridProps {
  frame: number;
}

const DatabasesGrid: React.FC<DatabasesGridProps> = ({ frame }) => {
  const databases = ['PostgreSQL', 'MySQL', 'SQLite', 'Oracle'];

  return (
    <div
      style={{
        marginTop: theme.spacing.xl,
        display: 'flex',
        flexWrap: 'wrap',
        gap: theme.spacing.md,
        justifyContent: 'center',
      }}
    >
      {databases.map((db, index) => {
        const opacity = interpolate(
          frame,
          [200 + index * 30, 230 + index * 30],
          [0, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        return (
          <div
            key={db}
            style={{
              opacity,
              backgroundColor: theme.colors.primary,
              color: 'white',
              padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
              borderRadius: theme.borderRadius.md,
              fontSize: theme.fontSizes.sm,
            }}
          >
            {db}
          </div>
        );
      })}
    </div>
  );
};

// Indicador de paso
interface StepIndicatorProps {
  step: number;
  title: string;
  frame: number;
  delay: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  step,
  title,
  frame,
  delay,
}) => {
  const opacity = interpolate(frame, [delay, delay + 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        opacity,
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing.md,
        marginBottom: theme.spacing.md,
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          backgroundColor: theme.colors.primary,
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: theme.fontWeights.bold,
          fontSize: theme.fontSizes.md,
        }}
      >
        {step}
      </div>
      <div
        style={{
          fontFamily: theme.fonts.code,
          fontSize: theme.fontSizes.md,
          color: theme.colors.secondary,
        }}
      >
        {title}
      </div>
    </div>
  );
};
