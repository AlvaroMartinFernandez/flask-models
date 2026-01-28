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

export const Act4_Serialization: React.FC = () => {
  const { act4 } = TIMINGS;
  const frame = useCurrentFrame();
  const actStart = TIMINGS.act4.start;

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.background }}>
      {/* Seccion 1: Metodo __repr__ (360-385s) */}
      <Sequence
        from={act4.metodoRepr.start - actStart}
        durationInFrames={act4.metodoRepr.duration}
      >
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'row',
            padding: theme.spacing.xxl,
            gap: theme.spacing.xl,
          }}
        >
          {/* Explicacion */}
          <div
            style={{
              flex: 0.8,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <AnimatedTitle
              text="Metodo __repr__"
              subtitle="Representacion para debugging"
              fontSize={theme.fontSizes.xl}
              color={theme.colors.secondary}
            />

            <div style={{ marginTop: theme.spacing.xl }}>
              <AnimatedList
                items={[
                  'Define como se muestra el objeto',
                  'Util para debugging en consola',
                  'Muestra info clave del objeto',
                ]}
                icon=">"
                delayBetweenItems={20}
              />
            </div>

            <ReprExample
              frame={frame - (act4.metodoRepr.start - actStart)}
            />
          </div>

          {/* Codigo */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div style={{ width: '100%' }}>
              <CodeBlock
                code={codeSnippets.metodoRepr}
                language="python"
                fontSize={theme.fontSizes.codeSmall}
                highlightLines={[4, 5, 6, 9, 10]}
                animateLines
                durationInFrames={act4.metodoRepr.duration}
              />
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Seccion 2: Metodo serialize (385-420s) */}
      <Sequence
        from={act4.metodoSerialize.start - actStart}
        durationInFrames={act4.metodoSerialize.duration}
      >
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing.xxl,
          }}
        >
          <AnimatedTitle
            text="Metodo serialize"
            subtitle="Convertir objeto a JSON para APIs"
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
            {/* Codigo */}
            <div style={{ flex: 1 }}>
              <CodeBlock
                code={codeSnippets.serializeBasico}
                language="python"
                fontSize={theme.fontSizes.codeSmall}
                highlightLines={[4, 5, 6, 7, 8, 9, 10, 11, 12, 16, 17, 18]}
                animateLines
                durationInFrames={act4.metodoSerialize.duration}
              />
            </div>

            {/* Visualizacion JSON */}
            <div
              style={{
                flex: 0.6,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <JSONPreview
                frame={frame - (act4.metodoSerialize.start - actStart)}
              />

              <SecurityWarning
                frame={frame - (act4.metodoSerialize.start - actStart)}
              />
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Seccion 3: Serializacion con relaciones (420-455s) */}
      <Sequence
        from={act4.serializacionRelaciones.start - actStart}
        durationInFrames={act4.serializacionRelaciones.duration}
      >
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing.xxl,
          }}
        >
          <AnimatedTitle
            text="Serializacion con Relaciones"
            subtitle="Multiples metodos segun necesidad"
            fontSize={theme.fontSizes.xl}
            color={theme.colors.sqlalchemy.relationship}
          />

          <div
            style={{
              flex: 1,
              display: 'flex',
              gap: theme.spacing.xl,
              marginTop: theme.spacing.lg,
            }}
          >
            {/* Codigo */}
            <div style={{ flex: 1 }}>
              <CodeBlock
                code={codeSnippets.serializeRelaciones}
                language="python"
                fontSize={theme.fontSizes.codeSmall}
                highlightLines={[11, 12, 13, 17, 18, 19]}
                animateLines
                durationInFrames={act4.serializacionRelaciones.duration}
              />
            </div>

            {/* Opciones de serializacion */}
            <div
              style={{
                flex: 0.5,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <SerializationOptions
                frame={frame - (act4.serializacionRelaciones.start - actStart)}
              />
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Seccion 4: Conclusion (455-480s) */}
      <Sequence
        from={act4.conclusion.start - actStart}
        durationInFrames={act4.conclusion.duration}
      >
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
            text="Resumen SQLAlchemy Models"
            subtitle="Conceptos clave"
            fontSize={theme.fontSizes.xl}
            color={theme.colors.success}
          />

          <div
            style={{
              marginTop: theme.spacing.xxl,
              display: 'flex',
              gap: theme.spacing.xxl,
            }}
          >
            <SummaryColumn
              title="Modelos"
              items={[
                'db.Model base',
                'Mapped[tipo]',
                'mapped_column()',
              ]}
              color={theme.colors.sqlalchemy.model}
              frame={frame - (act4.conclusion.start - actStart)}
              delay={0}
            />

            <SummaryColumn
              title="Relaciones"
              items={[
                '1:1 uselist=False',
                '1:N lista + FK',
                'N:N Table o clase',
              ]}
              color={theme.colors.sqlalchemy.relationship}
              frame={frame - (act4.conclusion.start - actStart)}
              delay={60}
            />

            <SummaryColumn
              title="Serializacion"
              items={[
                '__repr__ debugging',
                'serialize() JSON',
                'Nunca password!',
              ]}
              color={theme.colors.secondary}
              frame={frame - (act4.conclusion.start - actStart)}
              delay={120}
            />
          </div>

          <div
            style={{
              marginTop: theme.spacing.xxl,
              fontSize: theme.fontSizes.lg,
              color: theme.colors.text,
              textAlign: 'center',
              opacity: interpolate(
                frame - (act4.conclusion.start - actStart),
                [300, 350],
                [0, 1],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              ),
            }}
          >
            Practica creando tus propios modelos
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};

// Ejemplo de __repr__
interface ReprExampleProps {
  frame: number;
}

const ReprExample: React.FC<ReprExampleProps> = ({ frame }) => {
  const opacity = interpolate(frame, [200, 250], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        opacity,
        marginTop: theme.spacing.xl,
        backgroundColor: '#0e0e0e',
        border: `2px solid ${theme.colors.secondary}`,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.lg,
      }}
    >
      <div
        style={{
          fontFamily: theme.fonts.code,
          fontSize: theme.fontSizes.md,
          color: theme.colors.textDark,
        }}
      >
        {`>>> print(user)`}
      </div>
      <div
        style={{
          fontFamily: theme.fonts.code,
          fontSize: theme.fontSizes.md,
          color: theme.colors.success,
          marginTop: theme.spacing.sm,
        }}
      >
        {`<User 1: ana@email.com>`}
      </div>
    </div>
  );
};

// Preview de JSON
interface JSONPreviewProps {
  frame: number;
}

const JSONPreview: React.FC<JSONPreviewProps> = ({ frame }) => {
  const opacity = interpolate(frame, [200, 250], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        opacity,
        backgroundColor: '#0e0e0e',
        border: `2px solid ${theme.colors.primary}`,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.lg,
        marginBottom: theme.spacing.lg,
      }}
    >
      <div
        style={{
          color: theme.colors.primary,
          fontWeight: theme.fontWeights.bold,
          fontSize: theme.fontSizes.sm,
          marginBottom: theme.spacing.sm,
        }}
      >
        Resultado JSON:
      </div>
      <pre
        style={{
          fontFamily: theme.fonts.code,
          fontSize: theme.fontSizes.codeSmall,
          color: theme.colors.text,
          margin: 0,
        }}
      >
{`{
  "id": 1,
  "email": "ana@email.com",
  "name": "Ana",
  "is_active": true
}`}
      </pre>
    </div>
  );
};

// Aviso de seguridad
interface SecurityWarningProps {
  frame: number;
}

const SecurityWarning: React.FC<SecurityWarningProps> = ({ frame }) => {
  const opacity = interpolate(frame, [400, 450], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        opacity,
        backgroundColor: 'rgba(244, 67, 54, 0.1)',
        border: `2px solid ${theme.colors.error}`,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing.sm,
        }}
      >
        <span style={{ fontSize: theme.fontSizes.lg }}>!</span>
        <span
          style={{
            color: theme.colors.error,
            fontWeight: theme.fontWeights.bold,
            fontSize: theme.fontSizes.sm,
          }}
        >
          NUNCA incluir password en serialize!
        </span>
      </div>
    </div>
  );
};

// Opciones de serializacion
interface SerializationOptionsProps {
  frame: number;
}

const SerializationOptions: React.FC<SerializationOptionsProps> = ({ frame }) => {
  const options = [
    { name: 'serialize()', desc: 'Solo datos basicos' },
    { name: 'serialize_with_profile()', desc: 'Incluye perfil 1:1' },
    { name: 'serialize_with_orders()', desc: 'Incluye ordenes 1:N' },
  ];

  return (
    <div
      style={{
        backgroundColor: '#0e0e0e',
        border: `2px solid ${theme.colors.sqlalchemy.relationship}`,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.lg,
      }}
    >
      <div
        style={{
          color: theme.colors.sqlalchemy.relationship,
          fontWeight: theme.fontWeights.bold,
          fontSize: theme.fontSizes.md,
          marginBottom: theme.spacing.md,
          textAlign: 'center',
        }}
      >
        Elegir segun endpoint
      </div>
      {options.map((opt, index) => {
        const opacity = interpolate(
          frame,
          [100 + index * 60, 150 + index * 60],
          [0, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        return (
          <div
            key={opt.name}
            style={{
              opacity,
              padding: theme.spacing.sm,
              backgroundColor: 'rgba(0,0,0,0.3)',
              borderRadius: theme.borderRadius.sm,
              marginBottom: theme.spacing.sm,
            }}
          >
            <div
              style={{
                fontFamily: theme.fonts.code,
                fontSize: theme.fontSizes.xs,
                color: theme.colors.python.function,
              }}
            >
              {opt.name}
            </div>
            <div
              style={{
                fontSize: theme.fontSizes.xs,
                color: theme.colors.textDark,
                marginTop: theme.spacing.xs,
              }}
            >
              {opt.desc}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Columna de resumen
interface SummaryColumnProps {
  title: string;
  items: string[];
  color: string;
  frame: number;
  delay: number;
}

const SummaryColumn: React.FC<SummaryColumnProps> = ({
  title,
  items,
  color,
  frame,
  delay,
}) => {
  const opacity = interpolate(frame, [delay, delay + 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const translateY = interpolate(frame, [delay, delay + 30], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        backgroundColor: '#0e0e0e',
        border: `2px solid ${color}`,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.lg,
        minWidth: 200,
      }}
    >
      <div
        style={{
          color,
          fontWeight: theme.fontWeights.bold,
          fontSize: theme.fontSizes.md,
          marginBottom: theme.spacing.md,
          textAlign: 'center',
        }}
      >
        {title}
      </div>
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing.sm,
            marginBottom: theme.spacing.sm,
          }}
        >
          <span style={{ color: theme.colors.success }}>✓</span>
          <span
            style={{
              color: theme.colors.text,
              fontSize: theme.fontSizes.sm,
            }}
          >
            {item}
          </span>
        </div>
      ))}
    </div>
  );
};
