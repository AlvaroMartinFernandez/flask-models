// Paleta de colores para el video educativo
export const colors = {
  // Fondo y texto base
  background: '#1e1e1e',        // VS Code dark
  text: '#d4d4d4',              // Gris claro
  textDark: '#808080',          // Gris oscuro para texto secundario

  // Código Python
  python: {
    keyword: '#569cd6',          // Azul (class, def, return)
    string: '#ce9178',           // Naranja
    function: '#dcdcaa',         // Amarillo claro
    variable: '#9cdcfe',         // Azul claro
    comment: '#6a9955',          // Verde oliva
    decorator: '#4ec9b0',        // Turquesa (@app.route)
    number: '#b5cea8',           // Verde claro
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
  primary: '#007acc',            // Azul Microsoft
  secondary: '#4ec9b0',          // Turquesa
  success: '#4caf50',            // Verde (200 status codes)
  warning: '#ff9800',            // Naranja
  error: '#f44336',              // Rojo (400/500 status codes)
  info: '#2196f3',               // Azul info

  // HTTP Methods
  http: {
    get: '#61affe',              // Azul
    post: '#49cc90',             // Verde
    put: '#fca130',              // Naranja
    delete: '#f93e3e',           // Rojo
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
  },
};
