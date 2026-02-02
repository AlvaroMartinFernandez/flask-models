// Script de narracion para el video de SQLAlchemy Models
// Duraciones basadas en los audios ElevenLabs + 0.5s de pausa
// Total: ~1060s = ~17.7 minutos (31798 frames a 30fps)

export interface NarrationSegment {
  id: string;
  section: string;
  text: string;
  startFrame: number;
  durationFrames: number;
  audioFile?: string;
}

export const narrationScript: NarrationSegment[] = [
  // ============================================
  // ACTO 1: Fundamentos
  // ============================================
  {
    id: 'intro',
    section: 'Introduccion',
    text: 'Bienvenidos a este video sobre SQLAlchemy Models en Flask.',
    startFrame: 0,
    durationFrames: 1528,
    audioFile: 'intro.mp3',
  },
  {
    id: 'que-es-orm',
    section: 'Que es un ORM',
    text: 'Antes de tocar codigo, necesitas entender que es un ORM.',
    startFrame: 1528,
    durationFrames: 2101,
    audioFile: 'que-es-orm.mp3',
  },
  {
    id: 'que-es-sqlalchemy',
    section: 'Que es SQLAlchemy',
    text: 'Ahora que sabes que es un ORM, hablemos de SQLAlchemy.',
    startFrame: 3629,
    durationFrames: 1496,
    audioFile: 'que-es-sqlalchemy.mp3',
  },
  {
    id: 'inicializacion',
    section: 'Inicializar SQLAlchemy',
    text: 'Ahora vamos a configurar SQLAlchemy en nuestro proyecto Flask.',
    startFrame: 5125,
    durationFrames: 2219,
    audioFile: 'inicializacion.mp3',
  },

  // ============================================
  // ACTO 2: Modelos y Columnas
  // ============================================
  {
    id: 'sintaxis-moderna',
    section: 'Sintaxis Moderna',
    text: 'Ahora viene la parte mas importante. Vamos a crear nuestro primer modelo.',
    startFrame: 7344,
    durationFrames: 2286,
    audioFile: 'sintaxis-moderna.mp3',
  },
  {
    id: 'tipos-columnas',
    section: 'Tipos de Columnas',
    text: 'Veamos ahora los tipos de datos disponibles para tus columnas.',
    startFrame: 9630,
    durationFrames: 1885,
    audioFile: 'tipos-columnas.mp3',
  },
  {
    id: 'opciones-columnas',
    section: 'Opciones de Columnas',
    text: 'Ademas del tipo, cada columna puede tener opciones que definen sus restricciones.',
    startFrame: 11515,
    durationFrames: 2022,
    audioFile: 'opciones-columnas.mp3',
  },

  // ============================================
  // ACTO 3: Relaciones
  // ============================================
  {
    id: 'relacion-uno-a-uno',
    section: 'Relacion Uno a Uno',
    text: 'Ahora entramos en uno de los temas mas importantes. Las relaciones entre tablas.',
    startFrame: 13537,
    durationFrames: 2254,
    audioFile: 'relacion-uno-a-uno.mp3',
  },
  {
    id: 'relacion-uno-a-muchos',
    section: 'Relacion Uno a Muchos',
    text: 'La relacion uno a muchos es la mas comun en aplicaciones reales.',
    startFrame: 15791,
    durationFrames: 1977,
    audioFile: 'relacion-uno-a-muchos.mp3',
  },
  {
    id: 'relacion-muchos-db-table',
    section: 'Muchos a Muchos con db.Table',
    text: 'La relacion muchos a muchos es mas compleja, y tiene dos formas de implementarla.',
    startFrame: 17768,
    durationFrames: 2092,
    audioFile: 'relacion-muchos-db-table.mp3',
  },
  {
    id: 'relacion-muchos-clase',
    section: 'Muchos a Muchos con Clase',
    text: 'La segunda forma de hacer muchos a muchos es crear una clase modelo completa.',
    startFrame: 19860,
    durationFrames: 2052,
    audioFile: 'relacion-muchos-clase.mp3',
  },
  {
    id: 'on-delete',
    section: 'ON DELETE',
    text: 'Un tema importante es que pasa cuando eliminas un registro que tiene relaciones.',
    startFrame: 21912,
    durationFrames: 1642,
    audioFile: 'on-delete.mp3',
  },

  // ============================================
  // ACTO 4: Serializacion
  // ============================================
  {
    id: 'metodo-repr',
    section: 'Metodo __repr__',
    text: 'Ahora vamos a hablar sobre serializacion.',
    startFrame: 23554,
    durationFrames: 1794,
    audioFile: 'metodo-repr.mp3',
  },
  {
    id: 'metodo-serialize',
    section: 'Metodo serialize',
    text: 'El metodo serialize es fundamental si estas creando una API.',
    startFrame: 25348,
    durationFrames: 2012,
    audioFile: 'metodo-serialize.mp3',
  },
  {
    id: 'serializacion-relaciones',
    section: 'Serializacion con Relaciones',
    text: 'Una ventaja de crear tus propios metodos de serializacion es que puedes tener varios.',
    startFrame: 27360,
    durationFrames: 2187,
    audioFile: 'serializacion-relaciones.mp3',
  },
  {
    id: 'conclusion',
    section: 'Conclusion',
    text: 'Muy bien, hemos cubierto mucho terreno. Vamos a repasar los conceptos clave.',
    startFrame: 29547,
    durationFrames: 2251,
    audioFile: 'conclusion.mp3',
  },
];

// Calcular estadisticas del script
export const scriptStats = {
  totalSegments: narrationScript.length,
  totalCharacters: narrationScript.reduce((acc, s) => acc + s.text.length, 0),
  totalDurationSeconds: narrationScript.reduce((acc, s) => acc + s.durationFrames, 0) / 30,
  totalDurationMinutes: narrationScript.reduce((acc, s) => acc + s.durationFrames, 0) / 30 / 60,
};

// Helper para obtener el texto completo
export const getFullScript = () => {
  return narrationScript.map((s) => `[${s.section}]\n${s.text}`).join('\n\n');
};
