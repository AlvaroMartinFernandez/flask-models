// Configuracion de timings del video SQLAlchemy Actions (30 fps)
// 1 segundo = 30 frames
// IMPORTANTE: los start de cada seccion son RELATIVOS al inicio de su acto
// Estos timings se actualizan cuando se generan los audios

const FPS = 30;

export const TIMINGS = {
  // ============================================
  // ACTO 1: Intro y Estructura (0s - 177s)
  // CRUD, app.py + models.py, setup
  // ============================================
  act1: {
    start: 0,
    end: 5309,

    intro: { start: 0, duration: 1446 },
    estructura: { start: 1446, duration: 1961 },
    setup: { start: 3407, duration: 1902 },
  },

  // ============================================
  // ACTO 2: READ - Consultar Datos (177s - 357s)
  // query.all(), query.get(), filter_by()
  // ============================================
  act2: {
    start: 5309,
    end: 10706,

    getAll: { start: 0, duration: 1852 },
    getById: { start: 1852, duration: 2030 },
    filterBy: { start: 3882, duration: 1515 },
  },

  // ============================================
  // ACTO 3: CREATE - Crear Datos (357s - 525s)
  // POST basico, validaciones, relaciones
  // ============================================
  act3: {
    start: 10706,
    end: 15759,

    postBasico: { start: 0, duration: 1811 },
    validaciones: { start: 1811, duration: 1676 },
    postRelacion: { start: 3487, duration: 1566 },
  },

  // ============================================
  // ACTO 4: UPDATE, DELETE y Cierre (525s - 746s)
  // PUT, DELETE, abort(), resumen
  // ============================================
  act4: {
    start: 15759,
    end: 22382,

    putUpdate: { start: 0, duration: 1635 },
    delete: { start: 1635, duration: 1853 },
    errorHandling: { start: 3488, duration: 1658 },
    conclusion: { start: 5146, duration: 1477 },
  },
};

// Configuracion de video
export const VIDEO_CONFIG = {
  fps: FPS,
  width: 1920,
  height: 1080,
  durationInFrames: 22382, // ~746s = ~12.4 minutos
};
