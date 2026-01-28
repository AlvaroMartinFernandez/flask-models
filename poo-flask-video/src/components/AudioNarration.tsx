import React from 'react';
import { Audio } from '@remotion/media';
import { staticFile, interpolate, useCurrentFrame } from 'remotion';

interface AudioNarrationProps {
  audioFile: string;
  volume?: number | ((frame: number) => number);
  fadeIn?: number; // frames para fade in
  fadeOut?: number; // frames para fade out
  playbackRate?: number;
}

/**
 * Componente para reproducir audio de narracion sincronizado con el video
 *
 * @param audioFile - Nombre del archivo en public/audio/ (ej: 'intro.mp3')
 * @param volume - Volumen (0.0 a 1.0) o funcion de volumen dinamico
 * @param fadeIn - Frames para fade in al inicio
 * @param fadeOut - Frames para fade out al final
 * @param playbackRate - Velocidad de reproduccion (default 1.0)
 */
export const AudioNarration: React.FC<AudioNarrationProps> = ({
  audioFile,
  volume = 1.0,
  fadeIn = 0,
  fadeOut = 0,
  playbackRate = 1.0,
}) => {
  const frame = useCurrentFrame();

  // Calcular volumen con fade in/out si se especifica
  const getVolume = (f: number): number => {
    let vol = typeof volume === 'function' ? volume(f) : volume;

    // Aplicar fade in
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

/**
 * Componente para musica de fondo con control de volumen
 */
interface BackgroundMusicProps {
  musicFile: string;
  volume?: number;
  loop?: boolean;
}

export const BackgroundMusic: React.FC<BackgroundMusicProps> = ({
  musicFile,
  volume = 0.1,
  loop = true,
}) => {
  return (
    <Audio
      src={staticFile(`audio/${musicFile}`)}
      volume={volume}
      loop={loop}
    />
  );
};
