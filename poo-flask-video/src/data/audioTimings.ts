// Configuración de audio para cada segmento del video
// Los archivos de audio deben estar en public/audio/

export const AUDIO_TIMINGS = {
  act1: {
    hook: {
      file: 'act1_hook.mp3',
      startFrame: 0,
      duration: 450,        // 15s * 30fps
      volume: 1.0,
    },
    claseConcept: {
      file: 'act1_clase_concepto.mp3',
      startFrame: 450,
      duration: 900,        // 30s * 30fps
      volume: 1.0,
    },
    encapsulacion: {
      file: 'act1_encapsulacion.mp3',
      startFrame: 1350,
      duration: 600,        // 20s * 30fps
      volume: 1.0,
    },
    herencia: {
      file: 'act1_herencia.mp3',
      startFrame: 1950,
      duration: 600,        // 20s * 30fps
      volume: 1.0,
    },
    polimorfismo: {
      file: 'act1_polimorfismo.mp3',
      startFrame: 2550,
      duration: 600,        // 20s * 30fps
      volume: 1.0,
    },
    abstraccion: {
      file: 'act1_abstraccion.mp3',
      startFrame: 3150,
      duration: 450,        // 15s * 30fps
      volume: 1.0,
    },
  },

  act2: {
    presentacion: {
      file: 'act2_presentacion.mp3',
      startFrame: 3600,
      duration: 600,        // 20s * 30fps
      volume: 1.0,
    },
    claseUsuarios: {
      file: 'act2_clase_usuarios.mp3',
      startFrame: 4200,
      duration: 1200,       // 40s * 30fps
      volume: 1.0,
    },
    flaskSetup: {
      file: 'act2_flask_setup.mp3',
      startFrame: 5400,
      duration: 450,        // 15s * 30fps
      volume: 1.0,
    },
    getEndpoints: {
      file: 'act2_get_endpoints.mp3',
      startFrame: 5850,
      duration: 600,        // 20s * 30fps
      volume: 1.0,
    },
    postEndpoint: {
      file: 'act2_post_endpoint.mp3',
      startFrame: 6450,
      duration: 600,        // 20s * 30fps
      volume: 1.0,
    },
    putDelete: {
      file: 'act2_put_delete.mp3',
      startFrame: 7050,
      duration: 600,        // 20s * 30fps
      volume: 1.0,
    },
    demo: {
      file: 'act2_demo.mp3',
      startFrame: 7650,
      duration: 900,        // 30s * 30fps
      volume: 1.0,
    },
  },

  act3: {
    recap: {
      file: 'act3_recap.mp3',
      startFrame: 8550,
      duration: 300,        // 10s * 30fps
      volume: 1.0,
    },
    cta: {
      file: 'act3_cta.mp3',
      startFrame: 8850,
      duration: 150,        // 5s * 30fps
      volume: 1.0,
    },
  },
};

// Música de fondo opcional (si quieres añadir)
export const BACKGROUND_MUSIC = {
  enabled: false,          // Cambiar a true para activar
  file: 'background.mp3',  // Archivo en public/audio/
  volume: 0.15,            // Volumen bajo para no interferir con la voz
  startFrame: 0,
  endFrame: 9000,
};
