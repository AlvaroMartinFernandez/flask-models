import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  interpolate,
} from 'remotion';
import { AnimatedTitle } from '../components/AnimatedTitle';
import { CodeBlock } from '../components/CodeBlock';
import { JSONViewer } from '../components/JSONViewer';
import { SplitScreen } from '../components/SplitScreen';
import { Terminal } from '../components/Terminal';
import { codeSnippets } from '../data/codeSnippets';
import { TIMINGS } from '../data/timings';
import { sampleUsers, keyConcepts, terminalCommands } from '../data/userData';
import { theme } from '../styles/theme';

export const Act2_Practice: React.FC = () => {
  const { act2 } = TIMINGS;
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.background }}>
      {/* Seccion 1: Presentacion de la clase Usuarios (60-75s) */}
      <Sequence
        from={act2.classIntro.start - TIMINGS.act2.start}
        durationInFrames={act2.classIntro.duration}
      >
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: theme.spacing.xxl,
          }}
        >
          <AnimatedTitle
            text="Clase Usuarios"
            subtitle="Tu primera clase real en Python"
            fontSize={theme.fontSizes.xl}
          />

          <div
            style={{
              marginTop: theme.spacing.xl,
              display: 'flex',
              gap: theme.spacing.xl,
              alignItems: 'center',
            }}
          >
            {/* Estructura del proyecto */}
            <div
              style={{
                flex: 0.4,
                fontFamily: theme.fonts.code,
                fontSize: theme.fontSizes.md,
                color: theme.colors.text,
                backgroundColor: '#0e0e0e',
                padding: theme.spacing.lg,
                borderRadius: theme.borderRadius.lg,
                border: `2px solid ${theme.colors.primary}`,
              }}
            >
              <div style={{ color: theme.colors.python.function, marginBottom: theme.spacing.sm }}>
                src/
              </div>
              <div style={{ marginLeft: theme.spacing.md, marginBottom: theme.spacing.xs }}>
                |-- app.py{' '}
                <span style={{ color: theme.colors.textDark }}># API Flask</span>
              </div>
              <div style={{ marginLeft: theme.spacing.md, marginBottom: theme.spacing.xs }}>
                |-- entities/
              </div>
              <div style={{ marginLeft: theme.spacing.xl, color: theme.colors.primary }}>
                |-- usuarios.py{' '}
                <span style={{ color: theme.colors.textDark }}># Clase POO</span>
              </div>
            </div>

            {/* CRUD Badge */}
            <div
              style={{
                flex: 0.6,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: theme.spacing.lg,
              }}
            >
              <div
                style={{
                  fontSize: theme.fontSizes.lg,
                  color: theme.colors.text,
                  marginBottom: theme.spacing.md,
                }}
              >
                Operaciones CRUD
              </div>
              <div style={{ display: 'flex', gap: theme.spacing.md }}>
                {keyConcepts.crudOperations.map((op, index) => (
                  <CrudBadge
                    key={op.letter}
                    letter={op.letter}
                    word={op.word}
                    method={op.method}
                    color={op.color}
                    frame={frame - (act2.classIntro.start - TIMINGS.act2.start)}
                    delay={index * 15}
                  />
                ))}
              </div>
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Seccion 2: Metodo __init__ (75-85s) */}
      <Sequence
        from={act2.initMethod.start - TIMINGS.act2.start}
        durationInFrames={act2.initMethod.duration}
      >
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing.xxl,
          }}
        >
          <AnimatedTitle
            text="Constructor __init__"
            subtitle="Inicializa la lista de miembros"
            fontSize={theme.fontSizes.xl}
          />

          <div
            style={{
              flex: 1,
              display: 'flex',
              gap: theme.spacing.xl,
              marginTop: theme.spacing.xl,
              alignItems: 'center',
            }}
          >
            <div style={{ flex: 1 }}>
              <CodeBlock
                code={codeSnippets.usuariosInit}
                language="python"
                highlightLines={[2, 3]}
                animateLines
                durationInFrames={act2.initMethod.duration}
                annotation="self.miembros es una lista vacia para guardar usuarios"
              />
            </div>

            <div
              style={{
                flex: 0.5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: theme.spacing.md,
              }}
            >
              <MemoryDiagram
                frame={frame - (act2.initMethod.start - TIMINGS.act2.start)}
                title="En memoria:"
                content="miembros = []"
              />
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Seccion 3: Metodo get_all_members (85-95s) */}
      <Sequence
        from={act2.getAllMethod.start - TIMINGS.act2.start}
        durationInFrames={act2.getAllMethod.duration}
      >
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing.xxl,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.md }}>
            <MethodBadge method="GET" color={theme.colors.http.get} />
            <AnimatedTitle
              text="get_all_members()"
              subtitle="Obtiene todos los usuarios"
              fontSize={theme.fontSizes.xl}
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
            <div style={{ flex: 1 }}>
              <CodeBlock
                code={codeSnippets.usuariosGetAll}
                language="python"
                highlightLines={[2]}
                annotation="Retorna la lista completa de miembros"
              />
            </div>

            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: theme.fontSizes.sm,
                  color: theme.colors.textDark,
                  marginBottom: theme.spacing.sm,
                }}
              >
                Respuesta:
              </div>
              <JSONViewer
                data={sampleUsers.slice(0, 3)}
                animateKeys
                durationInFrames={act2.getAllMethod.duration}
              />
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Seccion 4: Metodo get_one_member (95-105s) */}
      <Sequence
        from={act2.getOneMethod.start - TIMINGS.act2.start}
        durationInFrames={act2.getOneMethod.duration}
      >
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing.xxl,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.md }}>
            <MethodBadge method="GET" color={theme.colors.http.get} />
            <AnimatedTitle
              text="get_one_member(indice)"
              subtitle="Busca un usuario por ID"
              fontSize={theme.fontSizes.xl}
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
            <div style={{ flex: 1 }}>
              <CodeBlock
                code={codeSnippets.usuariosGetOne}
                language="python"
                highlightLines={[2]}
                annotation="Usa next() para buscar por id en la lista"
              />
            </div>

            <div style={{ flex: 0.8 }}>
              <div
                style={{
                  fontSize: theme.fontSizes.sm,
                  color: theme.colors.textDark,
                  marginBottom: theme.spacing.sm,
                }}
              >
                get_one_member(1) retorna:
              </div>
              <JSONViewer
                data={{ id: 1, name: 'Ana', email: 'ana@email.com' }}
                animateKeys
                durationInFrames={act2.getOneMethod.duration}
              />
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Seccion 5: Metodo add_member (105-115s) */}
      <Sequence
        from={act2.addMethod.start - TIMINGS.act2.start}
        durationInFrames={act2.addMethod.duration}
      >
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing.xxl,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.md }}>
            <MethodBadge method="POST" color={theme.colors.http.post} />
            <AnimatedTitle
              text="add_member(nombre)"
              subtitle="Agrega un nuevo usuario"
              fontSize={theme.fontSizes.xl}
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
            <div style={{ flex: 1 }}>
              <CodeBlock
                code={codeSnippets.usuariosAdd}
                language="python"
                highlightLines={[2]}
                annotation="Usa append() para agregar a la lista"
              />
            </div>

            <div style={{ flex: 0.8 }}>
              <FlowVisualization
                frame={frame - (act2.addMethod.start - TIMINGS.act2.start)}
                input={{ name: 'Carlos', email: 'carlos@email.com' }}
                output="Miembro agregado"
                color={theme.colors.http.post}
              />
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Seccion 6: Metodos edit y delete (115-130s) */}
      <Sequence
        from={act2.editDeleteMethods.start - TIMINGS.act2.start}
        durationInFrames={act2.editDeleteMethods.duration}
      >
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing.xxl,
          }}
        >
          <AnimatedTitle
            text="edit_member() y delete_member()"
            subtitle="Modificar y eliminar usuarios"
            fontSize={theme.fontSizes.xl}
          />

          <div style={{ marginTop: theme.spacing.lg }}>
            <SplitScreen
              left={
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: theme.spacing.sm,
                      marginBottom: theme.spacing.sm,
                    }}
                  >
                    <MethodBadge method="PUT" color={theme.colors.http.put} />
                    <span style={{ color: theme.colors.text, fontSize: theme.fontSizes.md }}>
                      Actualizar
                    </span>
                  </div>
                  <CodeBlock
                    code={codeSnippets.usuariosEdit}
                    language="python"
                    highlightLines={[3, 4]}
                  />
                </div>
              }
              right={
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: theme.spacing.sm,
                      marginBottom: theme.spacing.sm,
                    }}
                  >
                    <MethodBadge method="DELETE" color={theme.colors.http.delete} />
                    <span style={{ color: theme.colors.text, fontSize: theme.fontSizes.md }}>
                      Eliminar
                    </span>
                  </div>
                  <CodeBlock
                    code={codeSnippets.usuariosDelete}
                    language="python"
                    highlightLines={[3]}
                  />
                </div>
              }
              splitRatio={0.5}
              animateEntry="both"
            />
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Seccion 7: Demo con Flask (130-150s) */}
      <Sequence
        from={act2.flaskDemo.start - TIMINGS.act2.start}
        durationInFrames={act2.flaskDemo.duration}
      >
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing.xxl,
          }}
        >
          <AnimatedTitle
            text="Integracion con Flask"
            subtitle="La clase Usuarios en accion"
            fontSize={theme.fontSizes.xl}
          />

          <div
            style={{
              flex: 1,
              display: 'flex',
              marginTop: theme.spacing.lg,
              justifyContent: 'center',
            }}
          >
            <div style={{ maxWidth: 1400, width: '100%' }}>
              <Terminal
                commands={terminalCommands}
                typingSpeed={2}
                startFrame={act2.flaskDemo.start - TIMINGS.act2.start}
              />
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};

// Componente para badges CRUD
interface CrudBadgeProps {
  letter: string;
  word: string;
  method: string;
  color: string;
  frame: number;
  delay: number;
}

const CrudBadge: React.FC<CrudBadgeProps> = ({
  letter,
  word,
  method,
  color,
  frame,
  delay,
}) => {
  const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const scale = interpolate(frame, [delay, delay + 15], [0.8, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: color,
        padding: `${theme.spacing.md}px ${theme.spacing.lg}px`,
        borderRadius: theme.borderRadius.lg,
        minWidth: 100,
      }}
    >
      <div
        style={{
          fontSize: theme.fontSizes.xxl,
          fontWeight: theme.fontWeights.bold,
          color: 'white',
        }}
      >
        {letter}
      </div>
      <div style={{ fontSize: theme.fontSizes.sm, color: 'white' }}>{word}</div>
      <div
        style={{
          fontSize: theme.fontSizes.xs,
          color: 'rgba(255,255,255,0.8)',
          marginTop: theme.spacing.xs,
        }}
      >
        {method}
      </div>
    </div>
  );
};

// Componente para badge de metodo HTTP
interface MethodBadgeProps {
  method: string;
  color: string;
}

const MethodBadge: React.FC<MethodBadgeProps> = ({ method, color }) => (
  <div
    style={{
      backgroundColor: color,
      color: 'white',
      padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
      borderRadius: theme.borderRadius.md,
      fontSize: theme.fontSizes.sm,
      fontWeight: theme.fontWeights.bold,
      fontFamily: theme.fonts.code,
    }}
  >
    {method}
  </div>
);

// Componente para diagrama de memoria
interface MemoryDiagramProps {
  frame: number;
  title: string;
  content: string;
}

const MemoryDiagram: React.FC<MemoryDiagramProps> = ({ frame, title, content }) => {
  const opacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        opacity,
        backgroundColor: '#0e0e0e',
        border: `2px solid ${theme.colors.secondary}`,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.lg,
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontSize: theme.fontSizes.sm,
          color: theme.colors.textDark,
          marginBottom: theme.spacing.sm,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontFamily: theme.fonts.code,
          fontSize: theme.fontSizes.lg,
          color: theme.colors.python.variable,
        }}
      >
        {content}
      </div>
    </div>
  );
};

// Componente para visualizacion de flujo
interface FlowVisualizationProps {
  frame: number;
  input: object;
  output: string;
  color: string;
}

const FlowVisualization: React.FC<FlowVisualizationProps> = ({
  frame,
  input,
  output,
  color,
}) => {
  const inputOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const arrowOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const outputOpacity = interpolate(frame, [60, 80], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: theme.spacing.md,
      }}
    >
      {/* Input */}
      <div
        style={{
          opacity: inputOpacity,
          backgroundColor: '#0e0e0e',
          border: `2px solid ${color}`,
          borderRadius: theme.borderRadius.md,
          padding: theme.spacing.md,
          fontFamily: theme.fonts.code,
          fontSize: theme.fontSizes.sm,
          color: theme.colors.json.string,
        }}
      >
        {JSON.stringify(input, null, 2)}
      </div>

      {/* Arrow */}
      <div
        style={{
          opacity: arrowOpacity,
          fontSize: theme.fontSizes.xl,
          color: color,
        }}
      >
        ↓
      </div>

      {/* Output */}
      <div
        style={{
          opacity: outputOpacity,
          backgroundColor: color,
          color: 'white',
          borderRadius: theme.borderRadius.md,
          padding: theme.spacing.md,
          fontSize: theme.fontSizes.md,
        }}
      >
        {output}
      </div>
    </div>
  );
};
