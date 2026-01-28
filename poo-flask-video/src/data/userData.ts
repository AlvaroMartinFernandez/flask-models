// Datos de usuarios de ejemplo para las demos
// Basado en los datos reales del proyecto

export const sampleUsers = [
  { id: 1, name: 'Ana', email: 'ana@email.com' },
  { id: 2, name: 'Luis', email: 'luis@email.com' },
  { id: 3, name: 'Marta', email: 'marta@email.com' },
  { id: 4, name: 'Pedro', email: 'pedro@email.com' },
  { id: 5, name: 'Sofia', email: 'sofia@email.com' },
];

// Respuestas JSON para mostrar en el video
export const apiResponses = {
  getAll: {
    request: 'GET /users',
    response: sampleUsers,
    status: 200,
    description: 'Obtiene todos los usuarios',
  },
  getOne: {
    request: 'GET /users/1',
    response: { id: 1, name: 'Ana', email: 'ana@email.com' },
    status: 200,
    description: 'Obtiene un usuario por ID',
  },
  getOneNotFound: {
    request: 'GET /users/99',
    response: { error: 'Usuario no encontrado' },
    status: 404,
    description: 'Usuario no existe',
  },
  post: {
    request: 'POST /users',
    body: { name: 'Carlos', email: 'carlos@email.com' },
    response: { id: 6, name: 'Carlos', email: 'carlos@email.com' },
    status: 201,
    description: 'Crea un nuevo usuario',
  },
  put: {
    request: 'PUT /users/1',
    body: { name: 'Ana Garcia' },
    response: { id: 1, name: 'Ana Garcia', email: 'ana@email.com' },
    status: 200,
    description: 'Actualiza un usuario',
  },
  delete: {
    request: 'DELETE /users/5',
    response: { message: 'Usuario eliminado' },
    status: 200,
    description: 'Elimina un usuario',
  },
};

// Comandos de terminal para la demo en vivo
export const terminalCommands = [
  {
    method: 'GET' as const,
    url: '/users',
    response: sampleUsers,
    status: 200,
  },
  {
    method: 'GET' as const,
    url: '/users/1',
    response: { id: 1, name: 'Ana', email: 'ana@email.com' },
    status: 200,
  },
  {
    method: 'POST' as const,
    url: '/users',
    body: { name: 'Carlos', email: 'carlos@email.com' },
    response: { id: 6, name: 'Carlos', email: 'carlos@email.com' },
    status: 201,
  },
  {
    method: 'PUT' as const,
    url: '/users/6',
    body: { name: 'Carlos Garcia', email: 'carlos@email.com' },
    response: { id: 6, name: 'Carlos Garcia', email: 'carlos@email.com' },
    status: 200,
  },
  {
    method: 'DELETE' as const,
    url: '/users/6',
    response: { message: 'Usuario eliminado' },
    status: 200,
  },
];

// Conceptos de POO basados en tu poo.md
export const pooConcepts = {
  // Clases y Objetos
  clasesObjetos: {
    title: 'Clases y Objetos',
    subtitle: 'Los pilares de la POO',
    points: [
      'Clase: Es un plano o molde que define como seran los objetos',
      'Objeto: Es una instancia concreta de una clase',
      'Si la clase es el plano, el objeto es la casa construida',
    ],
  },

  // Herencia
  herencia: {
    title: 'Herencia',
    subtitle: 'Reutilizar codigo de otras clases',
    points: [
      'Permite crear nuevas clases basadas en otras existentes',
      'La clase hija hereda atributos y metodos del padre',
      'Puede agregar o modificar funcionalidades',
    ],
  },

  // Herencia con super()
  herenciaSuper: {
    title: 'Herencia con super()',
    subtitle: 'Llamar al constructor padre',
    points: [
      'super().__init__() llama al constructor de la clase padre',
      'Permite inicializar atributos heredados',
      'La clase hija puede agregar sus propios atributos',
    ],
  },

  // Encapsulacion
  encapsulacion: {
    title: 'Encapsulacion',
    subtitle: 'Ocultar detalles internos',
    points: [
      'Oculta los detalles internos de un objeto',
      'Expone solo lo necesario al exterior',
      '_atributo indica que es "protegido" (convencion)',
    ],
  },

  // Polimorfismo
  polimorfismo: {
    title: 'Polimorfismo',
    subtitle: 'Mismo metodo, diferente comportamiento',
    points: [
      'Diferentes clases pueden tener metodos con el mismo nombre',
      'Cada clase implementa el metodo a su manera',
      'Permite tratar objetos diferentes de forma uniforme',
    ],
  },

  // Abstraccion
  abstraccion: {
    title: 'Abstraccion',
    subtitle: 'Simplificar lo complejo',
    points: [
      'Identifica caracteristicas y comportamientos esenciales',
      'Ignora los detalles innecesarios',
      'Permite centrarse en lo importante',
    ],
  },

  // Ventajas
  ventajas: {
    title: 'Ventajas de POO',
    points: [
      'Reutilizacion de codigo',
      'Organizacion y mantenimiento',
      'Modularidad',
      'Facilidad para trabajar en equipo',
      'Escalabilidad',
    ],
  },
};

// Conceptos clave para mostrar (version simplificada)
export const keyConcepts = {
  whatIsClass: [
    'Una clase es un "molde" para crear objetos',
    'Define atributos (datos) y metodos (funciones)',
    'Los objetos son instancias de una clase',
  ],
  whyOOP: [
    'Organiza el codigo de forma logica',
    'Reutiliza codigo facilmente',
    'Facilita el mantenimiento',
    'Modela problemas del mundo real',
  ],
  crudOperations: [
    { letter: 'C', word: 'Create', method: 'POST', color: '#49cc90' },
    { letter: 'R', word: 'Read', method: 'GET', color: '#61affe' },
    { letter: 'U', word: 'Update', method: 'PUT', color: '#fca130' },
    { letter: 'D', word: 'Delete', method: 'DELETE', color: '#f93e3e' },
  ],
};
