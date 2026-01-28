import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { theme } from '../styles/theme';

interface AnimatedListProps {
  items: string[];
  icon?: string;
  startFrame?: number;
  delayBetweenItems?: number;
  fontSize?: string;
}

export const AnimatedList: React.FC<AnimatedListProps> = ({
  items,
  icon = '>',
  startFrame = 0,
  delayBetweenItems = 10,
  fontSize = theme.fontSizes.lg,
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;

  return (
    <div
      style={{
        fontFamily: theme.fonts.sans,
        fontSize,
      }}
    >
      {items.map((item, index) => {
        const itemStartFrame = index * delayBetweenItems;

        // Animacion de slide in y fade in
        const translateY = interpolate(
          relativeFrame,
          [itemStartFrame, itemStartFrame + 15],
          [30, 0],
          {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }
        );

        const opacity = interpolate(
          relativeFrame,
          [itemStartFrame, itemStartFrame + 15],
          [0, 1],
          {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }
        );

        return (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: theme.spacing.md,
              transform: `translateY(${translateY}px)`,
              opacity,
            }}
          >
            <span
              style={{
                fontSize: theme.fontSizes.xl,
                marginRight: theme.spacing.md,
                color: theme.colors.success,
              }}
            >
              {icon}
            </span>
            <span style={{ color: theme.colors.text }}>
              {item}
            </span>
          </div>
        );
      })}
    </div>
  );
};
