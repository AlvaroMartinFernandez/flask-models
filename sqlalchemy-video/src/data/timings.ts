// Configuracion de timings del video SQLAlchemy (30 fps)
// 1 segundo = 30 frames
// Duraciones basadas en los audios ElevenLabs + 0.5s de pausa

const FPS = 30;

export const TIMINGS = {
  // ============================================
  // ACTO 1: Fundamentos (0s - 244.8s)
  // ORM, SQLAlchemy, Inicializacion
  // ============================================
  act1: {
    start: 0,
    end: 7344,

    intro: { start: 0, duration: 1528 },
    queEsOrm: { start: 1528, duration: 2101 },
    queEsSqlalchemy: { start: 3629, duration: 1496 },
    inicializacion: { start: 5125, duration: 2219 },
  },

  // ============================================
  // ACTO 2: Modelos y Columnas (244.8s - 451.2s)
  // Crear modelos, tipos de columnas, opciones
  // ============================================
  act2: {
    start: 7344,
    end: 13537,

    sintaxisModerna: { start: 7344, duration: 2286 },
    tiposColumnas: { start: 9630, duration: 1885 },
    opcionesColumnas: { start: 11515, duration: 2022 },
  },

  // ============================================
  // ACTO 3: Relaciones (451.2s - 785.1s)
  // 1:1, 1:N, N:N, ON DELETE
  // ============================================
  act3: {
    start: 13537,
    end: 23554,

    relacionUnoAUno: { start: 13537, duration: 2254 },
    relacionUnoAMuchos: { start: 15791, duration: 1977 },
    relacionMuchosDbTable: { start: 17768, duration: 2092 },
    relacionMuchosClase: { start: 19860, duration: 2052 },
    onDelete: { start: 21912, duration: 1642 },
  },

  // ============================================
  // ACTO 4: Serializacion (785.1s - 1059.9s)
  // __repr__, serialize, serializacion con relaciones
  // ============================================
  act4: {
    start: 23554,
    end: 31798,

    metodoRepr: { start: 23554, duration: 1794 },
    metodoSerialize: { start: 25348, duration: 2012 },
    serializacionRelaciones: { start: 27360, duration: 2187 },
    conclusion: { start: 29547, duration: 2251 },
  },
};

// Configuracion de video
export const VIDEO_CONFIG = {
  fps: FPS,
  width: 1920,
  height: 1080,
  durationInFrames: 31798, // ~1060s = ~17.7 minutos
};
