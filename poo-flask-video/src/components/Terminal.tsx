import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { theme } from '../styles/theme';

interface TerminalCommand {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  body?: object;
  response: object | string;
  status: number;
}

interface TerminalProps {
  commands: TerminalCommand[];
  typingSpeed?: number;
  startFrame?: number;
}

export const Terminal: React.FC<TerminalProps> = ({
  commands,
  typingSpeed = 2,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;

  // Método para obtener color según HTTP method
  const getMethodColor = (method: string) => {
    const colors = theme.colors.http;
    switch (method) {
      case 'GET':
        return colors.get;
      case 'POST':
        return colors.post;
      case 'PUT':
        return colors.put;
      case 'DELETE':
        return colors.delete;
      default:
        return theme.colors.text;
    }
  };

  // Método para obtener color según status code
  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return theme.colors.success;
    if (status >= 400) return theme.colors.error;
    return theme.colors.warning;
  };

  // Animación de typing para cada comando
  const framesPerCommand = 120; // 4 segundos por comando
  const currentCommandIndex = Math.floor(relativeFrame / framesPerCommand);
  const commandFrame = relativeFrame % framesPerCommand;

  // Calcular cuántos caracteres mostrar
  const charsToShow = Math.floor(commandFrame / typingSpeed);

  return (
    <div
      style={{
        backgroundColor: '#0e0e0e',
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.lg,
        fontFamily: theme.fonts.code,
        fontSize: theme.fontSizes.code,
        color: theme.colors.text,
        boxShadow: theme.shadows.code,
        border: `2px solid ${theme.colors.secondary}`,
        minHeight: 400,
      }}
    >
      {/* Terminal header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: theme.spacing.md,
          borderBottom: `1px solid ${theme.colors.textDark}`,
          paddingBottom: theme.spacing.sm,
        }}
      >
        <div style={{ display: 'flex', gap: 8 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: '#ff5f56',
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: '#ffbd2e',
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: '#27c93f',
            }}
          />
        </div>
        <span style={{ marginLeft: theme.spacing.md, color: theme.colors.textDark }}>
          Terminal - API Demo
        </span>
      </div>

      {/* Comandos ejecutados */}
      {commands.slice(0, currentCommandIndex + 1).map((cmd, index) => {
        const isCurrentCommand = index === currentCommandIndex;
        const requestText = `${cmd.method} ${cmd.url}`;
        const bodyText = cmd.body ? `\n${JSON.stringify(cmd.body, null, 2)}` : '';
        const fullRequestText = requestText + bodyText;

        // Para el comando actual, aplicar typing animation
        const displayText = isCurrentCommand
          ? fullRequestText.substring(0, charsToShow)
          : fullRequestText;

        // Mostrar response solo si el typing del request está completo
        const showResponse = isCurrentCommand
          ? charsToShow > fullRequestText.length + 10
          : true;

        const responseText = typeof cmd.response === 'string'
          ? cmd.response
          : JSON.stringify(cmd.response, null, 2);

        return (
          <div key={index} style={{ marginBottom: theme.spacing.lg }}>
            {/* Request */}
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span style={{ color: theme.colors.success, marginRight: 8 }}>$</span>
              <span
                style={{
                  color: getMethodColor(cmd.method),
                  fontWeight: theme.fontWeights.bold,
                  marginRight: 8,
                }}
              >
                {cmd.method}
              </span>
              <span style={{ color: theme.colors.text }}>
                {displayText.replace(requestText.split(' ')[0] + ' ', '')}
              </span>
              {isCurrentCommand && displayText.length < fullRequestText.length && (
                <span
                  style={{
                    marginLeft: 2,
                    animation: 'blink 1s infinite',
                    color: theme.colors.text,
                  }}
                >
                  ▊
                </span>
              )}
            </div>

            {/* Body (if exists) */}
            {cmd.body && showResponse && (
              <div
                style={{
                  marginTop: theme.spacing.xs,
                  marginLeft: theme.spacing.md,
                  color: theme.colors.python.string,
                }}
              >
                {bodyText}
              </div>
            )}

            {/* Response */}
            {showResponse && (
              <div style={{ marginTop: theme.spacing.sm, marginLeft: theme.spacing.md }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span
                    style={{
                      color: getStatusColor(cmd.status),
                      fontWeight: theme.fontWeights.bold,
                    }}
                  >
                    {cmd.status}
                  </span>
                  <span style={{ color: theme.colors.textDark }}>
                    {cmd.status >= 200 && cmd.status < 300 ? 'OK' : 'Error'}
                  </span>
                </div>
                <pre
                  style={{
                    marginTop: theme.spacing.xs,
                    color: theme.colors.json.string,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}
                >
                  {responseText}
                </pre>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
