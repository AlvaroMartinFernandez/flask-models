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

export const Act3_Relations: React.FC = () => {
  const { act3 } = TIMINGS;
  const frame = useCurrentFrame();
  const actStart = TIMINGS.act3.start;

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.background }}>
      {/* Seccion 1: Relacion 1:1 (200-235s) */}
      <Sequence
        from={act3.relacionUnoAUno.start - actStart}
        durationInFrames={act3.relacionUnoAUno.duration}
      >
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing.xxl,
          }}
        >
          <AnimatedTitle
            text="Relacion Uno a Uno"
            subtitle="Un User tiene UN ProfileInfo"
            fontSize={theme.fontSizes.xl}
            color={theme.colors.relations.oneToOne}
          />

          <div
            style={{
              flex: 1,
              display: 'flex',
              gap: theme.spacing.xl,
              marginTop: theme.spacing.lg,
            }}
          >
            {/* Diagrama */}
            <div
              style={{
                flex: 0.4,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <RelationDiagram
                type="1:1"
                leftTable="User"
                rightTable="ProfileInfo"
                leftField="profile"
                rightField="user_id (FK)"
                color={theme.colors.relations.oneToOne}
                frame={frame}
              />

              <KeyPointsBox
                points={[
                  'uselist=False (UN objeto)',
                  'FK con unique=True',
                  'back_populates bidireccional',
                ]}
                frame={frame}
                delay={200}
              />
            </div>

            {/* Codigo */}
            <div style={{ flex: 1 }}>
              <CodeBlock
                code={codeSnippets.relacionUnoAUno}
                language="python"
                fontSize={theme.fontSizes.codeSmall}
                highlightLines={[4, 5, 9, 10]}
                animateLines
                durationInFrames={act3.relacionUnoAUno.duration}
              />
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Seccion 2: Relacion 1:N (235-275s) */}
      <Sequence
        from={act3.relacionUnoAMuchos.start - actStart}
        durationInFrames={act3.relacionUnoAMuchos.duration}
      >
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing.xxl,
          }}
        >
          <AnimatedTitle
            text="Relacion Uno a Muchos"
            subtitle="Un User tiene MUCHAS Orders"
            fontSize={theme.fontSizes.xl}
            color={theme.colors.relations.oneToMany}
          />

          <div
            style={{
              flex: 1,
              display: 'flex',
              gap: theme.spacing.xl,
              marginTop: theme.spacing.lg,
            }}
          >
            {/* Diagrama */}
            <div
              style={{
                flex: 0.4,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <RelationDiagram
                type="1:N"
                leftTable="User"
                rightTable="Order"
                leftField="orders[]"
                rightField="user_id (FK)"
                color={theme.colors.relations.oneToMany}
                frame={frame - (act3.relacionUnoAMuchos.start - actStart)}
              />

              <KeyPointsBox
                points={[
                  'lista con Mapped[list[...]]',
                  'FK SIN unique',
                  'cascade para eliminacion',
                ]}
                frame={frame - (act3.relacionUnoAMuchos.start - actStart)}
                delay={200}
              />
            </div>

            {/* Codigo */}
            <div style={{ flex: 1 }}>
              <CodeBlock
                code={codeSnippets.relacionUnoAMuchos}
                language="python"
                fontSize={theme.fontSizes.codeSmall}
                highlightLines={[4, 5, 10, 11]}
                animateLines
                durationInFrames={act3.relacionUnoAMuchos.duration}
              />
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Seccion 3: Relacion N:N con db.Table (275-310s) */}
      <Sequence
        from={act3.relacionMuchosDbTable.start - actStart}
        durationInFrames={act3.relacionMuchosDbTable.duration}
      >
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing.xxl,
          }}
        >
          <AnimatedTitle
            text="Muchos a Muchos (db.Table)"
            subtitle="Articles <-> Tags (sin campos extra)"
            fontSize={theme.fontSizes.xl}
            color={theme.colors.relations.manyToMany}
          />

          <div
            style={{
              flex: 1,
              display: 'flex',
              gap: theme.spacing.xl,
              marginTop: theme.spacing.lg,
            }}
          >
            {/* Diagrama */}
            <div
              style={{
                flex: 0.4,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ManyToManyDiagram
                leftTable="Article"
                middleTable="article_tags"
                rightTable="Tag"
                color={theme.colors.relations.manyToMany}
                frame={frame - (act3.relacionMuchosDbTable.start - actStart)}
              />

              <KeyPointsBox
                points={[
                  'db.Table para tabla simple',
                  'Solo 2 FKs, sin campos extra',
                  'secondary=tabla_asociacion',
                ]}
                frame={frame - (act3.relacionMuchosDbTable.start - actStart)}
                delay={200}
              />
            </div>

            {/* Codigo */}
            <div style={{ flex: 1 }}>
              <CodeBlock
                code={codeSnippets.relacionMuchosTable}
                language="python"
                fontSize={theme.fontSizes.codeSmall}
                highlightLines={[2, 3, 4, 5, 6, 10, 11, 14, 15]}
                animateLines
                durationInFrames={act3.relacionMuchosDbTable.duration}
              />
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Seccion 4: Relacion N:N con clase (310-340s) */}
      <Sequence
        from={act3.relacionMuchosClase.start - actStart}
        durationInFrames={act3.relacionMuchosClase.duration}
      >
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing.xxl,
          }}
        >
          <AnimatedTitle
            text="Muchos a Muchos (Clase)"
            subtitle="Order <-> Article via OrderItem (con campos extra)"
            fontSize={theme.fontSizes.xl}
            color={theme.colors.warning}
          />

          <div
            style={{
              flex: 1,
              display: 'flex',
              gap: theme.spacing.xl,
              marginTop: theme.spacing.lg,
            }}
          >
            {/* Info */}
            <div
              style={{
                flex: 0.4,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <ExtraFieldsBox
                frame={frame - (act3.relacionMuchosClase.start - actStart)}
              />
            </div>

            {/* Codigo */}
            <div style={{ flex: 1 }}>
              <CodeBlock
                code={codeSnippets.relacionMuchosClase}
                language="python"
                fontSize={theme.fontSizes.codeSmall}
                highlightLines={[5, 6, 7, 8]}
                animateLines
                durationInFrames={act3.relacionMuchosClase.duration}
                annotation="OrderItem guarda quantity, unit_price, subtotal"
              />
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Seccion 5: ON DELETE (340-360s) */}
      <Sequence
        from={act3.onDelete.start - actStart}
        durationInFrames={act3.onDelete.duration}
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
          <div style={{ flex: 1 }}>
            <CodeBlock
              code={codeSnippets.onDeleteOpciones}
              language="python"
              fontSize={theme.fontSizes.codeSmall}
              highlightLines={[3, 4, 8, 9, 10, 14, 15]}
              animateLines
              durationInFrames={act3.onDelete.duration}
            />
          </div>

          {/* Explicacion */}
          <div
            style={{
              flex: 0.6,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <AnimatedTitle
              text="ON DELETE"
              subtitle="Que pasa al eliminar padre?"
              fontSize={theme.fontSizes.xl}
              color={theme.colors.error}
            />

            <OnDeleteOptions
              frame={frame - (act3.onDelete.start - actStart)}
            />
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};

// Diagrama de relacion
interface RelationDiagramProps {
  type: '1:1' | '1:N';
  leftTable: string;
  rightTable: string;
  leftField: string;
  rightField: string;
  color: string;
  frame: number;
}

const RelationDiagram: React.FC<RelationDiagramProps> = ({
  type,
  leftTable,
  rightTable,
  leftField,
  rightField,
  color,
  frame,
}) => {
  const leftOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const lineOpacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const rightOpacity = interpolate(frame, [120, 150], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing.md,
        marginBottom: theme.spacing.xl,
      }}
    >
      {/* Tabla izquierda */}
      <div
        style={{
          opacity: leftOpacity,
          backgroundColor: '#0e0e0e',
          border: `2px solid ${color}`,
          borderRadius: theme.borderRadius.lg,
          padding: theme.spacing.md,
          textAlign: 'center',
          minWidth: 120,
        }}
      >
        <div
          style={{
            color,
            fontWeight: theme.fontWeights.bold,
            fontSize: theme.fontSizes.md,
          }}
        >
          {leftTable}
        </div>
        <div
          style={{
            fontFamily: theme.fonts.code,
            fontSize: theme.fontSizes.xs,
            color: theme.colors.text,
            marginTop: theme.spacing.xs,
          }}
        >
          {leftField}
        </div>
      </div>

      {/* Linea de conexion */}
      <div
        style={{
          opacity: lineOpacity,
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing.xs,
        }}
      >
        <div
          style={{
            width: 40,
            height: 3,
            backgroundColor: color,
          }}
        />
        <div
          style={{
            backgroundColor: color,
            color: 'white',
            padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
            borderRadius: theme.borderRadius.md,
            fontSize: theme.fontSizes.sm,
            fontWeight: theme.fontWeights.bold,
          }}
        >
          {type}
        </div>
        <div
          style={{
            width: 40,
            height: 3,
            backgroundColor: color,
          }}
        />
      </div>

      {/* Tabla derecha */}
      <div
        style={{
          opacity: rightOpacity,
          backgroundColor: '#0e0e0e',
          border: `2px solid ${color}`,
          borderRadius: theme.borderRadius.lg,
          padding: theme.spacing.md,
          textAlign: 'center',
          minWidth: 120,
        }}
      >
        <div
          style={{
            color,
            fontWeight: theme.fontWeights.bold,
            fontSize: theme.fontSizes.md,
          }}
        >
          {rightTable}
        </div>
        <div
          style={{
            fontFamily: theme.fonts.code,
            fontSize: theme.fontSizes.xs,
            color: theme.colors.text,
            marginTop: theme.spacing.xs,
          }}
        >
          {rightField}
        </div>
      </div>
    </div>
  );
};

// Diagrama N:N
interface ManyToManyDiagramProps {
  leftTable: string;
  middleTable: string;
  rightTable: string;
  color: string;
  frame: number;
}

const ManyToManyDiagram: React.FC<ManyToManyDiagramProps> = ({
  leftTable,
  middleTable,
  rightTable,
  color,
  frame,
}) => {
  const leftOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const middleOpacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const rightOpacity = interpolate(frame, [120, 150], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const TableBox: React.FC<{ name: string; opacity: number; isMiddle?: boolean }> = ({
    name,
    opacity,
    isMiddle = false,
  }) => (
    <div
      style={{
        opacity,
        backgroundColor: isMiddle ? color : '#0e0e0e',
        border: `2px solid ${color}`,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
        textAlign: 'center',
        minWidth: 100,
        color: isMiddle ? 'white' : color,
        fontWeight: theme.fontWeights.bold,
        fontSize: theme.fontSizes.sm,
      }}
    >
      {name}
    </div>
  );

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing.sm,
        marginBottom: theme.spacing.xl,
      }}
    >
      <TableBox name={leftTable} opacity={leftOpacity} />
      <div style={{ opacity: middleOpacity, color, fontSize: theme.fontSizes.lg }}>—</div>
      <TableBox name={middleTable} opacity={middleOpacity} isMiddle />
      <div style={{ opacity: middleOpacity, color, fontSize: theme.fontSizes.lg }}>—</div>
      <TableBox name={rightTable} opacity={rightOpacity} />
    </div>
  );
};

// Caja de puntos clave
interface KeyPointsBoxProps {
  points: string[];
  frame: number;
  delay: number;
}

const KeyPointsBox: React.FC<KeyPointsBoxProps> = ({ points, frame, delay }) => {
  return (
    <div
      style={{
        backgroundColor: '#0e0e0e',
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
        width: '100%',
      }}
    >
      {points.map((point, index) => {
        const opacity = interpolate(
          frame,
          [delay + index * 40, delay + index * 40 + 30],
          [0, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        return (
          <div
            key={index}
            style={{
              opacity,
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
              {point}
            </span>
          </div>
        );
      })}
    </div>
  );
};

// Caja de campos extra
interface ExtraFieldsBoxProps {
  frame: number;
}

const ExtraFieldsBox: React.FC<ExtraFieldsBoxProps> = ({ frame }) => {
  const fields = [
    { name: 'quantity', type: 'int', example: '2' },
    { name: 'unit_price', type: 'float', example: '29.99' },
    { name: 'subtotal', type: 'float', example: '59.98' },
  ];

  return (
    <div
      style={{
        backgroundColor: '#0e0e0e',
        border: `2px solid ${theme.colors.warning}`,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.lg,
      }}
    >
      <div
        style={{
          color: theme.colors.warning,
          fontWeight: theme.fontWeights.bold,
          fontSize: theme.fontSizes.md,
          marginBottom: theme.spacing.md,
          textAlign: 'center',
        }}
      >
        Campos Adicionales
      </div>
      {fields.map((field, index) => {
        const opacity = interpolate(
          frame,
          [60 + index * 40, 90 + index * 40],
          [0, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        return (
          <div
            key={field.name}
            style={{
              opacity,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: theme.spacing.sm,
              backgroundColor: 'rgba(0,0,0,0.3)',
              borderRadius: theme.borderRadius.sm,
              marginBottom: theme.spacing.xs,
            }}
          >
            <span
              style={{
                fontFamily: theme.fonts.code,
                color: theme.colors.python.variable,
                fontSize: theme.fontSizes.sm,
              }}
            >
              {field.name}
            </span>
            <span
              style={{
                fontFamily: theme.fonts.code,
                color: theme.colors.textDark,
                fontSize: theme.fontSizes.xs,
              }}
            >
              {field.example}
            </span>
          </div>
        );
      })}
    </div>
  );
};

// Opciones de ON DELETE
interface OnDeleteOptionsProps {
  frame: number;
}

const OnDeleteOptions: React.FC<OnDeleteOptionsProps> = ({ frame }) => {
  const options = [
    { name: 'CASCADE', desc: 'Elimina hijos', color: theme.colors.error },
    { name: 'SET NULL', desc: 'Pone NULL en FK', color: theme.colors.warning },
    { name: 'RESTRICT', desc: 'Impide eliminar', color: theme.colors.info },
  ];

  return (
    <div
      style={{
        marginTop: theme.spacing.xl,
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing.md,
      }}
    >
      {options.map((opt, index) => {
        const opacity = interpolate(
          frame,
          [30 + index * 50, 60 + index * 50],
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
                padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
                borderRadius: theme.borderRadius.md,
                fontFamily: theme.fonts.code,
                fontSize: theme.fontSizes.sm,
                fontWeight: theme.fontWeights.bold,
                minWidth: 120,
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
