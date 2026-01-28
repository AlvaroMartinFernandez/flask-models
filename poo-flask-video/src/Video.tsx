import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { Act1_Introduction } from './scenes/Act1_Introduction';
import { Act2_Practice } from './scenes/Act2_Practice';
import { Act3_Conclusion } from './scenes/Act3_Conclusion';
import { AudioNarration } from './components/AudioNarration';
import { narrationScript } from './data/narrationScript';
import { TIMINGS } from './data/timings';
import { theme } from './styles/theme';

// Configuracion de audio
const AUDIO_CONFIG = {
  enabled: true, // Cambiar a false para previsualizar sin audio
  volume: 1.0,
  fadeIn: 10, // frames de fade in
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

      {/* Acto 1: Fundamentos de POO (0-150s) - Incluye __init__ y métodos mágicos */}
      <Sequence
        from={TIMINGS.act1.start}
        durationInFrames={TIMINGS.act1.end - TIMINGS.act1.start}
        premountFor={30}
      >
        <Act1_Introduction />
      </Sequence>

      {/* Acto 2: Clase Usuarios y CRUD (150-230s) */}
      <Sequence
        from={TIMINGS.act2.start}
        durationInFrames={TIMINGS.act2.end - TIMINGS.act2.start}
        premountFor={30}
      >
        <Act2_Practice />
      </Sequence>

      {/* Acto 3: Endpoints Flask y Conclusión (230-300s) */}
      <Sequence
        from={TIMINGS.act3.start}
        durationInFrames={TIMINGS.act3.end - TIMINGS.act3.start}
        premountFor={30}
      >
        <Act3_Conclusion />
      </Sequence>
    </AbsoluteFill>
  );
};
