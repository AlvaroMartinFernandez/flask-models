// Paleta de colores para el video educativo de SQLAlchemy Actions
export const colors = {
  // Fondo y texto base
  background: '#1e1e1e',
  text: '#d4d4d4',
  textDark: '#808080',

  // Codigo Python
  python: {
    keyword: '#569cd6',
    string: '#ce9178',
    function: '#dcdcaa',
    variable: '#9cdcfe',
    comment: '#6a9955',
    decorator: '#4ec9b0',
    number: '#b5cea8',
  },

  // JSON
  json: {
    key: '#9cdcfe',
    string: '#ce9178',
    number: '#b5cea8',
    boolean: '#569cd6',
    null: '#808080',
  },

  // UI Elements
  primary: '#007acc',
  secondary: '#4ec9b0',
  success: '#4caf50',
  warning: '#ff9800',
  error: '#f44336',
  info: '#2196f3',

  // SQLAlchemy especificos
  sqlalchemy: {
    model: '#569cd6',
    column: '#9cdcfe',
    relationship: '#4ec9b0',
    foreignKey: '#dcdcaa',
  },

  // CRUD Operations
  crud: {
    create: '#49cc90',
    read: '#61affe',
    update: '#fca130',
    delete: '#f93e3e',
  },

  // HTTP Methods
  http: {
    get: '#61affe',
    post: '#49cc90',
    put: '#fca130',
    delete: '#f93e3e',
  },

  // Status codes
  status: {
    success: '#49cc90',    // 200, 201
    clientError: '#fca130', // 400, 404, 409
    serverError: '#f93e3e', // 500
  },

  // Highlights y overlays
  highlight: 'rgba(255, 255, 0, 0.2)',
  highlightBorder: 'rgba(255, 255, 0, 0.6)',
  selection: 'rgba(58, 150, 221, 0.3)',
  overlay: 'rgba(0, 0, 0, 0.5)',

  // Gradients
  gradients: {
    primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    success: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    error: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    sqlalchemy: 'linear-gradient(135deg, #007acc 0%, #4ec9b0 100%)',
    crud: 'linear-gradient(135deg, #61affe 0%, #49cc90 50%, #fca130 75%, #f93e3e 100%)',
  },
};
