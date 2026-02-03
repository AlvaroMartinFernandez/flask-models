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

export const Act4_UpdateDelete: React.FC = () => {
  const { act4 } = TIMINGS;

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.background }}>
      {/* Seccion 1: PUT - Actualizar */}
      <Sequence from={act4.putUpdate.start} durationInFrames={act4.putUpdate.duration}>
        <PutSection />
      </Sequence>

      {/* Seccion 2: DELETE - Eliminar */}
      <Sequence from={act4.delete.start} durationInFrames={act4.delete.duration}>
        <DeleteSection />
      </Sequence>

      {/* Seccion 3: Error handling con abort */}
      <Sequence from={act4.errorHandling.start} durationInFrames={act4.errorHandling.duration}>
        <ErrorSection />
      </Sequence>

      {/* Seccion 4: Conclusion - Resumen */}
      <Sequence from={act4.conclusion.start} durationInFrames={act4.conclusion.duration}>
        <ConclusionSection />
      </Sequence>
    </AbsoluteFill>
  );
};

// ===== PUT Update =====
const PutSection: React.FC = () => {
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
        <HttpMethodBadge method="PUT" color={theme.colors.http.put} />
        <span style={{ color: theme.colors.http.put, fontSize: theme.fontSizes.lg, fontFamily: theme.fonts.sans, fontWeight: theme.fontWeights.bold }}>
          Actualizar Usuario
        </span>
        <span style={{ color: theme.colors.textDark, fontSize: theme.fontSizes.sm, fontFamily: theme.fonts.code }}>
          /users/{'<id>'}
        </span>
      </div>

      <div
        style={{
          flex: 1,
          display: 'flex',
          gap: theme.spacing.xl,
          marginTop: theme.spacing.xs,
          overflow: 'hidden',
        }}
      >
        <div style={{ flex: 1.3 }}>
          <CodeBlock
            code={codeSnippets.putEndpoint}
            language="python"
            fontSize={theme.fontSizes.codeTiny}
            animateLines
            durationInFrames={800}
            annotation="Solo actualiza campos enviados, verifica duplicados"
          />
        </div>

        <div style={{ flex: 0.7, display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
          <KeyPoint
            text="Buscar usuario por ID"
            icon="1"
            color={theme.colors.http.put}
            frame={frame}
            delay={200}
          />
          <KeyPoint
            text="Solo actualizar campos del body"
            icon="2"
            color={theme.colors.http.put}
            frame={frame}
            delay={400}
          />
          <KeyPoint
            text="Verificar duplicados con filter_by"
            icon="3"
            color={theme.colors.warning}
            frame={frame}
            delay={600}
          />
          <KeyPoint
            text="commit() guarda los cambios"
            icon="4"
            color={theme.colors.success}
            frame={frame}
            delay={800}
          />
        </div>
      </div>

      <FlowBar
        steps={['GET user', 'body?', 'filter_by()', 'update', 'commit()', '200 OK']}
        frame={frame}
        startDelay={1000}
        colors={[
          theme.colors.http.get,
          theme.colors.warning,
          theme.colors.warning,
          theme.colors.http.put,
          theme.colors.success,
          theme.colors.status.success,
        ]}
      />
    </AbsoluteFill>
  );
};

// ===== DELETE =====
const DeleteSection: React.FC = () => {
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
        <HttpMethodBadge method="DELETE" color={theme.colors.http.delete} />
        <AnimatedTitle
          text="Eliminar Usuario"
          subtitle="/users/<id>"
          fontSize={theme.fontSizes.xl}
          color={theme.colors.http.delete}
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
            code={codeSnippets.deleteEndpoint}
            language="python"
            fontSize={theme.fontSizes.codeSmall}
            animateLines
            durationInFrames={400}
            annotation="db.session.delete() + commit()"
          />
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: theme.spacing.lg }}>
          {/* Nota cascade */}
          <div
            style={{
              opacity: interpolate(frame, [300, 330], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
              padding: theme.spacing.md,
              backgroundColor: '#1a2a3a',
              border: `2px solid ${theme.colors.http.delete}`,
              borderRadius: theme.borderRadius.lg,
              color: theme.colors.text,
              fontFamily: theme.fonts.sans,
              fontSize: theme.fontSizes.sm,
              lineHeight: theme.lineHeights.relaxed,
            }}
          >
            El <span style={{ color: theme.colors.http.delete, fontFamily: theme.fonts.code }}>cascade="all, delete-orphan"</span> en
            la relacion hace que al borrar el User se borren automaticamente su perfil y ordenes.
          </div>
        </div>
      </div>

      {/* Cascade diagram */}
      <CascadeDiagram frame={frame} />
    </AbsoluteFill>
  );
};

// ===== Error Handling =====
const ErrorSection: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'row',
        padding: theme.spacing.xxl,
        gap: theme.spacing.xxl,
      }}
    >
      {/* Lado izquierdo: Codigo */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <AnimatedTitle
          text="abort()"
          subtitle="Manejo de errores HTTP"
          fontSize={theme.fontSizes.xl}
          color={theme.colors.error}
        />

        <div style={{ marginTop: theme.spacing.lg }}>
          <CodeBlock
            code={codeSnippets.abortExamples}
            language="python"
            fontSize={theme.fontSizes.codeXs}
            animateLines
            durationInFrames={400}
          />
        </div>
      </div>

      {/* Lado derecho: Status codes grid */}
      <div
        style={{
          flex: 0.8,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: theme.spacing.md,
        }}
      >
        <StatusCodeCard code="200" label="OK" description="Operacion exitosa" color={theme.colors.status.success} frame={frame} delay={30} />
        <StatusCodeCard code="201" label="Created" description="Recurso creado" color={theme.colors.status.success} frame={frame} delay={60} />
        <StatusCodeCard code="400" label="Bad Request" description="Datos invalidos" color={theme.colors.status.clientError} frame={frame} delay={90} />
        <StatusCodeCard code="404" label="Not Found" description="No encontrado" color={theme.colors.status.clientError} frame={frame} delay={120} />
        <StatusCodeCard code="409" label="Conflict" description="Duplicado" color={theme.colors.status.clientError} frame={frame} delay={150} />
        <StatusCodeCard code="500" label="Server Error" description="Error interno" color={theme.colors.status.serverError} frame={frame} delay={180} />
      </div>
    </AbsoluteFill>
  );
};

// ===== Conclusion =====
const ConclusionSection: React.FC = () => {
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
        text="Resumen de Endpoints"
        subtitle="7 rutas CRUD para usuarios"
        color={theme.colors.primary}
      />

      <div
        style={{
          marginTop: theme.spacing.xl,
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing.sm,
          width: '80%',
        }}
      >
        {[
          { method: 'GET', route: '/users', desc: 'Todos los usuarios', color: theme.colors.http.get },
          { method: 'GET', route: '/users/<id>', desc: 'Un usuario por ID', color: theme.colors.http.get },
          { method: 'POST', route: '/users', desc: 'Crear usuario', color: theme.colors.http.post },
          { method: 'PUT', route: '/users/<id>', desc: 'Actualizar usuario', color: theme.colors.http.put },
          { method: 'DELETE', route: '/users/<id>', desc: 'Eliminar usuario', color: theme.colors.http.delete },
          { method: 'POST', route: '/users/with-profile', desc: 'Crear con perfil', color: theme.colors.http.post },
          { method: 'GET', route: '/users/<id>/orders', desc: 'Usuario con ordenes', color: theme.colors.http.get },
        ].map((endpoint, index) => (
          <EndpointRow
            key={index}
            method={endpoint.method}
            route={endpoint.route}
            description={endpoint.desc}
            color={endpoint.color}
            frame={frame}
            delay={30 + index * 15}
          />
        ))}
      </div>

      <div
        style={{
          marginTop: theme.spacing.xl,
          opacity: interpolate(frame, [300, 330], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          color: theme.colors.secondary,
          fontSize: theme.fontSizes.lg,
          fontFamily: theme.fonts.sans,
          textAlign: 'center',
        }}
      >
        CRUD completo con SQLAlchemy + Flask
      </div>
    </AbsoluteFill>
  );
};

// ===== Componentes auxiliares =====

const HttpMethodBadge: React.FC<{ method: string; color: string }> = ({ method, color }) => (
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

interface KeyPointProps {
  text: string;
  icon: string;
  color: string;
  frame: number;
  delay: number;
}

const KeyPoint: React.FC<KeyPointProps> = ({ text, icon, color, frame, delay }) => {
  const opacity = interpolate(frame, [delay, delay + 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{ opacity, display: 'flex', alignItems: 'center', gap: theme.spacing.md }}>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          backgroundColor: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: theme.fonts.code,
          fontSize: theme.fontSizes.sm,
          fontWeight: theme.fontWeights.bold,
        }}
      >
        {icon}
      </div>
      <span style={{ color: theme.colors.text, fontFamily: theme.fonts.sans, fontSize: theme.fontSizes.sm }}>
        {text}
      </span>
    </div>
  );
};

interface StatusCodeCardProps {
  code: string;
  label: string;
  description: string;
  color: string;
  frame: number;
  delay: number;
}

const StatusCodeCard: React.FC<StatusCodeCardProps> = ({ code, label, description, color, frame, delay }) => {
  const opacity = interpolate(frame, [delay, delay + 20], [0, 1], {
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
        backgroundColor: '#0e0e0e',
        borderLeft: `4px solid ${color}`,
        padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
        borderRadius: theme.borderRadius.md,
      }}
    >
      <div style={{ color, fontFamily: theme.fonts.code, fontSize: theme.fontSizes.md, fontWeight: theme.fontWeights.bold, minWidth: 50 }}>
        {code}
      </div>
      <div style={{ color: theme.colors.text, fontFamily: theme.fonts.sans, fontSize: theme.fontSizes.sm }}>
        {label}
      </div>
      <div style={{ color: theme.colors.textDark, fontFamily: theme.fonts.sans, fontSize: theme.fontSizes.xs, marginLeft: 'auto' }}>
        {description}
      </div>
    </div>
  );
};

const CascadeDiagram: React.FC<{ frame: number }> = ({ frame }) => {
  const items = [
    { label: 'User', color: theme.colors.http.delete },
    { label: 'ProfileInfo', color: theme.colors.warning },
    { label: 'Orders', color: theme.colors.warning },
  ];

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: theme.spacing.lg,
        marginTop: theme.spacing.lg,
        padding: theme.spacing.md,
        backgroundColor: '#0e0e0e',
        borderRadius: theme.borderRadius.lg,
        border: `1px solid ${theme.colors.http.delete}30`,
      }}
    >
      <div style={{ color: theme.colors.textDark, fontFamily: theme.fonts.sans, fontSize: theme.fontSizes.sm }}>
        CASCADE:
      </div>
      {items.map((item, index) => {
        const delay = 600 + index * 25;
        const opacity = interpolate(frame, [delay, delay + 20], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        return (
          <React.Fragment key={index}>
            {index > 0 && (
              <div style={{ opacity, color: theme.colors.http.delete, fontSize: theme.fontSizes.sm }}>
                {'\u2192'}
              </div>
            )}
            <div
              style={{
                opacity,
                backgroundColor: `${item.color}20`,
                border: `2px solid ${item.color}`,
                color: item.color,
                padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
                borderRadius: theme.borderRadius.md,
                fontFamily: theme.fonts.code,
                fontSize: theme.fontSizes.sm,
                textDecoration: index > 0 ? 'line-through' : 'none',
              }}
            >
              {item.label}
            </div>
          </React.Fragment>
        );
      })}
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
            <div style={{ opacity, color: theme.colors.textDark, fontSize: theme.fontSizes.xs }}>{'->'}</div>
          )}
        </React.Fragment>
      );
    })}
  </div>
);

interface EndpointRowProps {
  method: string;
  route: string;
  description: string;
  color: string;
  frame: number;
  delay: number;
}

const EndpointRow: React.FC<EndpointRowProps> = ({ method, route, description, color, frame, delay }) => {
  const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
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
        backgroundColor: '#0e0e0e',
        padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
        borderRadius: theme.borderRadius.md,
        borderLeft: `4px solid ${color}`,
      }}
    >
      <div
        style={{
          backgroundColor: color,
          color: 'white',
          padding: `${theme.spacing.xs / 2}px ${theme.spacing.sm}px`,
          borderRadius: theme.borderRadius.sm,
          fontFamily: theme.fonts.code,
          fontSize: theme.fontSizes.xs,
          fontWeight: theme.fontWeights.bold,
          minWidth: 70,
          textAlign: 'center',
        }}
      >
        {method}
      </div>
      <div style={{ color: theme.colors.text, fontFamily: theme.fonts.code, fontSize: theme.fontSizes.sm, minWidth: 250 }}>
        {route}
      </div>
      <div style={{ color: theme.colors.textDark, fontFamily: theme.fonts.sans, fontSize: theme.fontSizes.sm }}>
        {description}
      </div>
    </div>
  );
};
