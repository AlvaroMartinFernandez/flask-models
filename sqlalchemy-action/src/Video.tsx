import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { Act1_Intro } from './scenes/Act1_Intro';
import { Act2_Read } from './scenes/Act2_Read';
import { Act3_Create } from './scenes/Act3_Create';
import { Act4_UpdateDelete } from './scenes/Act4_UpdateDelete';
import { AudioNarration } from './components/AudioNarration';
import { narrationScript } from './data/narrationScript';
import { TIMINGS } from './data/timings';
import { theme } from './styles/theme';

// Configuracion de audio
const AUDIO_CONFIG = {
  enabled: true,
  volume: 1.0,
  fadeIn: 10,
};

export const Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.background }}>
      {/* ===== AUDIO NARRACION ===== */}
      {AUDIO_CONFIG.enabled &&
        narrationScript.map((segment) => (
          <Sequence
            key={segment.id}
            from={segment.startFrame}
            durationInFrames={segment.durationFrames}
          >
            <AudioNarration
              audioFile={segment.audioFile || `${segment.id}.mp3`}
              volume={AUDIO_CONFIG.volume}
              fadeIn={AUDIO_CONFIG.fadeIn}
            />
          </Sequence>
        ))}

      {/* ===== ESCENAS VISUALES ===== */}

      {/* Acto 1: Intro y Arquitectura */}
      <Sequence
        from={TIMINGS.act1.start}
        durationInFrames={TIMINGS.act1.end - TIMINGS.act1.start}
        premountFor={30}
      >
        <Act1_Intro />
      </Sequence>

      {/* Acto 2: READ - Consultar Datos */}
      <Sequence
        from={TIMINGS.act2.start}
        durationInFrames={TIMINGS.act2.end - TIMINGS.act2.start}
        premountFor={30}
      >
        <Act2_Read />
      </Sequence>

      {/* Acto 3: CREATE - Crear Datos */}
      <Sequence
        from={TIMINGS.act3.start}
        durationInFrames={TIMINGS.act3.end - TIMINGS.act3.start}
        premountFor={30}
      >
        <Act3_Create />
      </Sequence>

      {/* Acto 4: UPDATE, DELETE y Cierre */}
      <Sequence
        from={TIMINGS.act4.start}
        durationInFrames={TIMINGS.act4.end - TIMINGS.act4.start}
        premountFor={30}
      >
        <Act4_UpdateDelete />
      </Sequence>
    </AbsoluteFill>
  );
};
