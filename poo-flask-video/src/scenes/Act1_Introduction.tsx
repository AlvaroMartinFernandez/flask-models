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
import { SplitScreen } from '../components/SplitScreen';
import { codeSnippets } from '../data/codeSnippets';
import { pooConcepts } from '../data/userData';
import { TIMINGS } from '../data/timings';
import { theme } from '../styles/theme';

export const Act1_Introduction: React.FC = () => {
  const { act1 } = TIMINGS;
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.background }}>
      {/* Seccion 1: Intro y Hook (0-8s) */}
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
            text="Programacion Orientada a Objetos"
            subtitle="en Python"
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
            Clases, Herencia, Encapsulacion y Polimorfismo
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Seccion 2: Clases y Objetos - Ejemplo Perro (8-22s) */}
      <Sequence
        from={act1.clasesObjetos.start}
        durationInFrames={act1.clasesObjetos.duration}
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
              text={pooConcepts.clasesObjetos.title}
              subtitle={pooConcepts.clasesObjetos.subtitle}
              fontSize={theme.fontSizes.xl}
              color={theme.colors.primary}
            />

            <div style={{ marginTop: theme.spacing.xl }}>
              <AnimatedList
                items={pooConcepts.clasesObjetos.points}
                icon=">"
                delayBetweenItems={15}
              />
            </div>
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
                code={codeSnippets.perroClass}
                language="python"
                highlightLines={[1, 2, 3, 5, 6, 8, 9]}
                animateLines
                durationInFrames={act1.clasesObjetos.duration}
                annotation="Perro es la clase, mi_perro es el objeto"
              />
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Seccion 3: Constructor __init__ detallado (26-46s) */}
      <Sequence
        from={act1.initDetallado.start}
        durationInFrames={act1.initDetallado.duration}
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
              flex: 1.2,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div style={{ width: '100%' }}>
              <CodeBlock
                code={codeSnippets.initExplicado}
                language="python"
                highlightLines={[2, 3, 4, 5, 6, 8, 9]}
                animateLines
                durationInFrames={act1.initDetallado.duration}
                annotation="__init__ se ejecuta automaticamente al crear el objeto"
              />
            </div>
          </div>

          {/* Explicacion visual */}
          <div
            style={{
              flex: 0.8,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: theme.spacing.md,
            }}
          >
            <AnimatedTitle
              text="El Constructor __init__"
              subtitle="Se ejecuta al crear el objeto"
              fontSize={theme.fontSizes.xl}
              color={theme.colors.primary}
            />

            <div style={{ marginTop: theme.spacing.lg }}>
              <AnimatedList
                items={[
                  '__init__ = constructor de la clase',
                  'Se llama automaticamente al crear objetos',
                  'self = referencia a la instancia actual',
                  'Inicializa los atributos del objeto',
                ]}
                icon=">"
                delayBetweenItems={20}
              />
            </div>

            <InitFlowDiagram frame={frame - act1.initDetallado.start} />
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Seccion 4: Metodos Magicos __dict__, __str__, __repr__ (46-68s) */}
      <Sequence
        from={act1.metodosMagicos.start}
        durationInFrames={act1.metodosMagicos.duration}
      >
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing.xxl,
          }}
        >
          <AnimatedTitle
            text="Metodos Magicos (Dunder Methods)"
            subtitle="Personalizan el comportamiento de objetos"
            fontSize={theme.fontSizes.xl}
            color={theme.colors.secondary}
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
                code={codeSnippets.strReprMethods}
                language="python"
                highlightLines={[7, 8, 9, 11, 12, 13, 16, 17]}
                animateLines
                durationInFrames={act1.metodosMagicos.duration}
                annotation="__str__ para print(), __repr__ para debugging"
              />
            </div>

            {/* Tarjetas de metodos magicos */}
            <div
              style={{
                flex: 0.7,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: theme.spacing.md,
              }}
            >
              <MagicMethodCard
                method="__dict__"
                description="Atributos como diccionario"
                example="{'nombre': 'Ana', 'edad': 25}"
                color={theme.colors.http.get}
                frame={frame - act1.metodosMagicos.start}
                delay={30}
              />
              <MagicMethodCard
                method="__str__"
                description="Representacion para usuarios"
                example="print(obj) -> 'Laptop - $999'"
                color={theme.colors.http.post}
                frame={frame - act1.metodosMagicos.start}
                delay={90}
              />
              <MagicMethodCard
                method="__repr__"
                description="Representacion para debugging"
                example={`repr(obj) -> "Producto('Laptop', 999)"`}
                color={theme.colors.http.put}
                frame={frame - act1.metodosMagicos.start}
                delay={150}
              />
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Seccion 5: Herencia basica - Animal -> Perro (68-86s) */}
      <Sequence
        from={act1.herenciaBasica.start}
        durationInFrames={act1.herenciaBasica.duration}
      >
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing.xxl,
          }}
        >
          <AnimatedTitle
            text={pooConcepts.herencia.title}
            subtitle={pooConcepts.herencia.subtitle}
            fontSize={theme.fontSizes.xl}
          />

          <div
            style={{
              flex: 1,
              display: 'flex',
              gap: theme.spacing.xl,
              marginTop: theme.spacing.lg,
              alignItems: 'center',
            }}
          >
            {/* Codigo */}
            <div style={{ flex: 1.2 }}>
              <CodeBlock
                code={codeSnippets.herenciaBasica}
                language="python"
                highlightLines={[1, 5, 10, 11]}
                animateLines
                durationInFrames={act1.herenciaBasica.duration}
                annotation="Perro(Animal) hereda el metodo comer() de Animal"
              />
            </div>

            {/* Diagrama de herencia */}
            <div
              style={{
                flex: 0.8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: theme.spacing.md,
              }}
            >
              <InheritanceDiagram
                frame={frame - act1.herenciaBasica.start}
                parent="Animal"
                child="Perro"
                parentMethod="comer()"
                childMethod="ladrar()"
              />
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Seccion 4: Herencia con super() - Vehiculo -> Coche (38-52s) */}
      <Sequence
        from={act1.herenciaSuper.start}
        durationInFrames={act1.herenciaSuper.duration}
      >
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing.xxl,
          }}
        >
          <AnimatedTitle
            text={pooConcepts.herenciaSuper.title}
            subtitle={pooConcepts.herenciaSuper.subtitle}
            fontSize={theme.fontSizes.xl}
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
                code={codeSnippets.herenciaAtributos}
                language="python"
                highlightLines={[2, 3, 4, 8, 9, 10]}
                animateLines
                durationInFrames={act1.herenciaSuper.duration}
                annotation="super().__init__() inicializa atributos del padre"
              />
            </div>

            {/* Explicacion visual */}
            <div
              style={{
                flex: 0.6,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: theme.spacing.md,
              }}
            >
              <ConceptBox
                title="Vehiculo (Padre)"
                items={['marca', 'modelo']}
                color={theme.colors.primary}
                frame={frame - act1.herenciaSuper.start}
                delay={30}
              />
              <div
                style={{
                  textAlign: 'center',
                  fontSize: theme.fontSizes.xl,
                  color: theme.colors.secondary,
                  opacity: interpolate(
                    frame - act1.herenciaSuper.start,
                    [60, 90],
                    [0, 1],
                    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                  ),
                }}
              >
                hereda
              </div>
              <ConceptBox
                title="Coche (Hijo)"
                items={['marca', 'modelo', '+ puertas']}
                color={theme.colors.secondary}
                frame={frame - act1.herenciaSuper.start}
                delay={90}
              />
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Seccion 5: Encapsulacion - CuentaBancaria (52-66s) */}
      <Sequence
        from={act1.encapsulacion.start}
        durationInFrames={act1.encapsulacion.duration}
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
                code={codeSnippets.encapsulacion}
                language="python"
                highlightLines={[3, 5, 6, 8, 9]}
                animateLines
                durationInFrames={act1.encapsulacion.duration}
                annotation="_saldo es protegido, solo accesible via metodos"
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
              text={pooConcepts.encapsulacion.title}
              subtitle={pooConcepts.encapsulacion.subtitle}
              fontSize={theme.fontSizes.xl}
              color={theme.colors.warning}
            />

            <div style={{ marginTop: theme.spacing.xl }}>
              <AnimatedList
                items={pooConcepts.encapsulacion.points}
                icon=">"
                delayBetweenItems={20}
              />
            </div>

            <EncapsulationDiagram frame={frame - act1.encapsulacion.start} />
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Seccion 6: Polimorfismo - Gato y Perro (66-82s) */}
      <Sequence
        from={act1.polimorfismo.start}
        durationInFrames={act1.polimorfismo.duration}
      >
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing.xxl,
          }}
        >
          <AnimatedTitle
            text={pooConcepts.polimorfismo.title}
            subtitle={pooConcepts.polimorfismo.subtitle}
            fontSize={theme.fontSizes.xl}
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
                code={codeSnippets.polimorfismoHerencia}
                language="python"
                highlightLines={[5, 6, 9, 10, 13, 14, 16, 17, 18]}
                animateLines
                durationInFrames={act1.polimorfismo.duration}
                annotation="Mismo metodo hablar(), diferente comportamiento"
              />
            </div>

            {/* Visualizacion */}
            <div
              style={{
                flex: 0.6,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: theme.spacing.lg,
              }}
            >
              <PolymorphismBox
                animal="Gato"
                name="Michi"
                sound="Miau"
                emoji="cat"
                color={theme.colors.http.get}
                frame={frame - act1.polimorfismo.start}
                delay={60}
              />
              <PolymorphismBox
                animal="Perro"
                name="Fido"
                sound="Guau"
                emoji="dog"
                color={theme.colors.http.post}
                frame={frame - act1.polimorfismo.start}
                delay={120}
              />
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Seccion 7: Abstraccion y ventajas (82-92s) */}
      <Sequence
        from={act1.abstraccion.start}
        durationInFrames={act1.abstraccion.duration}
      >
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'row',
            padding: theme.spacing.xxl,
            gap: theme.spacing.xxl,
          }}
        >
          {/* Abstraccion */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <AnimatedTitle
              text={pooConcepts.abstraccion.title}
              subtitle={pooConcepts.abstraccion.subtitle}
              fontSize={theme.fontSizes.xl}
              color={theme.colors.info}
            />

            <div style={{ marginTop: theme.spacing.lg }}>
              <AnimatedList
                items={pooConcepts.abstraccion.points}
                icon=">"
                delayBetweenItems={15}
              />
            </div>
          </div>

          {/* Ventajas */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <AnimatedTitle
              text={pooConcepts.ventajas.title}
              fontSize={theme.fontSizes.xl}
              color={theme.colors.success}
            />

            <div style={{ marginTop: theme.spacing.lg }}>
              <AnimatedList
                items={pooConcepts.ventajas.points}
                icon="+"
                delayBetweenItems={12}
              />
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Seccion 8: Transicion a practica (92-100s) */}
      <Sequence
        from={act1.transition.start}
        durationInFrames={act1.transition.duration}
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
            text="Ahora apliquemos todo esto"
            fontSize={theme.fontSizes.xl}
            color={theme.colors.secondary}
          />

          <div
            style={{
              marginTop: theme.spacing.xxl,
              fontSize: theme.fontSizes.lg,
              color: theme.colors.text,
              textAlign: 'center',
              opacity: interpolate(
                frame - act1.transition.start,
                [30, 60],
                [0, 1],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              ),
            }}
          >
            Clase <span style={{ color: theme.colors.primary }}>Usuarios</span>{' '}
            para una API REST con Flask
          </div>

          <div
            style={{
              marginTop: theme.spacing.xl,
              fontFamily: theme.fonts.code,
              fontSize: theme.fontSizes.md,
              color: theme.colors.textDark,
              opacity: interpolate(
                frame - act1.transition.start,
                [60, 90],
                [0, 1],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              ),
            }}
          >
            src/entities/usuarios.py
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};

// Diagrama de herencia
interface InheritanceDiagramProps {
  frame: number;
  parent: string;
  child: string;
  parentMethod: string;
  childMethod: string;
}

const InheritanceDiagram: React.FC<InheritanceDiagramProps> = ({
  frame,
  parent,
  child,
  parentMethod,
  childMethod,
}) => {
  const parentOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const arrowOpacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const childOpacity = interpolate(frame, [120, 150], [0, 1], {
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
      {/* Clase padre */}
      <div
        style={{
          opacity: parentOpacity,
          backgroundColor: theme.colors.primary,
          color: 'white',
          padding: theme.spacing.md,
          borderRadius: theme.borderRadius.lg,
          textAlign: 'center',
          minWidth: 150,
        }}
      >
        <div style={{ fontWeight: theme.fontWeights.bold, fontSize: theme.fontSizes.md }}>
          {parent}
        </div>
        <div style={{ fontSize: theme.fontSizes.sm, marginTop: theme.spacing.xs }}>
          {parentMethod}
        </div>
      </div>

      {/* Flecha */}
      <div
        style={{
          opacity: arrowOpacity,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 3,
            height: 30,
            backgroundColor: theme.colors.secondary,
          }}
        />
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderTop: `12px solid ${theme.colors.secondary}`,
          }}
        />
      </div>

      {/* Clase hijo */}
      <div
        style={{
          opacity: childOpacity,
          backgroundColor: theme.colors.secondary,
          color: 'white',
          padding: theme.spacing.md,
          borderRadius: theme.borderRadius.lg,
          textAlign: 'center',
          minWidth: 150,
        }}
      >
        <div style={{ fontWeight: theme.fontWeights.bold, fontSize: theme.fontSizes.md }}>
          {child}
        </div>
        <div style={{ fontSize: theme.fontSizes.sm, marginTop: theme.spacing.xs }}>
          {parentMethod}
        </div>
        <div
          style={{
            fontSize: theme.fontSizes.sm,
            color: theme.colors.success,
          }}
        >
          + {childMethod}
        </div>
      </div>
    </div>
  );
};

// Caja de concepto
interface ConceptBoxProps {
  title: string;
  items: string[];
  color: string;
  frame: number;
  delay: number;
}

const ConceptBox: React.FC<ConceptBoxProps> = ({ title, items, color, frame, delay }) => {
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
          color: color,
          fontWeight: theme.fontWeights.bold,
          fontSize: theme.fontSizes.md,
          marginBottom: theme.spacing.sm,
        }}
      >
        {title}
      </div>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            fontFamily: theme.fonts.code,
            fontSize: theme.fontSizes.sm,
            color: item.startsWith('+') ? theme.colors.success : theme.colors.text,
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

// Diagrama de encapsulacion
interface EncapsulationDiagramProps {
  frame: number;
}

const EncapsulationDiagram: React.FC<EncapsulationDiagramProps> = ({ frame }) => {
  const opacity = interpolate(frame, [120, 150], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        opacity,
        marginTop: theme.spacing.lg,
        display: 'flex',
        justifyContent: 'center',
        gap: theme.spacing.md,
      }}
    >
      <div
        style={{
          backgroundColor: theme.colors.error,
          color: 'white',
          padding: theme.spacing.sm,
          borderRadius: theme.borderRadius.md,
          fontSize: theme.fontSizes.sm,
        }}
      >
        _saldo (privado)
      </div>
      <div
        style={{
          backgroundColor: theme.colors.success,
          color: 'white',
          padding: theme.spacing.sm,
          borderRadius: theme.borderRadius.md,
          fontSize: theme.fontSizes.sm,
        }}
      >
        obtener_saldo() (publico)
      </div>
    </div>
  );
};

// Caja de polimorfismo
interface PolymorphismBoxProps {
  animal: string;
  name: string;
  sound: string;
  emoji: string;
  color: string;
  frame: number;
  delay: number;
}

const PolymorphismBox: React.FC<PolymorphismBoxProps> = ({
  animal,
  name,
  sound,
  color,
  frame,
  delay,
}) => {
  const opacity = interpolate(frame, [delay, delay + 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const scale = interpolate(frame, [delay, delay + 30], [0.8, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        backgroundColor: color,
        color: 'white',
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.lg,
        textAlign: 'center',
      }}
    >
      <div style={{ fontWeight: theme.fontWeights.bold, fontSize: theme.fontSizes.lg }}>
        {animal}("{name}")
      </div>
      <div style={{ marginTop: theme.spacing.sm, fontSize: theme.fontSizes.md }}>
        .hablar()
      </div>
      <div
        style={{
          marginTop: theme.spacing.sm,
          fontFamily: theme.fonts.code,
          fontSize: theme.fontSizes.lg,
          backgroundColor: 'rgba(0,0,0,0.2)',
          padding: theme.spacing.sm,
          borderRadius: theme.borderRadius.md,
        }}
      >
        "{name} dice: {sound}"
      </div>
    </div>
  );
};

// Diagrama de flujo para __init__
interface InitFlowDiagramProps {
  frame: number;
}

const InitFlowDiagram: React.FC<InitFlowDiagramProps> = ({ frame }) => {
  const step1Opacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const arrowOpacity = interpolate(frame, [120, 150], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const step2Opacity = interpolate(frame, [180, 210], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        marginTop: theme.spacing.xl,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: theme.spacing.md,
      }}
    >
      {/* Paso 1: Crear objeto */}
      <div
        style={{
          opacity: step1Opacity,
          backgroundColor: theme.colors.primary,
          color: 'white',
          padding: theme.spacing.md,
          borderRadius: theme.borderRadius.lg,
          fontFamily: theme.fonts.code,
          fontSize: theme.fontSizes.sm,
        }}
      >
        Perro("Fido", 3)
      </div>

      {/* Flecha */}
      <div
        style={{
          opacity: arrowOpacity,
          fontSize: theme.fontSizes.xl,
          color: theme.colors.secondary,
        }}
      >
        →
      </div>

      {/* Paso 2: __init__ se ejecuta */}
      <div
        style={{
          opacity: step2Opacity,
          backgroundColor: theme.colors.secondary,
          color: 'white',
          padding: theme.spacing.md,
          borderRadius: theme.borderRadius.lg,
          fontFamily: theme.fonts.code,
          fontSize: theme.fontSizes.sm,
        }}
      >
        __init__(self, "Fido", 3)
      </div>
    </div>
  );
};

// Tarjeta para metodos magicos
interface MagicMethodCardProps {
  method: string;
  description: string;
  example: string;
  color: string;
  frame: number;
  delay: number;
}

const MagicMethodCard: React.FC<MagicMethodCardProps> = ({
  method,
  description,
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
      }}
    >
      <div
        style={{
          color: color,
          fontWeight: theme.fontWeights.bold,
          fontFamily: theme.fonts.code,
          fontSize: theme.fontSizes.md,
        }}
      >
        {method}
      </div>
      <div
        style={{
          color: theme.colors.text,
          fontSize: theme.fontSizes.sm,
          marginTop: theme.spacing.xs,
        }}
      >
        {description}
      </div>
      <div
        style={{
          color: theme.colors.textDark,
          fontFamily: theme.fonts.code,
          fontSize: theme.fontSizes.xs,
          marginTop: theme.spacing.sm,
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
