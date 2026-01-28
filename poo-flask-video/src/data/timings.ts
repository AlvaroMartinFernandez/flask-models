// Configuracion de timings del video (30 fps)
// 1 segundo = 30 frames
// Duraciones basadas en los audios generados + 0.5s de pausa
// Video total: ~11 minutos (655 segundos)

const FPS = 30;

export const TIMINGS = {
  // Acto 1: Fundamentos completos de POO (0-336s)
  act1: {
    start: 0,
    end: 10077,

    // Intro (0-25.53s)
    intro: {
      start: 0,
      duration: 766,
    },

    // Clases y Objetos - Ejemplo Perro (25.53-60.06s)
    clasesObjetos: {
      start: 766,
      duration: 1037,
    },

    // Constructor __init__ detallado (60.06-103.51s)
    initDetallado: {
      start: 1803,
      duration: 1304,
    },

    // Métodos mágicos __dict__, __str__, __repr__ (103.51-157.92s)
    metodosMagicos: {
      start: 3107,
      duration: 1633,
    },

    // Herencia básica - Animal -> Perro (157.92-195.94s)
    herenciaBasica: {
      start: 4740,
      duration: 1141,
    },

    // Herencia con super() - Vehiculo -> Coche (195.94-235.75s)
    herenciaSuper: {
      start: 5881,
      duration: 1195,
    },

    // Encapsulación - CuentaBancaria (235.75-273.76s)
    encapsulacion: {
      start: 7076,
      duration: 1141,
    },

    // Polimorfismo - Gato y Perro (273.76-316.06s)
    polimorfismo: {
      start: 8217,
      duration: 1269,
    },

    // Abstracción y ventajas (316.06-335.73s)
    abstraccion: {
      start: 9486,
      duration: 591,
    },

    // Transición (mismo que abstracción)
    transition: {
      start: 9486,
      duration: 591,
    },
  },

  // Acto 2: Clase Usuarios y CRUD (336-500s)
  act2: {
    start: 10077,
    end: 15012,

    // Presentación clase Usuarios (335.73-362.04s)
    classIntro: {
      start: 10077,
      duration: 790,
    },

    // Método __init__ de Usuarios (362.04-389.94s)
    initMethod: {
      start: 10867,
      duration: 838,
    },

    // Método get_all_members (389.94-412.91s)
    getAllMethod: {
      start: 11705,
      duration: 689,
    },

    // Método get_one_member (412.91-439.87s)
    getOneMethod: {
      start: 12394,
      duration: 809,
    },

    // Método add_member (439.87-464.93s)
    addMethod: {
      start: 13203,
      duration: 752,
    },

    // Métodos edit y delete (464.93-497.19s)
    editDeleteMethods: {
      start: 13955,
      duration: 968,
    },

    // Transición a Flask (497.19-500.15s)
    flaskDemo: {
      start: 14923,
      duration: 89,
    },
  },

  // Acto 3: Endpoints Flask y Conclusión (500-655s)
  act3: {
    start: 15012,
    end: 19671,

    // Demo Flask - Setup inicial (500.15-525.02s)
    flaskDemo: {
      start: 15012,
      duration: 747,
    },

    // GET endpoints (525.02-560.58s)
    getEndpoints: {
      start: 15759,
      duration: 1067,
    },

    // POST endpoint (560.58-594.77s)
    postEndpoint: {
      start: 16826,
      duration: 1026,
    },

    // PUT y DELETE (594.77-626.20s)
    putDeleteEndpoints: {
      start: 17852,
      duration: 943,
    },

    // Conclusión (626.20-655.38s)
    conclusion: {
      start: 18795,
      duration: 876,
    },
  },
};

// Configuración de video
export const VIDEO_CONFIG = {
  fps: FPS,
  width: 1920,
  height: 1080,
  durationInFrames: 19671, // ~11 minutos (655 segundos)
};
