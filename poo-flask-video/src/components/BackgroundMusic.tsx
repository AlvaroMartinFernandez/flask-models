import React from 'react';
import { Audio, staticFile } from 'remotion';

interface BackgroundMusicProps {
  musicFile: string;
  volume?: number;
  startFrame?: number;
  endFrame?: number;
}

/**
 * Componente para música de fondo (opcional)
 *
 * @param musicFile - Nombre del archivo en public/audio/ (ej: 'background.mp3')
 * @param volume - Volumen bajo (0.0 a 1.0), default 0.15
 * @param startFrame - Frame donde empieza la música, default 0
 * @param endFrame - Frame donde termina, default 9000
 */
export const BackgroundMusic: React.FC<BackgroundMusicProps> = ({
  musicFile,
  volume = 0.15,
  startFrame = 0,
  endFrame = 9000,
}) => {
  return (
    <Audio
      src={staticFile(`audio/${musicFile}`)}
      startFrom={startFrame}
      endAt={endFrame}
      volume={volume}
      loop
    />
  );
};
