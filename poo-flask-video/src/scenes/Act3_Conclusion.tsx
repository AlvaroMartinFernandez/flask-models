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
import { AnimatedList } from '../components/AnimatedList';
import { SplitScreen } from '../components/SplitScreen';
import { codeSnippets } from '../data/codeSnippets';
import { apiResponses } from '../data/userData';
import { TIMINGS } from '../data/timings';
import { theme } from '../styles/theme';

export const Act3_Conclusion: React.FC = () => {
  const { act3 } = TIMINGS;
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.background }}>
      {/* Seccion 1: Demo Flask - Setup inicial (230-244s) */}
      <Sequence
        from={act3.flaskDemo.start - TIMINGS.act3.start}
        durationInFrames={act3.flaskDemo.duration}
      >
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing.xxl,
          }}
        >
          <AnimatedTitle
            text="Flask + Clase Usuarios"
            subtitle="Conectando POO con una API REST"
            fontSize={theme.fontSizes.xl}
            color={theme.colors.primary}
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
            {/* Codigo Setup */}
            <div style={{ flex: 1 }}>
              <CodeBlock
                code={codeSnippets.flaskSetup}
                language="python"
                highlightLines={[1, 2, 4, 7, 9, 10, 11]}
                animateLines
                durationInFrames={act3.flaskDemo.duration}
                annotation="Importamos Flask y creamos instancia de Usuarios"
              />
            </div>

            {/* Diagrama de conexión */}
            <div
              style={{
                flex: 0.6,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: theme.spacing.lg,
              }}
            >
              <FlaskConnectionDiagram frame={frame - (act3.flaskDemo.start - TIMINGS.act3.start)} />
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Seccion 2: GET Endpoints con respuesta (244-258s) */}
      <Sequence
        from={act3.getEndpoints.start - TIMINGS.act3.start}
        durationInFrames={act3.getEndpoints.duration}
      >
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing.xxl,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.md }}>
            <HttpBadge method="GET" color={theme.colors.http.get} />
            <AnimatedTitle
              text="Endpoints GET en Flask"
              subtitle="Codigo + Respuesta JSON"
              fontSize={theme.fontSizes.xl}
            />
          </div>

          <div
            style={{
              flex: 1,
              display: 'flex',
              gap: theme.spacing.lg,
              marginTop: theme.spacing.lg,
            }}
          >
            {/* Codigo */}
            <div style={{ flex: 1 }}>
              <CodeBlock
                code={codeSnippets.flaskGetAll}
                language="python"
                highlightLines={[1, 3]}
                annotation="@app.route define la URL del endpoint"
              />
              <div style={{ marginTop: theme.spacing.md }}>
                <CodeBlock
                  code={codeSnippets.flaskGetOne}
                  language="python"
                  highlightLines={[1, 3]}
                  annotation="<int:user_id> captura el ID de la URL"
                />
              </div>
            </div>

            {/* Respuestas */}
            <div style={{ flex: 0.8 }}>
              <EndpointResponse
                frame={frame - (act3.getEndpoints.start - TIMINGS.act3.start)}
                request={apiResponses.getOne.request}
                response={apiResponses.getOne.response}
                status={apiResponses.getOne.status}
                delay={0}
              />
              <div style={{ marginTop: theme.spacing.md }}>
                <EndpointResponse
                  frame={frame - (act3.getEndpoints.start - TIMINGS.act3.start)}
                  request={apiResponses.getAll.request}
                  response={apiResponses.getAll.response.slice(0, 2)}
                  status={apiResponses.getAll.status}
                  delay={60}
                />
              </div>
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Seccion 3: POST Endpoint con respuesta (258-272s) */}
      <Sequence
        from={act3.postEndpoint.start - TIMINGS.act3.start}
        durationInFrames={act3.postEndpoint.duration}
      >
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing.xxl,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.md }}>
            <HttpBadge method="POST" color={theme.colors.http.post} />
            <AnimatedTitle
              text="Endpoint POST - Crear usuario"
              subtitle="Recibe JSON, retorna el nuevo usuario"
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
            <div style={{ flex: 1.2 }}>
              <CodeBlock
                code={codeSnippets.flaskPost}
                language="python"
                highlightLines={[3, 9, 10, 11, 13]}
                annotation="request.get_json() obtiene los datos del body"
              />
            </div>

            <div style={{ flex: 0.8 }}>
              <RequestResponseFlow
                frame={frame - (act3.postEndpoint.start - TIMINGS.act3.start)}
                request={apiResponses.post.body!}
                response={apiResponses.post.response}
                status={201}
                color={theme.colors.http.post}
              />
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Seccion 4: PUT y DELETE con respuesta (272-286s) */}
      <Sequence
        from={act3.putDeleteEndpoints.start - TIMINGS.act3.start}
        durationInFrames={act3.putDeleteEndpoints.duration}
      >
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing.xxl,
          }}
        >
          <AnimatedTitle
            text="Endpoints PUT y DELETE"
            subtitle="Actualizar y eliminar usuarios"
            fontSize={theme.fontSizes.xl}
          />

          <div style={{ marginTop: theme.spacing.lg, flex: 1 }}>
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
                    <HttpBadge method="PUT" color={theme.colors.http.put} />
                    <span style={{ color: theme.colors.text, fontSize: theme.fontSizes.md }}>
                      /users/1
                    </span>
                  </div>
                  <div
                    style={{
                      backgroundColor: '#0e0e0e',
                      border: `2px solid ${theme.colors.http.put}`,
                      borderRadius: theme.borderRadius.md,
                      padding: theme.spacing.md,
                      marginBottom: theme.spacing.sm,
                    }}
                  >
                    <div
                      style={{
                        fontSize: theme.fontSizes.xs,
                        color: theme.colors.textDark,
                        marginBottom: theme.spacing.xs,
                      }}
                    >
                      Body:
                    </div>
                    <pre
                      style={{
                        fontFamily: theme.fonts.code,
                        fontSize: theme.fontSizes.sm,
                        color: theme.colors.json.string,
                        margin: 0,
                      }}
                    >
                      {JSON.stringify(apiResponses.put.body, null, 2)}
                    </pre>
                  </div>
                  <div
                    style={{
                      backgroundColor: theme.colors.http.put,
                      color: 'white',
                      borderRadius: theme.borderRadius.md,
                      padding: theme.spacing.md,
                      fontSize: theme.fontSizes.sm,
                    }}
                  >
                    <div style={{ marginBottom: theme.spacing.xs }}>Response 200:</div>
                    <pre
                      style={{
                        fontFamily: theme.fonts.code,
                        margin: 0,
                      }}
                    >
                      {JSON.stringify(apiResponses.put.response, null, 2)}
                    </pre>
                  </div>
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
                    <HttpBadge method="DELETE" color={theme.colors.http.delete} />
                    <span style={{ color: theme.colors.text, fontSize: theme.fontSizes.md }}>
                      /users/5
                    </span>
                  </div>
                  <div
                    style={{
                      backgroundColor: theme.colors.http.delete,
                      color: 'white',
                      borderRadius: theme.borderRadius.md,
                      padding: theme.spacing.lg,
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontSize: theme.fontSizes.lg, marginBottom: theme.spacing.md }}>
                      Response 200:
                    </div>
                    <pre
                      style={{
                        fontFamily: theme.fonts.code,
                        fontSize: theme.fontSizes.md,
                        margin: 0,
                      }}
                    >
                      {JSON.stringify(apiResponses.delete.response, null, 2)}
                    </pre>
                  </div>
                </div>
              }
              splitRatio={0.55}
              animateEntry="both"
            />
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Seccion 5: Resumen y cierre (286-300s) */}
      <Sequence
        from={act3.conclusion.start - TIMINGS.act3.start}
        durationInFrames={act3.conclusion.duration}
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
            text="Resumen"
            fontSize={theme.fontSizes.xl}
            color={theme.colors.primary}
          />

          <div
            style={{
              marginTop: theme.spacing.xl,
              maxWidth: 800,
            }}
          >
            <AnimatedList
              items={[
                'Clase = Molde para crear objetos',
                '__init__ = Constructor que inicializa atributos',
                'self = Referencia a la instancia actual',
                'Métodos mágicos = Personalizan comportamiento (__dict__, __str__)',
                'Métodos = Funciones que operan sobre los datos',
              ]}
              icon=">"
              delayBetweenItems={8}
            />
          </div>

          <div
            style={{
              marginTop: theme.spacing.xl,
              fontSize: theme.fontSizes.lg,
              color: theme.colors.secondary,
              opacity: interpolate(
                frame - (act3.conclusion.start - TIMINGS.act3.start),
                [60, 90],
                [0, 1],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              ),
            }}
          >
            src/entities/usuarios.py + src/app.py
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};

// Componente para badge HTTP
interface HttpBadgeProps {
  method: string;
  color: string;
}

const HttpBadge: React.FC<HttpBadgeProps> = ({ method, color }) => (
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

// Componente para mostrar request/response de endpoint
interface EndpointResponseProps {
  frame: number;
  request: string;
  response: object;
  status: number;
  delay: number;
}

const EndpointResponse: React.FC<EndpointResponseProps> = ({
  frame,
  request,
  response,
  status,
  delay,
}) => {
  const opacity = interpolate(frame, [delay, delay + 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        opacity,
        backgroundColor: '#0e0e0e',
        border: `2px solid ${theme.colors.http.get}`,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
      }}
    >
      <div
        style={{
          fontFamily: theme.fonts.code,
          fontSize: theme.fontSizes.sm,
          color: theme.colors.http.get,
          marginBottom: theme.spacing.sm,
        }}
      >
        {request}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing.sm,
          marginBottom: theme.spacing.sm,
        }}
      >
        <span
          style={{
            backgroundColor: theme.colors.success,
            color: 'white',
            padding: `2px ${theme.spacing.xs}px`,
            borderRadius: theme.borderRadius.sm,
            fontSize: theme.fontSizes.xs,
          }}
        >
          {status}
        </span>
        <span style={{ color: theme.colors.textDark, fontSize: theme.fontSizes.xs }}>
          OK
        </span>
      </div>
      <pre
        style={{
          fontFamily: theme.fonts.code,
          fontSize: theme.fontSizes.xs,
          color: theme.colors.json.string,
          margin: 0,
          whiteSpace: 'pre-wrap',
        }}
      >
        {JSON.stringify(response, null, 2)}
      </pre>
    </div>
  );
};

// Componente para flujo request/response
interface RequestResponseFlowProps {
  frame: number;
  request: object;
  response: object;
  status: number;
  color: string;
}

const RequestResponseFlow: React.FC<RequestResponseFlowProps> = ({
  frame,
  request,
  response,
  status,
  color,
}) => {
  const requestOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const arrowOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const responseOpacity = interpolate(frame, [60, 80], [0, 1], {
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
      {/* Request */}
      <div
        style={{
          opacity: requestOpacity,
          backgroundColor: '#0e0e0e',
          border: `2px solid ${color}`,
          borderRadius: theme.borderRadius.md,
          padding: theme.spacing.md,
          width: '100%',
        }}
      >
        <div
          style={{
            fontSize: theme.fontSizes.xs,
            color: theme.colors.textDark,
            marginBottom: theme.spacing.xs,
          }}
        >
          Request Body:
        </div>
        <pre
          style={{
            fontFamily: theme.fonts.code,
            fontSize: theme.fontSizes.sm,
            color: theme.colors.json.string,
            margin: 0,
          }}
        >
          {JSON.stringify(request, null, 2)}
        </pre>
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

      {/* Response */}
      <div
        style={{
          opacity: responseOpacity,
          backgroundColor: color,
          color: 'white',
          borderRadius: theme.borderRadius.md,
          padding: theme.spacing.md,
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing.sm,
            marginBottom: theme.spacing.sm,
          }}
        >
          <span
            style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              padding: `2px ${theme.spacing.xs}px`,
              borderRadius: theme.borderRadius.sm,
              fontSize: theme.fontSizes.xs,
            }}
          >
            {status} Created
          </span>
        </div>
        <pre
          style={{
            fontFamily: theme.fonts.code,
            fontSize: theme.fontSizes.sm,
            margin: 0,
          }}
        >
          {JSON.stringify(response, null, 2)}
        </pre>
      </div>
    </div>
  );
};

// Diagrama de conexión Flask + Usuarios
interface FlaskConnectionDiagramProps {
  frame: number;
}

const FlaskConnectionDiagram: React.FC<FlaskConnectionDiagramProps> = ({ frame }) => {
  const flaskOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const arrowOpacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const classOpacity = interpolate(frame, [120, 150], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: theme.spacing.lg,
      }}
    >
      {/* Flask */}
      <div
        style={{
          opacity: flaskOpacity,
          backgroundColor: theme.colors.primary,
          color: 'white',
          padding: theme.spacing.lg,
          borderRadius: theme.borderRadius.lg,
          textAlign: 'center',
          minWidth: 150,
        }}
      >
        <div style={{ fontWeight: theme.fontWeights.bold, fontSize: theme.fontSizes.lg }}>
          Flask API
        </div>
        <div style={{ fontSize: theme.fontSizes.sm, marginTop: theme.spacing.xs }}>
          app.py
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
        <div style={{ fontSize: theme.fontSizes.md, color: theme.colors.secondary }}>
          usa
        </div>
        <div style={{ fontSize: theme.fontSizes.xl, color: theme.colors.secondary }}>
          ↓
        </div>
      </div>

      {/* Clase Usuarios */}
      <div
        style={{
          opacity: classOpacity,
          backgroundColor: theme.colors.secondary,
          color: 'white',
          padding: theme.spacing.lg,
          borderRadius: theme.borderRadius.lg,
          textAlign: 'center',
          minWidth: 150,
        }}
      >
        <div style={{ fontWeight: theme.fontWeights.bold, fontSize: theme.fontSizes.lg }}>
          Clase Usuarios
        </div>
        <div style={{ fontSize: theme.fontSizes.sm, marginTop: theme.spacing.xs }}>
          usuarios.py
        </div>
      </div>
    </div>
  );
};
