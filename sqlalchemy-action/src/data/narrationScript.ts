// Script de narracion para el video de SQLAlchemy CRUD Actions
// startFrame son ABSOLUTOS (para sincronizar audio global)
// Los timings se actualizan con get-audio-durations.ts despues de generar audios

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
  // ACTO 1: Intro y Estructura
  // ============================================
  {
    id: 'intro',
    section: 'Introduccion',
    text: 'Bienvenidos a este video sobre endpoints CRUD con SQLAlchemy en Flask. Si estas aprendiendo a crear APIs, este es uno de los temas mas importantes. CRUD significa Create, Read, Update y Delete, que son las cuatro operaciones basicas para manejar datos. Create usa POST, Read usa GET, Update usa PUT, y Delete usa DELETE. Vamos a construir todos estos endpoints paso a paso usando un modelo de Usuario como ejemplo. Al final tendras 7 rutas funcionando que puedes usar como base para cualquier proyecto.',
    startFrame: 0,
    durationFrames: 1446,
    audioFile: 'intro.mp3',
  },
  {
    id: 'estructura',
    section: 'Estructura del Proyecto',
    text: 'Nuestro proyecto es muy simple. Todo va en dos archivos. El primero es models.py donde importamos Mapped, mapped_column y relationship de sqlalchemy.orm. Definimos el modelo User con la sintaxis moderna mapped: cada columna usa Mapped con su tipo y mapped_column. Por ejemplo id es Mapped int, email es Mapped str. Con Mapped str la columna ya es obligatoria sin necesidad de nullable False. Las relaciones tambien usan Mapped: profile es Mapped ProfileInfo uno a uno, y orders es Mapped lista de Order uno a muchos con cascade. El segundo archivo es app.py donde configuramos Flask, conectamos SQLAlchemy y escribimos todos los endpoints directamente con decoradores route.',
    startFrame: 1446,
    durationFrames: 1961,
    audioFile: 'estructura.mp3',
  },
  {
    id: 'setup',
    section: 'Configurar Flask y SQLAlchemy',
    text: 'Instalamos flask-sqlalchemy y flask-migrate. En models.py creamos db = SQLAlchemy(). En app.py configuramos la URL de la base de datos con os.environ.get, usando SQLite por defecto. Luego db.init_app(app) conecta todo. Y configuramos Flask Migrate para migraciones: flask db init, flask db migrate, y flask db upgrade.',
    startFrame: 3407,
    durationFrames: 1902,
    audioFile: 'setup.mp3',
  },

  // ============================================
  // ACTO 2: READ - Consultar Datos
  // ============================================
  {
    id: 'get-all',
    section: 'GET Todos los Usuarios',
    text: 'Empecemos con obtener todos los usuarios. Ruta GET /users. Llamamos User.query.all() que devuelve una lista con todos los registros. Los objetos de SQLAlchemy no son serializables directamente, asi que usamos una list comprehension para llamar serialize() en cada uno. Luego jsonify y status 200. SQLAlchemy tiene tres formas de consultar: query.all() trae todos, query.get() busca por ID, y query.filter_by() busca por cualquier campo.',
    startFrame: 5309,
    durationFrames: 1852,
    audioFile: 'get-all.mp3',
  },
  {
    id: 'get-by-id',
    section: 'GET Usuario por ID',
    text: 'Para obtener un usuario por ID, ruta GET /users/<id>. Usamos User.query.get(user_id) que busca por clave primaria. Si no existe devuelve None, y llamamos abort(404). Si existe, serialize() y jsonify con status 200. El metodo serialize convierte el objeto a diccionario con id, email, username e is_active. Nunca incluyas password en serialize.',
    startFrame: 7161,
    durationFrames: 2030,
    audioFile: 'get-by-id.mp3',
  },
  {
    id: 'filter-by',
    section: 'Filtrar con query.filter_by',
    text: 'query.filter_by te permite buscar por cualquier campo. filter_by(email=algo).first() devuelve el primer resultado o None. Con .all() obtienes una lista completa. Y .count() la cantidad. Donde mas lo usamos es para verificar duplicados: antes de crear un usuario, verificamos si ya existe otro con ese email o username. Si filter_by devuelve algo, abort(409) Conflict.',
    startFrame: 9191,
    durationFrames: 1515,
    audioFile: 'filter-by.mp3',
  },

  // ============================================
  // ACTO 3: CREATE - Crear Datos
  // ============================================
  {
    id: 'post-basico',
    section: 'POST Crear Usuario',
    text: 'Para crear usamos POST /users. Obtenemos el body con request.get_json(). Validamos campos obligatorios y verificamos duplicados con filter_by. Luego creamos User() con los datos, db.session.add() lo marca para guardar, y db.session.commit() lo escribe en la base de datos. Si algo falla, db.session.rollback() revierte todo. Devolvemos status 201 Created.',
    startFrame: 10706,
    durationFrames: 1811,
    audioFile: 'post-basico.mp3',
  },
  {
    id: 'validaciones',
    section: 'Validaciones y Duplicados',
    text: 'Las validaciones son fundamentales. Primero validar campos obligatorios: si el body esta vacio abort(400), si falta email, username o password abort(400) diciendo cual falta. Segundo verificar duplicados: filter_by(email) y filter_by(username), si ya existen abort(409) Conflict. Tres codigos clave: 400 Bad Request datos invalidos, 409 Conflict duplicado, 201 Created todo bien.',
    startFrame: 12517,
    durationFrames: 1676,
    audioFile: 'validaciones.mp3',
  },
  {
    id: 'post-relacion',
    section: 'POST con Relaciones',
    text: 'Caso avanzado: crear usuario con perfil en una peticion. El JSON incluye datos de usuario y un objeto profile. Creamos User y ProfileInfo por separado, luego asignamos new_user.profile = new_profile. Con un solo db.session.add y commit, SQLAlchemy guarda ambos registros y establece la clave foranea automaticamente. Todo en una sola transaccion.',
    startFrame: 14193,
    durationFrames: 1566,
    audioFile: 'post-relacion.mp3',
  },

  // ============================================
  // ACTO 4: UPDATE, DELETE y Cierre
  // ============================================
  {
    id: 'put-update',
    section: 'PUT Actualizar Usuario',
    text: 'Para actualizar: PUT /users/<id>. Buscamos el usuario, si no existe abort(404). Obtenemos el body y solo actualizamos campos que vienen. Si cambia email o username, verificamos duplicados con filter_by antes de actualizar. No necesitamos add porque el objeto ya esta en la sesion. Solo commit y SQLAlchemy detecta los cambios automaticamente. Status 200.',
    startFrame: 15759,
    durationFrames: 1635,
    audioFile: 'put-update.mp3',
  },
  {
    id: 'delete',
    section: 'DELETE Eliminar Usuario',
    text: 'Eliminar es simple: DELETE /users/<id>. Buscamos el usuario, si no existe abort(404). Llamamos db.session.delete(user) y commit. El cascade que definimos en el modelo borra automaticamente el perfil y las ordenes. Con una sola llamada a delete se eliminan tres cosas: usuario, perfil y ordenes. Todo seguro y consistente.',
    startFrame: 17394,
    durationFrames: 1853,
    audioFile: 'delete.mp3',
  },
  {
    id: 'error-handling',
    section: 'Manejo de Errores con abort',
    text: 'abort() detiene la ejecucion y devuelve el error HTTP. 400 Bad Request para datos invalidos. 404 Not Found cuando no existe el recurso. 409 Conflict para duplicados. 500 Server Error para errores internos. Cada abort incluye un mensaje descriptivo para el cliente.',
    startFrame: 19247,
    durationFrames: 1658,
    audioFile: 'error-handling.mp3',
  },
  {
    id: 'conclusion',
    section: 'Conclusion',
    text: 'Ya conoces CRUD completo con SQLAlchemy. GET para leer con query.all() y query.get(). POST para crear con session.add y commit. PUT para actualizar modificando campos y commit. DELETE para eliminar con session.delete y commit. Usa filter_by para buscar y abort para errores. 7 endpoints funcionales como base para cualquier API REST. Gracias por ver el video.',
    startFrame: 20905,
    durationFrames: 1477,
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

export const getFullScript = () => {
  return narrationScript.map((s) => `[${s.section}]\n${s.text}`).join('\n\n');
};
