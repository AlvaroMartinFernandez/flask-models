import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { Act1_Fundamentals } from './scenes/Act1_Fundamentals';
import { Act2_Models } from './scenes/Act2_Models';
import { Act3_Relations } from './scenes/Act3_Relations';
import { Act4_Serialization } from './scenes/Act4_Serialization';
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

      {/* Acto 1: Fundamentos - ORM, SQLAlchemy, Inicializacion (0-120s) */}
      <Sequence
        from={TIMINGS.act1.start}
        durationInFrames={TIMINGS.act1.end - TIMINGS.act1.start}
        premountFor={30}
      >
        <Act1_Fundamentals />
      </Sequence>

      {/* Acto 2: Modelos y Columnas (120-200s) */}
      <Sequence
        from={TIMINGS.act2.start}
        durationInFrames={TIMINGS.act2.end - TIMINGS.act2.start}
        premountFor={30}
      >
        <Act2_Models />
      </Sequence>

      {/* Acto 3: Relaciones (200-360s) */}
      <Sequence
        from={TIMINGS.act3.start}
        durationInFrames={TIMINGS.act3.end - TIMINGS.act3.start}
        premountFor={30}
      >
        <Act3_Relations />
      </Sequence>

      {/* Acto 4: Serializacion (360-480s) */}
      <Sequence
        from={TIMINGS.act4.start}
        durationInFrames={TIMINGS.act4.end - TIMINGS.act4.start}
        premountFor={30}
      >
        <Act4_Serialization />
      </Sequence>
    </AbsoluteFill>
  );
};
