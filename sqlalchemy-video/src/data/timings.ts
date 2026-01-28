// Configuracion de timings del video SQLAlchemy (30 fps)
// 1 segundo = 30 frames
// Video total: ~8 minutos (480 segundos = 14400 frames)
// Cubre secciones 1-6 del documento SQL-Alchemy-models.md

const FPS = 30;

export const TIMINGS = {
  // ============================================
  // ACTO 1: Fundamentos (0-120s)
  // ORM, SQLAlchemy, Inicializacion
  // ============================================
  act1: {
    start: 0,
    end: 3600, // 120s

    // Intro y titulo (0-15s)
    intro: {
      start: 0,
      duration: 450, // 15s
    },

    // Que es un ORM (15-45s)
    queEsOrm: {
      start: 450,
      duration: 900, // 30s
    },

    // Que es SQLAlchemy (45-70s)
    queEsSqlalchemy: {
      start: 1350,
      duration: 750, // 25s
    },

    // Inicializar SQLAlchemy (70-120s)
    inicializacion: {
      start: 2100,
      duration: 1500, // 50s
    },
  },

  // ============================================
  // ACTO 2: Modelos y Columnas (120-200s)
  // Crear modelos, tipos de columnas, opciones
  // ============================================
  act2: {
    start: 3600,
    end: 6000, // 200s

    // Sintaxis moderna (120-150s)
    sintaxisModerna: {
      start: 3600,
      duration: 900, // 30s
    },

    // Tipos de columnas (150-175s)
    tiposColumnas: {
      start: 4500,
      duration: 750, // 25s
    },

    // Opciones de columnas (175-200s)
    opcionesColumnas: {
      start: 5250,
      duration: 750, // 25s
    },
  },

  // ============================================
  // ACTO 3: Relaciones (200-360s)
  // 1:1, 1:N, N:N, ON DELETE
  // ============================================
  act3: {
    start: 6000,
    end: 10800, // 360s

    // Relacion 1 a 1 (200-235s)
    relacionUnoAUno: {
      start: 6000,
      duration: 1050, // 35s
    },

    // Relacion 1 a Muchos (235-275s)
    relacionUnoAMuchos: {
      start: 7050,
      duration: 1200, // 40s
    },

    // Relacion Muchos a Muchos - db.Table (275-310s)
    relacionMuchosDbTable: {
      start: 8250,
      duration: 1050, // 35s
    },

    // Relacion Muchos a Muchos - Clase (310-340s)
    relacionMuchosClase: {
      start: 9300,
      duration: 900, // 30s
    },

    // ON DELETE comportamientos (340-360s)
    onDelete: {
      start: 10200,
      duration: 600, // 20s
    },
  },

  // ============================================
  // ACTO 4: Serializacion (360-480s)
  // __repr__, serialize, serializacion con relaciones
  // ============================================
  act4: {
    start: 10800,
    end: 14400, // 480s

    // Metodo __repr__ (360-385s)
    metodoRepr: {
      start: 10800,
      duration: 750, // 25s
    },

    // Metodo serialize (385-420s)
    metodoSerialize: {
      start: 11550,
      duration: 1050, // 35s
    },

    // Serializacion con relaciones (420-455s)
    serializacionRelaciones: {
      start: 12600,
      duration: 1050, // 35s
    },

    // Conclusion y resumen (455-480s)
    conclusion: {
      start: 13650,
      duration: 750, // 25s
    },
  },
};

// Configuracion de video
export const VIDEO_CONFIG = {
  fps: FPS,
  width: 1920,
  height: 1080,
  durationInFrames: 14400, // 8 minutos (480 segundos)
};
