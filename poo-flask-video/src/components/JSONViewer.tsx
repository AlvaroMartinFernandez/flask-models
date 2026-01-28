import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { theme } from '../styles/theme';

interface JSONViewerProps {
  data: any;
  animateKeys?: boolean;
  highlightPath?: string[];
  startFrame?: number;
  durationInFrames?: number;
}

export const JSONViewer: React.FC<JSONViewerProps> = ({
  data,
  animateKeys = false,
  highlightPath = [],
  startFrame = 0,
  durationInFrames = 60,
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;

  // Animación de fade in
  const opacity = interpolate(
    relativeFrame,
    [0, 15],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Renderizar valor con color según tipo
  const renderValue = (value: any, depth: number = 0): JSX.Element => {
    const indent = '  '.repeat(depth);

    if (value === null) {
      return <span style={{ color: theme.colors.json.null }}>null</span>;
    }

    if (typeof value === 'boolean') {
      return <span style={{ color: theme.colors.json.boolean }}>{String(value)}</span>;
    }

    if (typeof value === 'number') {
      return <span style={{ color: theme.colors.json.number }}>{value}</span>;
    }

    if (typeof value === 'string') {
      return <span style={{ color: theme.colors.json.string }}>"{value}"</span>;
    }

    if (Array.isArray(value)) {
      if (value.length === 0) return <span>[]</span>;

      return (
        <>
          <span>[</span>
          <div style={{ marginLeft: theme.spacing.md }}>
            {value.map((item, index) => (
              <div key={index}>
                {renderValue(item, depth + 1)}
                {index < value.length - 1 ? ',' : ''}
              </div>
            ))}
          </div>
          <span>{indent}]</span>
        </>
      );
    }

    if (typeof value === 'object') {
      const keys = Object.keys(value);
      if (keys.length === 0) return <span>{'{}'}</span>;

      // Si animateKeys está activado, mostrar solo las keys visibles
      const visibleKeys = animateKeys
        ? keys.slice(
            0,
            Math.floor(
              interpolate(
                relativeFrame,
                [0, durationInFrames],
                [0, keys.length],
                {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }
              )
            )
          )
        : keys;

      return (
        <>
          <span>{'{'}</span>
          <div style={{ marginLeft: theme.spacing.md }}>
            {visibleKeys.map((key, index) => (
              <div key={key} style={{ display: 'flex' }}>
                <span style={{ color: theme.colors.json.key }}>"{key}"</span>
                <span style={{ margin: '0 4px' }}>:</span>
                {renderValue(value[key], depth + 1)}
                {index < visibleKeys.length - 1 ? ',' : ''}
              </div>
            ))}
          </div>
          <span>{indent}{'}'}</span>
        </>
      );
    }

    return <span>{String(value)}</span>;
  };

  return (
    <div
      style={{
        opacity,
        backgroundColor: theme.colors.background,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.lg,
        boxShadow: theme.shadows.md,
        border: `2px solid ${theme.colors.secondary}`,
        fontFamily: theme.fonts.code,
        fontSize: theme.fontSizes.code,
        lineHeight: theme.lineHeights.code,
        color: theme.colors.text,
        overflow: 'auto',
      }}
    >
      <pre style={{ margin: 0 }}>
        {renderValue(data)}
      </pre>
    </div>
  );
};
