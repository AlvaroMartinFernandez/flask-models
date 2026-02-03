import React from 'react';
import { Audio, staticFile, interpolate, useCurrentFrame } from 'remotion';

interface AudioNarrationProps {
  audioFile: string;
  volume?: number | ((frame: number) => number);
  fadeIn?: number;
  fadeOut?: number;
  playbackRate?: number;
}

export const AudioNarration: React.FC<AudioNarrationProps> = ({
  audioFile,
  volume = 1.0,
  fadeIn = 0,
  fadeOut = 0,
  playbackRate = 1.0,
}) => {
  const frame = useCurrentFrame();

  const getVolume = (f: number): number => {
    let vol = typeof volume === 'function' ? volume(f) : volume;

    if (fadeIn > 0 && f < fadeIn) {
      vol *= interpolate(f, [0, fadeIn], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
    }

    return vol;
  };

  return (
    <Audio
      src={staticFile(`audio/${audioFile}`)}
      volume={fadeIn > 0 || typeof volume === 'function' ? getVolume : volume}
      playbackRate={playbackRate}
    />
  );
};
