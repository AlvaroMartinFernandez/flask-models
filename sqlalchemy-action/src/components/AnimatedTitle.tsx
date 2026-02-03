import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { theme } from '../styles/theme';

interface AnimatedTitleProps {
  text: string;
  fontSize?: string;
  color?: string;
  subtitle?: string;
  startFrame?: number;
}

export const AnimatedTitle: React.FC<AnimatedTitleProps> = ({
  text,
  fontSize = theme.fontSizes.xxl,
  color = theme.colors.primary,
  subtitle,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;

  const scale = interpolate(
    relativeFrame,
    [0, 20],
    [0.8, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const opacity = interpolate(
    relativeFrame,
    [0, 20],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const subtitleOpacity = interpolate(
    relativeFrame,
    [10, 30],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  return (
    <div
      style={{
        textAlign: 'center',
        fontFamily: theme.fonts.sans,
      }}
    >
      <h1
        style={{
          fontSize,
          color,
          fontWeight: theme.fontWeights.bold,
          margin: 0,
          transform: `scale(${scale})`,
          opacity,
          textShadow: theme.shadows.xl,
        }}
      >
        {text}
      </h1>

      {subtitle && (
        <p
          style={{
            fontSize: theme.fontSizes.lg,
            color: theme.colors.text,
            marginTop: theme.spacing.md,
            opacity: subtitleOpacity,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
