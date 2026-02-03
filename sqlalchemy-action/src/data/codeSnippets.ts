// Snippets de codigo para el video de SQLAlchemy CRUD Actions
// Todo va en app.py y models.py (sin arquitectura MVC separada)

export const codeSnippets = {
  // ============================================
  // ACTO 1: Intro y Estructura
  // ============================================

  crudExplicacion: `# CRUD = las 4 operaciones basicas

# C - Create  -> POST   /users
# R - Read    -> GET    /users  o  /users/<id>
# U - Update  -> PUT    /users/<id>
# D - Delete  -> DELETE /users/<id>`,

  // Estructura models.py (sin serialize, se muestra en Act2)
  modelsPy: `# models.py
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True,
                      nullable=False)
    username = db.Column(db.String(80), unique=True,
                         nullable=False)
    password = db.Column(db.String(256), nullable=False)
    is_active = db.Column(db.Boolean, default=True)

    # Relaciones (1:1 y 1:N)
    profile = db.relationship("ProfileInfo",
                              uselist=False)
    orders = db.relationship("Order",
                             cascade="all, delete-orphan")`,

  // Estructura app.py
  appPy: `# app.py
from flask import Flask, request, jsonify, abort
from models import db, User

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db.init_app(app)

# Todos los endpoints van aqui
@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([u.serialize() for u in users]), 200`,

  // Instalacion y setup
  instalacion: `# Instalar dependencias
pip install flask-sqlalchemy
pip install flask-migrate`,

  appSetup: `# app.py - Configuracion basica
import os
from flask import Flask, request, jsonify, abort
from flask_migrate import Migrate
from models import db, User, ProfileInfo

app = Flask(__name__)

# Base de datos
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
    'DATABASE_URL', 'sqlite:///database.db'
)
db.init_app(app)
migrate = Migrate(app, db)

# Comandos de migracion:
# flask db init      -> Inicializar
# flask db migrate   -> Crear migracion
# flask db upgrade   -> Aplicar cambios`,

  // ============================================
  // ACTO 2: READ - Consultar Datos
  // ============================================

  getAllEndpoint: `# GET /users - Obtener todos los usuarios
@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([u.serialize() for u in users]), 200`,

  getByIdEndpoint: `# GET /users/<id> - Obtener uno por ID
@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if user is None:
        abort(404, description="Usuario no encontrado")
    return jsonify(user.serialize()), 200`,

  serializeMethod: `class User(db.Model):
    def serialize(self):
        return {
            'id': self.id,
            'email': self.email,
            'username': self.username,
            'is_active': self.is_active,
            # NUNCA incluir password!
        }`,

  queryMethods: `# Metodos de consulta SQLAlchemy

# Traer TODOS los registros
users = User.query.all()         # -> [User, User, ...]

# Buscar por PRIMARY KEY (id)
user = User.query.get(1)         # -> User o None

# Buscar por CUALQUIER campo
user = User.query.filter_by(
    email="ana@email.com"
).first()                         # -> User o None`,

  filterByBasico: `# query.filter_by() - Buscar por campo

# Buscar por email
user = User.query.filter_by(email="ana@email.com").first()

# Buscar por username
user = User.query.filter_by(username="ana123").first()

# Buscar todos los activos
users = User.query.filter_by(is_active=True).all()

# .first()  -> primer resultado o None
# .all()    -> lista completa
# .count()  -> cantidad de resultados`,

  filterByDuplicados: `# Verificar duplicados con filter_by

if User.query.filter_by(email=body["email"]).first():
    abort(409, description="Ya existe ese email")

if User.query.filter_by(username=body["username"]).first():
    abort(409, description="Ya existe ese username")`,

  // ============================================
  // ACTO 3: CREATE - Crear Datos
  // ============================================

  postEndpoint: `# POST /users - Crear un usuario
@app.route('/users', methods=['POST'])
def create_user():
    body = request.get_json()
    if not body:
        abort(400, description="Body vacio")

    # Validar campos obligatorios
    if not body.get("email") or not body.get("username"):
        abort(400, description="email y username son obligatorios")

    # Verificar duplicados
    if User.query.filter_by(email=body["email"]).first():
        abort(409, description="Email ya existe")

    new_user = User(
        email=body["email"],
        username=body["username"],
        password=body["password"],
        is_active=body.get("is_active", True)
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.serialize()), 201`,

  sessionWorkflow: `# Flujo de db.session

# 1. Crear el objeto Python
new_user = User(email="ana@email.com", username="ana")

# 2. Agregar a la sesion (todavia no se guarda)
db.session.add(new_user)

# 3. Confirmar -> se escribe en la BD
db.session.commit()

# Si algo falla:
db.session.rollback()  # Revertir todo`,

  validacionCampos: `# Validar campos obligatorios
body = request.get_json()

if not body:
    abort(400, description="Body vacio")

required = ["email", "username", "password"]
for field in required:
    if field not in body or not body[field]:
        abort(400, description=f"'{field}' es obligatorio")`,

  postWithProfileEndpoint: `# POST /users/with-profile - Crear con perfil
@app.route('/users/with-profile', methods=['POST'])
def create_user_with_profile():
    body = request.get_json()
    # ... validaciones ...

    new_user = User(
        email=body["email"],
        username=body["username"],
        password=body["password"]
    )

    profile_data = body.get("profile", {})
    new_profile = ProfileInfo(
        first_name=profile_data.get("first_name"),
        last_name=profile_data.get("last_name"),
        phone=profile_data.get("phone"),
    )

    # Asignar relacion 1:1
    new_user.profile = new_profile

    # Un solo add + commit guarda ambos
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.serialize_with_profile()), 201`,

  postWithProfileJson: `{
  "email": "ana@email.com",
  "username": "ana123",
  "password": "secret123",
  "profile": {
    "first_name": "Ana",
    "last_name": "Garcia",
    "phone": "+34 612345678"
  }
}`,

  // ============================================
  // ACTO 4: UPDATE, DELETE y Errores
  // ============================================

  putEndpoint: `# PUT /users/<id> - Actualizar usuario
@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get(user_id)
    if user is None:
        abort(404, description="Usuario no encontrado")

    body = request.get_json()

    # Solo actualizar campos que vienen en el body
    if "email" in body and body["email"] != user.email:
        if User.query.filter_by(email=body["email"]).first():
            abort(409, description="Email ya existe")
        user.email = body["email"]

    if "username" in body and body["username"] != user.username:
        if User.query.filter_by(username=body["username"]).first():
            abort(409, description="Username ya existe")
        user.username = body["username"]

    if "password" in body:
        user.password = body["password"]

    db.session.commit()
    return jsonify(user.serialize()), 200`,

  deleteEndpoint: `# DELETE /users/<id> - Eliminar usuario
@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if user is None:
        abort(404, description="Usuario no encontrado")

    db.session.delete(user)  # CASCADE borra perfil y ordenes
    db.session.commit()
    return jsonify({"message": "Usuario eliminado"}), 200`,

  abortExamples: `from flask import abort

# 400 - Bad Request (datos invalidos)
abort(400, description="El campo 'email' es obligatorio")

# 404 - Not Found (no existe)
abort(404, description="Usuario no encontrado")

# 409 - Conflict (duplicado)
abort(409, description="Ya existe ese email")

# 500 - Server Error (error interno)
abort(500, description="Error al crear usuario")`,

  resumenEndpoints: `# 7 Endpoints de Usuario
# GET    /users              -> Todos los usuarios
# GET    /users/<id>         -> Uno por ID
# POST   /users              -> Crear usuario
# PUT    /users/<id>         -> Actualizar
# DELETE /users/<id>         -> Eliminar
# POST   /users/with-profile -> Crear con perfil
# GET    /users/<id>/orders  -> Con ordenes`,
};
