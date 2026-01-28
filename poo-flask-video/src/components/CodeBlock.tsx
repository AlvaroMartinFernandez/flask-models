import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { Highlight, themes } from 'prism-react-renderer';
import { theme } from '../styles/theme';

interface CodeBlockProps {
  code: string;
  language?: 'python' | 'json' | 'bash';
  highlightLines?: number[];
  animateLines?: boolean;
  startLine?: number;
  endLine?: number;
  annotation?: string;
  startFrame?: number;
  durationInFrames?: number;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'python',
  highlightLines = [],
  animateLines = false,
  startLine,
  endLine,
  annotation,
  startFrame = 0,
  durationInFrames = 60,
}) => {
  const frame = useCurrentFrame();

  // Calcular las líneas a mostrar
  const lines = code.split('\n');
  const displayLines = lines.slice(
    startLine ? startLine - 1 : 0,
    endLine
  );

  // Animación línea por línea
  const visibleLinesCount = animateLines
    ? Math.floor(
        interpolate(
          frame - startFrame,
          [0, durationInFrames],
          [0, displayLines.length],
          {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }
        )
      )
    : displayLines.length;

  // Animación de fade in
  const opacity = interpolate(
    frame - startFrame,
    [0, 15],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  return (
    <div
      style={{
        opacity,
        backgroundColor: theme.colors.background,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.lg,
        boxShadow: theme.shadows.code,
        border: `2px solid ${theme.colors.primary}`,
        position: 'relative',
      }}
    >
      <Highlight
        theme={themes.vsDark}
        code={displayLines.slice(0, visibleLinesCount).join('\n')}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={className}
            style={{
              ...style,
              backgroundColor: 'transparent',
              margin: 0,
              fontFamily: theme.fonts.code,
              fontSize: theme.fontSizes.code,
              lineHeight: theme.lineHeights.code,
              overflow: 'visible',
            }}
          >
            {tokens.map((line, i) => {
              const lineNumber = (startLine || 1) + i;
              const isHighlighted = highlightLines.includes(lineNumber);

              return (
                <div
                  key={i}
                  {...getLineProps({ line })}
                  style={{
                    ...getLineProps({ line }).style,
                    backgroundColor: isHighlighted
                      ? theme.colors.highlight
                      : 'transparent',
                    borderLeft: isHighlighted
                      ? `4px solid ${theme.colors.highlightBorder}`
                      : '4px solid transparent',
                    paddingLeft: theme.spacing.sm,
                    marginLeft: -theme.spacing.sm,
                    display: 'flex',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      width: '50px',
                      userSelect: 'none',
                      color: theme.colors.textDark,
                      textAlign: 'right',
                      marginRight: theme.spacing.md,
                    }}
                  >
                    {lineNumber}
                  </span>
                  <span style={{ flex: 1 }}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>

      {annotation && (
        <div
          style={{
            marginTop: theme.spacing.md,
            padding: theme.spacing.sm,
            backgroundColor: theme.colors.primary,
            borderRadius: theme.borderRadius.md,
            color: 'white',
            fontSize: theme.fontSizes.sm,
            fontFamily: theme.fonts.sans,
          }}
        >
          {annotation}
        </div>
      )}
    </div>
  );
};
