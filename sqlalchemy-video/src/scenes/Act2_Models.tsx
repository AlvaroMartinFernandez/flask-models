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

export const Act2_Models: React.FC = () => {
  const { act2 } = TIMINGS;
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.background }}>
      {/* Seccion 1: Sintaxis moderna (120-150s) */}
      <Sequence
        from={act2.sintaxisModerna.start - TIMINGS.act2.start}
        durationInFrames={act2.sintaxisModerna.duration}
      >
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'row',
            padding: theme.spacing.xxl,
            gap: theme.spacing.xl,
          }}
        >
          {/* Lado izquierdo: Explicacion */}
          <div
            style={{
              flex: 0.8,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <AnimatedTitle
              text="Crear Modelos"
              subtitle="Sintaxis SQLAlchemy 2.0+"
              fontSize={theme.fontSizes.xl}
              color={theme.colors.sqlalchemy.model}
            />

            <div style={{ marginTop: theme.spacing.xl }}>
              <AnimatedList
                items={[
                  'Cada modelo hereda de db.Model',
                  '__tablename__ define el nombre de la tabla',
                  'Mapped[tipo] para type hints',
                  'mapped_column() para opciones',
                ]}
                icon=">"
                delayBetweenItems={20}
              />
            </div>

            <SyntaxExplanation
              frame={frame}
              delay={300}
            />
          </div>

          {/* Lado derecho: Codigo */}
          <div
            style={{
              flex: 1.2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ width: '100%' }}>
              <CodeBlock
                code={codeSnippets.modeloBasico}
                language="python"
                fontSize={theme.fontSizes.codeSmall}
                highlightLines={[1, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14]}
                animateLines
                durationInFrames={act2.sintaxisModerna.duration}
                annotation="Modelo User con sintaxis moderna"
              />
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Seccion 2: Tipos de columnas (150-175s) */}
      <Sequence
        from={act2.tiposColumnas.start - TIMINGS.act2.start}
        durationInFrames={act2.tiposColumnas.duration}
      >
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing.xxl,
          }}
        >
          <AnimatedTitle
            text="Tipos de Columnas"
            subtitle="SQLAlchemy -> Python"
            fontSize={theme.fontSizes.xl}
            color={theme.colors.sqlalchemy.column}
          />

          <div
            style={{
              flex: 1,
              display: 'flex',
              gap: theme.spacing.xxl,
              marginTop: theme.spacing.lg,
            }}
          >
            {/* Codigo */}
            <div style={{ flex: 1 }}>
              <CodeBlock
                code={codeSnippets.tiposColumnas}
                language="python"
                fontSize={theme.fontSizes.codeSmall}
                animateLines
                durationInFrames={act2.tiposColumnas.duration}
              />
            </div>

            {/* Tarjetas de tipos */}
            <div
              style={{
                flex: 0.8,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: theme.spacing.md,
              }}
            >
              <ColumnTypeCard
                sqlType="Integer"
                pythonType="int"
                example="1, 42, -5"
                color={theme.colors.http.get}
                frame={frame - (act2.tiposColumnas.start - TIMINGS.act2.start)}
                delay={30}
              />
              <ColumnTypeCard
                sqlType="String(n)"
                pythonType="str"
                example="'Ana', 'Hola'"
                color={theme.colors.http.post}
                frame={frame - (act2.tiposColumnas.start - TIMINGS.act2.start)}
                delay={90}
              />
              <ColumnTypeCard
                sqlType="Boolean"
                pythonType="bool"
                example="True, False"
                color={theme.colors.http.put}
                frame={frame - (act2.tiposColumnas.start - TIMINGS.act2.start)}
                delay={150}
              />
              <ColumnTypeCard
                sqlType="DateTime"
                pythonType="datetime"
                example="2024-01-15 10:30"
                color={theme.colors.http.delete}
                frame={frame - (act2.tiposColumnas.start - TIMINGS.act2.start)}
                delay={210}
              />
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Seccion 3: Opciones de columnas (175-200s) */}
      <Sequence
        from={act2.opcionesColumnas.start - TIMINGS.act2.start}
        durationInFrames={act2.opcionesColumnas.duration}
      >
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'row',
            padding: theme.spacing.xxl,
            gap: theme.spacing.xl,
          }}
        >
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
                code={codeSnippets.opcionesColumnas}
                language="python"
                fontSize={theme.fontSizes.codeSmall}
                highlightLines={[3, 6, 9, 12, 15]}
                animateLines
                durationInFrames={act2.opcionesColumnas.duration}
              />
            </div>
          </div>

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
              text="Opciones de Columnas"
              subtitle="Restricciones y configuracion"
              fontSize={theme.fontSizes.xl}
              color={theme.colors.warning}
            />

            <div style={{ marginTop: theme.spacing.xl }}>
              <OptionsList
                frame={frame - (act2.opcionesColumnas.start - TIMINGS.act2.start)}
              />
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};

// Explicacion de sintaxis
interface SyntaxExplanationProps {
  frame: number;
  delay: number;
}

const SyntaxExplanation: React.FC<SyntaxExplanationProps> = ({ frame, delay }) => {
  const opacity = interpolate(frame, [delay, delay + 30], [0, 1], {
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
        padding: theme.spacing.md,
      }}
    >
      <div
        style={{
          fontFamily: theme.fonts.code,
          fontSize: theme.fontSizes.sm,
          color: theme.colors.text,
        }}
      >
        <span style={{ color: theme.colors.python.variable }}>nombre</span>
        <span style={{ color: theme.colors.textDark }}>: </span>
        <span style={{ color: theme.colors.python.keyword }}>Mapped</span>
        <span style={{ color: theme.colors.textDark }}>[</span>
        <span style={{ color: theme.colors.python.function }}>tipo</span>
        <span style={{ color: theme.colors.textDark }}>] = </span>
        <span style={{ color: theme.colors.python.function }}>mapped_column</span>
        <span style={{ color: theme.colors.textDark }}>()</span>
      </div>
    </div>
  );
};

// Tarjeta de tipo de columna
interface ColumnTypeCardProps {
  sqlType: string;
  pythonType: string;
  example: string;
  color: string;
  frame: number;
  delay: number;
}

const ColumnTypeCard: React.FC<ColumnTypeCardProps> = ({
  sqlType,
  pythonType,
  example,
  color,
  frame,
  delay,
}) => {
  const opacity = interpolate(frame, [delay, delay + 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const translateX = interpolate(frame, [delay, delay + 30], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${translateX}px)`,
        backgroundColor: '#0e0e0e',
        border: `2px solid ${color}`,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div>
        <div
          style={{
            color,
            fontWeight: theme.fontWeights.bold,
            fontFamily: theme.fonts.code,
            fontSize: theme.fontSizes.md,
          }}
        >
          {sqlType}
        </div>
        <div
          style={{
            color: theme.colors.textDark,
            fontSize: theme.fontSizes.xs,
            marginTop: theme.spacing.xs,
          }}
        >
          Python: {pythonType}
        </div>
      </div>
      <div
        style={{
          fontFamily: theme.fonts.code,
          fontSize: theme.fontSizes.xs,
          color: theme.colors.text,
          backgroundColor: 'rgba(0,0,0,0.3)',
          padding: theme.spacing.xs,
          borderRadius: theme.borderRadius.sm,
        }}
      >
        {example}
      </div>
    </div>
  );
};

// Lista de opciones
interface OptionsListProps {
  frame: number;
}

const OptionsList: React.FC<OptionsListProps> = ({ frame }) => {
  const options = [
    { name: 'primary_key', desc: 'Clave primaria', color: theme.colors.primary },
    { name: 'unique', desc: 'Valor unico', color: theme.colors.secondary },
    { name: 'nullable', desc: 'Campo obligatorio', color: theme.colors.warning },
    { name: 'default', desc: 'Valor por defecto', color: theme.colors.success },
    { name: 'index', desc: 'Busqueda rapida', color: theme.colors.info },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
      {options.map((opt, index) => {
        const opacity = interpolate(
          frame,
          [index * 30, (index + 1) * 30],
          [0, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        return (
          <div
            key={opt.name}
            style={{
              opacity,
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.md,
            }}
          >
            <div
              style={{
                backgroundColor: opt.color,
                color: 'white',
                padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
                borderRadius: theme.borderRadius.md,
                fontFamily: theme.fonts.code,
                fontSize: theme.fontSizes.sm,
                minWidth: 140,
                textAlign: 'center',
              }}
            >
              {opt.name}
            </div>
            <div
              style={{
                color: theme.colors.text,
                fontSize: theme.fontSizes.sm,
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
