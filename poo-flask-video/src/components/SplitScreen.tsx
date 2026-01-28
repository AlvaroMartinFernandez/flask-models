import React, { ReactNode } from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { theme } from '../styles/theme';

interface SplitScreenProps {
  left: ReactNode;
  right: ReactNode;
  splitRatio?: number;
  animateEntry?: 'left' | 'right' | 'both' | 'none';
  startFrame?: number;
}

export const SplitScreen: React.FC<SplitScreenProps> = ({
  left,
  right,
  splitRatio = 0.5,
  animateEntry = 'both',
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;

  // Animación slide in desde los lados
  const leftTranslateX = interpolate(
    relativeFrame,
    [0, 30],
    [-1920, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const rightTranslateX = interpolate(
    relativeFrame,
    [0, 30],
    [1920, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const getTransform = (side: 'left' | 'right') => {
    if (animateEntry === 'none') return 'translateX(0)';
    if (animateEntry === 'both') {
      return side === 'left'
        ? `translateX(${leftTranslateX}px)`
        : `translateX(${rightTranslateX}px)`;
    }
    if (animateEntry === side) {
      return side === 'left'
        ? `translateX(${leftTranslateX}px)`
        : `translateX(${rightTranslateX}px)`;
    }
    return 'translateX(0)';
  };

  const leftWidth = `${splitRatio * 100}%`;
  const rightWidth = `${(1 - splitRatio) * 100}%`;

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        gap: theme.spacing.md,
      }}
    >
      <div
        style={{
          width: leftWidth,
          transform: getTransform('left'),
        }}
      >
        {left}
      </div>

      <div
        style={{
          width: rightWidth,
          transform: getTransform('right'),
        }}
      >
        {right}
      </div>
    </div>
  );
};
