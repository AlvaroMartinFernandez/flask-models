import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  interpolate,
} from 'remotion';
import { AnimatedTitle } from '../components/AnimatedTitle';
import { CodeBlock } from '../components/CodeBlock';
import { codeSnippets } from '../data/codeSnippets';
import { TIMINGS } from '../data/timings';
import { theme } from '../styles/theme';

export const Act3_Create: React.FC = () => {
  const { act3 } = TIMINGS;

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.background }}>
      {/* Seccion 1: POST basico */}
      <Sequence from={act3.postBasico.start} durationInFrames={act3.postBasico.duration}>
        <PostBasicoSection />
      </Sequence>

      {/* Seccion 2: Validaciones y duplicados */}
      <Sequence from={act3.validaciones.start} durationInFrames={act3.validaciones.duration}>
        <ValidacionesSection />
      </Sequence>

      {/* Seccion 3: POST con relacion */}
      <Sequence from={act3.postRelacion.start} durationInFrames={act3.postRelacion.duration}>
        <PostRelacionSection />
      </Sequence>
    </AbsoluteFill>
  );
};

// ===== POST Basico =====
const PostBasicoSection: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: `${theme.spacing.lg}px ${theme.spacing.xxl}px`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.md }}>
        <HttpBadge method="POST" color={theme.colors.http.post} />
        <span style={{ color: theme.colors.http.post, fontSize: theme.fontSizes.lg, fontFamily: theme.fonts.sans, fontWeight: theme.fontWeights.bold }}>
          Crear Usuario
        </span>
        <span style={{ color: theme.colors.textDark, fontSize: theme.fontSizes.sm, fontFamily: theme.fonts.code }}>
          /users
        </span>
      </div>

      <div style={{ flex: 1, display: 'flex', gap: theme.spacing.xl, marginTop: theme.spacing.xs, overflow: 'hidden' }}>
        <div style={{ flex: 1.3 }}>
          <CodeBlock
            code={codeSnippets.postEndpoint}
            language="python"
            fontSize={theme.fontSizes.codeTiny}
            animateLines
            durationInFrames={600}
            annotation="Endpoint completo en app.py"
          />
        </div>

        <div style={{ flex: 1 }}>
          <CodeBlock
            code={codeSnippets.sessionWorkflow}
            language="python"
            fontSize={theme.fontSizes.codeXs}
            animateLines
            startFrame={400}
            durationInFrames={400}
            annotation="Flujo: crear -> add -> commit"
          />
        </div>
      </div>

      {/* Flow bar */}
      <FlowBar
        steps={['request.get_json()', 'Validar', 'User(...)', 'db.session.add()', 'commit()', '201 Created']}
        frame={frame}
        startDelay={900}
        colors={[
          theme.colors.http.post,
          theme.colors.warning,
          theme.colors.sqlalchemy.model,
          theme.colors.secondary,
          theme.colors.success,
          theme.colors.status.success,
        ]}
      />
    </AbsoluteFill>
  );
};

// ===== Validaciones =====
const ValidacionesSection: React.FC = () => {
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
        text="Validaciones"
        subtitle="Campos obligatorios y duplicados"
        fontSize={theme.fontSizes.xl}
        color={theme.colors.warning}
      />

      <div style={{ flex: 1, display: 'flex', gap: theme.spacing.xl, marginTop: theme.spacing.lg }}>
        {/* Validar campos */}
        <div style={{ flex: 1 }}>
          <SectionBox
            title="1. Campos Obligatorios"
            color={theme.colors.warning}
            frame={frame}
            delay={30}
          />
          <div style={{ marginTop: theme.spacing.md }}>
            <CodeBlock
              code={codeSnippets.validacionCampos}
              language="python"
              fontSize={theme.fontSizes.codeXs}
              animateLines
              startFrame={50}
              durationInFrames={400}
              annotation="abort(400) si falta un campo"
            />
          </div>
        </div>

        {/* Verificar duplicados */}
        <div style={{ flex: 1 }}>
          <SectionBox
            title="2. Verificar Duplicados"
            color={theme.colors.error}
            frame={frame}
            delay={400}
          />
          <div style={{ marginTop: theme.spacing.md }}>
            <CodeBlock
              code={codeSnippets.filterByDuplicados}
              language="python"
              fontSize={theme.fontSizes.codeXs}
              animateLines
              startFrame={420}
              durationInFrames={300}
              annotation="abort(409) si ya existe"
            />
          </div>
        </div>
      </div>

      {/* Status codes */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: theme.spacing.xl, marginTop: theme.spacing.lg }}>
        {[
          { code: '400', label: 'Bad Request', color: theme.colors.status.clientError },
          { code: '409', label: 'Conflict', color: theme.colors.status.clientError },
          { code: '201', label: 'Created', color: theme.colors.status.success },
        ].map((item, index) => {
          const delay = 800 + index * 20;
          const opacity = interpolate(frame, [delay, delay + 20], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          return (
            <div key={item.code} style={{ opacity, display: 'flex', alignItems: 'center', gap: theme.spacing.sm }}>
              <div
                style={{
                  backgroundColor: item.color,
                  color: 'white',
                  padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
                  borderRadius: theme.borderRadius.md,
                  fontFamily: theme.fonts.code,
                  fontSize: theme.fontSizes.sm,
                  fontWeight: theme.fontWeights.bold,
                }}
              >
                {item.code}
              </div>
              <span style={{ color: theme.colors.text, fontFamily: theme.fonts.sans, fontSize: theme.fontSizes.sm }}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ===== POST con relacion =====
const PostRelacionSection: React.FC = () => {
  const frame = useCurrentFrame();
  const noteOpacity = interpolate(frame, [1200, 1230], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: `${theme.spacing.lg}px ${theme.spacing.xxl}px`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.md }}>
        <HttpBadge method="POST" color={theme.colors.http.post} />
        <span style={{ color: theme.colors.http.post, fontSize: theme.fontSizes.lg, fontFamily: theme.fonts.sans, fontWeight: theme.fontWeights.bold }}>
          Crear con Relacion
        </span>
        <span style={{ color: theme.colors.textDark, fontSize: theme.fontSizes.sm, fontFamily: theme.fonts.code }}>
          /users/with-profile
        </span>
      </div>

      <div style={{ flex: 1, display: 'flex', gap: theme.spacing.xl, marginTop: theme.spacing.xs, overflow: 'hidden' }}>
        <div style={{ flex: 1 }}>
          <CodeBlock
            code={codeSnippets.postWithProfileJson}
            language="json"
            fontSize={theme.fontSizes.codeSmall}
            animateLines
            durationInFrames={300}
            annotation="JSON del body (User + Profile)"
          />
        </div>

        <div style={{ flex: 1.3 }}>
          <CodeBlock
            code={codeSnippets.postWithProfileEndpoint}
            language="python"
            fontSize={theme.fontSizes.codeTiny}
            animateLines
            startFrame={200}
            durationInFrames={700}
            annotation="new_user.profile = new_profile"
          />
        </div>
      </div>

      {/* Nota */}
      <div
        style={{
          opacity: noteOpacity,
          marginTop: theme.spacing.md,
          padding: theme.spacing.md,
          backgroundColor: '#1a3a2a',
          border: `2px solid ${theme.colors.success}`,
          borderRadius: theme.borderRadius.lg,
          color: theme.colors.success,
          fontFamily: theme.fonts.sans,
          fontSize: theme.fontSizes.sm,
          lineHeight: theme.lineHeights.relaxed,
        }}
      >
        Al asignar new_user.profile = new_profile, SQLAlchemy crea ambos registros y establece la FK con un solo db.session.commit()
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

const SectionBox: React.FC<{ title: string; color: string; frame: number; delay: number }> = ({ title, color, frame, delay }) => {
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
        color,
        fontWeight: theme.fontWeights.bold,
        fontSize: theme.fontSizes.md,
        fontFamily: theme.fonts.sans,
      }}
    >
      {title}
    </div>
  );
};

interface FlowBarProps {
  steps: string[];
  frame: number;
  startDelay: number;
  colors?: string[];
}

const FlowBar: React.FC<FlowBarProps> = ({ steps, frame, startDelay, colors }) => (
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
      const delay = startDelay + index * 20;
      const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
      const bg = colors ? colors[index] : theme.colors.primary;

      return (
        <React.Fragment key={index}>
          <div style={{ opacity, backgroundColor: bg, color: 'white', padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`, borderRadius: theme.borderRadius.md, fontSize: theme.fontSizes.xs, fontFamily: theme.fonts.code, whiteSpace: 'nowrap' }}>
            {step}
          </div>
          {index < steps.length - 1 && (
            <div style={{ opacity, color: theme.colors.textDark, fontSize: theme.fontSizes.xs }}>{'->'}  </div>
          )}
        </React.Fragment>
      );
    })}
  </div>
);
