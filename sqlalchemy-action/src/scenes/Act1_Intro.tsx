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

export const Act1_Intro: React.FC = () => {
  const { act1 } = TIMINGS;
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.background }}>
      {/* Seccion 1: Intro - Que es CRUD */}
      <Sequence from={act1.intro.start} durationInFrames={act1.intro.duration}>
        <IntroSection />
      </Sequence>

      {/* Seccion 2: Estructura del proyecto */}
      <Sequence from={act1.estructura.start} durationInFrames={act1.estructura.duration}>
        <EstructuraSection />
      </Sequence>

      {/* Seccion 3: Setup Flask + SQLAlchemy */}
      <Sequence from={act1.setup.start} durationInFrames={act1.setup.duration}>
        <SetupSection />
      </Sequence>
    </AbsoluteFill>
  );
};

// ===== Seccion Intro =====
const IntroSection: React.FC = () => {
  const frame = useCurrentFrame();

  return (
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
        text="SQLAlchemy Actions"
        subtitle="CRUD Endpoints en Flask"
        color={theme.colors.primary}
      />

      <div
        style={{
          marginTop: theme.spacing.xl,
          display: 'flex',
          gap: theme.spacing.lg,
        }}
      >
        {(['Create', 'Read', 'Update', 'Delete'] as const).map((op, index) => {
          const badgeColors = [
            theme.colors.crud.create,
            theme.colors.crud.read,
            theme.colors.crud.update,
            theme.colors.crud.delete,
          ];
          const methods = ['POST', 'GET', 'PUT', 'DELETE'];
          const opacity = interpolate(
            frame,
            [40 + index * 20, 60 + index * 20],
            [0, 1],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );

          return (
            <div
              key={op}
              style={{
                opacity,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: theme.spacing.sm,
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  backgroundColor: badgeColors[index],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: theme.fontSizes.xl,
                  fontWeight: theme.fontWeights.bold,
                  color: 'white',
                  fontFamily: theme.fonts.sans,
                }}
              >
                {op[0]}
              </div>
              <div style={{ color: theme.colors.text, fontSize: theme.fontSizes.sm, fontFamily: theme.fonts.sans, fontWeight: theme.fontWeights.semibold }}>
                {op}
              </div>
              <div style={{ color: badgeColors[index], fontSize: theme.fontSizes.xs, fontFamily: theme.fonts.code, backgroundColor: '#0e0e0e', padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`, borderRadius: theme.borderRadius.md }}>
                {methods[index]}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: theme.spacing.xl, width: '60%' }}>
        <CodeBlock
          code={codeSnippets.crudExplicacion}
          language="python"
          animateLines
          startFrame={120}
          durationInFrames={400}
          fontSize={theme.fontSizes.codeSmall}
        />
      </div>
    </AbsoluteFill>
  );
};

// ===== Seccion Estructura =====
const EstructuraSection: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing.xxl,
      }}
    >
      <AnimatedTitle
        text="Estructura del Proyecto"
        subtitle="Solo 2 archivos: models.py y app.py"
        fontSize={theme.fontSizes.xl}
        color={theme.colors.primary}
      />

      <div
        style={{
          flex: 1,
          display: 'flex',
          gap: theme.spacing.xl,
          marginTop: theme.spacing.md,
          overflow: 'hidden',
        }}
      >
        {/* models.py */}
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <FileLabel
            filename="models.py"
            description="Modelo + Base de datos"
            color={theme.colors.sqlalchemy.model}
            frame={frame}
            delay={30}
          />
          <div style={{ marginTop: theme.spacing.xs }}>
            <CodeBlock
              code={codeSnippets.modelsPy}
              language="python"
              fontSize={theme.fontSizes.codeTiny}
              animateLines
              startFrame={50}
              durationInFrames={500}
            />
          </div>
        </div>

        {/* app.py */}
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <FileLabel
            filename="app.py"
            description="Config + Endpoints"
            color={theme.colors.secondary}
            frame={frame}
            delay={300}
          />
          <div style={{ marginTop: theme.spacing.xs }}>
            <CodeBlock
              code={codeSnippets.appPy}
              language="python"
              fontSize={theme.fontSizes.codeTiny}
              animateLines
              startFrame={320}
              durationInFrames={500}
            />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ===== Seccion Setup =====
const SetupSection: React.FC = () => {
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
          text="Configuracion"
          subtitle="Flask + SQLAlchemy + Migrate"
          fontSize={theme.fontSizes.xl}
          color={theme.colors.secondary}
        />
        <div style={{ marginTop: theme.spacing.xl }}>
          <AnimatedList
            items={[
              'pip install flask-sqlalchemy',
              'db = SQLAlchemy() en models.py',
              'db.init_app(app) en app.py',
              'flask db migrate para migraciones',
            ]}
            icon="$"
            delayBetweenItems={25}
          />
        </div>
      </div>

      <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: theme.spacing.lg }}>
        <CodeBlock
          code={codeSnippets.instalacion}
          language="bash"
          animateLines
          durationInFrames={150}
          annotation="Instalar con pip"
        />
        <CodeBlock
          code={codeSnippets.appSetup}
          language="python"
          fontSize={theme.fontSizes.codeXs}
          animateLines
          startFrame={200}
          durationInFrames={500}
          annotation="app.py completo"
        />
      </div>
    </AbsoluteFill>
  );
};

// ===== Componente FileLabel =====
interface FileLabelProps {
  filename: string;
  description: string;
  color: string;
  frame: number;
  delay: number;
}

const FileLabel: React.FC<FileLabelProps> = ({ filename, description, color, frame, delay }) => {
  const opacity = interpolate(frame, [delay, delay + 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{ opacity, display: 'flex', alignItems: 'center', gap: theme.spacing.md }}>
      <div
        style={{
          backgroundColor: color,
          color: 'white',
          padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
          borderRadius: theme.borderRadius.md,
          fontFamily: theme.fonts.code,
          fontSize: theme.fontSizes.md,
          fontWeight: theme.fontWeights.bold,
        }}
      >
        {filename}
      </div>
      <div style={{ color: theme.colors.textDark, fontFamily: theme.fonts.sans, fontSize: theme.fontSizes.sm }}>
        {description}
      </div>
    </div>
  );
};
