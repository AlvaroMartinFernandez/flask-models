# Arquitectura MVC con Blueprints en Flask

## Que es MVC?

MVC es un patron de arquitectura que separa tu codigo en tres capas:

- **Model** (Modelo): Define las tablas de la base de datos y sus relaciones
- **View/Controller** (Controlador): Recibe las peticiones HTTP y devuelve respuestas JSON
- **Service** (Servicio): Contiene la logica de negocio (validaciones, consultas, transacciones)

La idea es que cada capa tenga una responsabilidad clara. Si necesitas cambiar como validas un email, solo tocas el servicio. Si necesitas agregar un nuevo endpoint, solo tocas el controlador.

---

## Estructura de carpetas

```
src/
├── app.py                      # Punto de entrada - configura Flask
├── admin.py                    # Panel de administracion Flask-Admin
├── utils.py                    # Utilidades (APIException, sitemap)
│
├── models/                     # CAPA DE DATOS
│   ├── __init__.py            # Exporta db y todos los modelos
│   ├── user.py                # Modelo User
│   ├── profile_info.py        # Modelo ProfileInfo (1:1 con User)
│   ├── article.py             # Modelo Article
│   ├── order.py               # Modelo Order (1:N con User)
│   ├── order_item.py          # Modelo OrderItem (N:N con campos extra)
│   ├── tag.py                 # Modelo Tag
│   └── associations.py        # Tabla intermedia article_tags (N:N)
│
├── services/                   # CAPA DE LOGICA
│   ├── __init__.py            # Documentacion de servicios
│   ├── user_service.py        # Logica CRUD de usuarios
│   ├── article_service.py     # Logica CRUD de articulos
│   ├── order_service.py       # Logica CRUD de ordenes
│   └── tag_service.py         # Logica CRUD de tags
│
└── controllers/                # CAPA DE RUTAS
    ├── __init__.py            # Funcion register_controllers()
    ├── user_controller.py     # Endpoints de /users
    ├── article_controller.py  # Endpoints de /articles
    ├── order_controller.py    # Endpoints de /orders
    └── tag_controller.py      # Endpoints de /tags
```

---

## Flujo de una peticion

Cuando llega una peticion HTTP, sigue este camino:

```
Cliente (Postman, frontend, etc.)
    │
    ▼
CONTROLLER ──── Recibe la peticion HTTP
    │            Extrae datos del body/params
    │            Llama al servicio
    │            Devuelve JSON + status code
    ▼
SERVICE ─────── Valida los datos
    │            Verifica duplicados
    │            Hace las consultas a la BD
    │            Maneja commit/rollback
    │            Devuelve datos serializados
    ▼
MODEL ────────── Define la estructura de la tabla
    │             Define relaciones (1:1, 1:N, N:N)
    │             Convierte objetos a diccionarios (serialize)
    ▼
BASE DE DATOS ── SQLite (desarrollo) / PostgreSQL (produccion)
```

---

## 1. Models - La capa de datos

Los modelos definen como son las tablas en la base de datos. Cada modelo es una clase Python que hereda de `db.Model`.

### Ejemplo: User

```python
# src/models/user.py
from models import db
from sqlalchemy import String, Boolean, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime

class User(db.Model):
    __tablename__ = 'users'

    # Columnas
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    username: Mapped[str] = mapped_column(String(80), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(256), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(), default=datetime.utcnow)

    # Relaciones
    profile: Mapped["ProfileInfo"] = relationship(
        "ProfileInfo", back_populates="user",
        uselist=False,                    # 1:1 (un solo perfil)
        cascade="all, delete-orphan"      # Si borras el user, se borra el perfil
    )
    orders: Mapped[list["Order"]] = relationship(
        "Order", back_populates="user",
        cascade="all, delete-orphan"      # Si borras el user, se borran sus ordenes
    )

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "is_active": self.is_active,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }
        # NUNCA incluyas password en serialize

    def serialize_with_profile(self):
        data = self.serialize()
        data["profile"] = self.profile.serialize() if self.profile else None
        return data

    def serialize_with_orders(self):
        data = self.serialize()
        data["orders"] = [order.serialize() for order in self.orders]
        return data
```

### El archivo `models/__init__.py`

Este archivo es clave. Crea la instancia de `db` y exporta todos los modelos:

```python
# src/models/__init__.py
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Importar todos los modelos (el orden importa por dependencias)
from models.associations import article_tags
from models.tag import Tag
from models.user import User
from models.profile_info import ProfileInfo
from models.article import Article
from models.order import Order
from models.order_item import OrderItem
```

Gracias a esto, desde cualquier parte del proyecto puedes hacer:

```python
from models import db, User, Article, Order
```

---

## 2. Services - La capa de logica

Los servicios contienen toda la logica de negocio: validaciones, consultas, manejo de transacciones. Son clases con metodos estaticos.

### Ejemplo: UserService

```python
# src/services/user_service.py
from flask import abort
from models import db, User, ProfileInfo

class UserService:

    @staticmethod
    def get_all():
        users = User.query.all()
        return [user.serialize() for user in users]

    @staticmethod
    def get_by_id(user_id):
        user = User.query.get(user_id)
        if user is None:
            abort(404, description=f"Usuario con id {user_id} no encontrado")
        return user.serialize_with_profile()

    @staticmethod
    def create(data):
        # 1. Validar campos obligatorios
        required_fields = ["email", "username", "password"]
        for field in required_fields:
            if field not in data or not data[field]:
                abort(400, description=f"El campo '{field}' es obligatorio")

        # 2. Verificar duplicados
        if User.query.filter_by(email=data["email"]).first():
            abort(409, description="Ya existe un usuario con ese email")
        if User.query.filter_by(username=data["username"]).first():
            abort(409, description="Ya existe un usuario con ese username")

        # 3. Crear y guardar
        try:
            new_user = User(
                email=data["email"],
                username=data["username"],
                password=data["password"],
                is_active=data.get("is_active", True)
            )
            db.session.add(new_user)
            db.session.commit()
            return new_user.serialize()
        except Exception as error:
            db.session.rollback()
            abort(500, description=f"Error al crear usuario: {str(error)}")

    @staticmethod
    def update(user_id, data):
        user = User.query.get(user_id)
        if user is None:
            abort(404, description=f"Usuario con id {user_id} no encontrado")

        # Solo actualizar campos que vienen en el body
        if "email" in data and data["email"] != user.email:
            if User.query.filter_by(email=data["email"]).first():
                abort(409, description="Ya existe un usuario con ese email")
            user.email = data["email"]

        if "username" in data and data["username"] != user.username:
            if User.query.filter_by(username=data["username"]).first():
                abort(409, description="Ya existe un usuario con ese username")
            user.username = data["username"]

        if "password" in data:
            user.password = data["password"]

        try:
            db.session.commit()      # No necesitas add(), ya esta en la sesion
            return user.serialize()
        except Exception as error:
            db.session.rollback()
            abort(500, description=f"Error al actualizar: {str(error)}")

    @staticmethod
    def delete(user_id):
        user = User.query.get(user_id)
        if user is None:
            abort(404, description=f"Usuario con id {user_id} no encontrado")

        try:
            db.session.delete(user)  # cascade borra perfil y ordenes
            db.session.commit()
            return {"message": f"Usuario '{user.username}' eliminado"}
        except Exception as error:
            db.session.rollback()
            abort(500, description=f"Error al eliminar: {str(error)}")
```

### Por que el servicio usa `abort()` y no `return`?

- `abort(404)` detiene la ejecucion inmediatamente y Flask devuelve el error HTTP
- No necesitas hacer `return` ni `if/else` en el controlador
- El controlador queda limpio y solo se ocupa de la respuesta exitosa

---

## 3. Controllers - La capa de rutas

Los controladores definen los endpoints HTTP usando **Blueprints**. No tienen logica de negocio, solo reciben la peticion y llaman al servicio.

### Que es un Blueprint?

Un Blueprint es un modulo de rutas que puedes registrar en tu app Flask. Permite organizar endpoints por recurso (users, articles, orders) en archivos separados.

### Ejemplo: user_controller.py

```python
# src/controllers/user_controller.py
from flask import Blueprint, request, jsonify, abort

from services.user_service import UserService

user_bp = Blueprint('users', __name__)

@user_bp.route('/users', methods=['GET'])
def get_users():
    users = UserService.get_all()
    return jsonify(users), 200

@user_bp.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = UserService.get_by_id(user_id)
    return jsonify(user), 200

@user_bp.route('/users', methods=['POST'])
def create_user():
    body = request.get_json()
    if not body:
        abort(400, description="El body no puede estar vacio")
    user = UserService.create(body)
    return jsonify(user), 201

@user_bp.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    body = request.get_json()
    if not body:
        abort(400, description="El body no puede estar vacio")
    user = UserService.update(user_id, body)
    return jsonify(user), 200

@user_bp.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    result = UserService.delete(user_id)
    return jsonify(result), 200
```

### Registrar Blueprints

Todos los blueprints se registran en un solo lugar:

```python
# src/controllers/__init__.py
from controllers.user_controller import user_bp
from controllers.article_controller import article_bp
from controllers.order_controller import order_bp
from controllers.tag_controller import tag_bp

def register_controllers(app):
    app.register_blueprint(user_bp)
    app.register_blueprint(article_bp)
    app.register_blueprint(order_bp)
    app.register_blueprint(tag_bp)
```

Y en `app.py` solo se llama una vez:

```python
from controllers import register_controllers
register_controllers(app)
```

---

## 4. app.py - El punto de entrada

Este archivo configura toda la aplicacion:

```python
# src/app.py
import os
from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS

from models import db
from controllers import register_controllers
from admin import setup_admin

app = Flask(__name__)

# Configurar base de datos
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    # Produccion: PostgreSQL
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    # Desarrollo: SQLite
    db_path = os.path.join(os.path.dirname(__file__), '..', 'database.db')
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///" + os.path.abspath(db_path)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inicializar extensiones
db.init_app(app)           # Conectar SQLAlchemy
Migrate(app, db)           # Habilitar migraciones
CORS(app)                  # Permitir peticiones cross-origin

# Registrar blueprints y admin
register_controllers(app)
setup_admin(app)
```

---

## 5. Ejemplo completo: Crear un usuario

```
POST /users
Body: { "email": "ana@mail.com", "username": "ana", "password": "123" }
```

### Paso 1 - Controller recibe la peticion

```python
# user_controller.py
@user_bp.route('/users', methods=['POST'])
def create_user():
    body = request.get_json()          # Extraer JSON del body
    user = UserService.create(body)    # Delegar al servicio
    return jsonify(user), 201          # Devolver respuesta
```

### Paso 2 - Service valida y crea

```python
# user_service.py
@staticmethod
def create(data):
    # Validar que email, username y password esten presentes
    # Verificar que no exista otro user con ese email
    # Verificar que no exista otro user con ese username
    new_user = User(email=data["email"], username=data["username"], ...)
    db.session.add(new_user)    # Marcar para guardar
    db.session.commit()         # Escribir en la base de datos
    return new_user.serialize() # Devolver diccionario
```

### Paso 3 - Model convierte a JSON

```python
# user.py
def serialize(self):
    return {
        "id": self.id,
        "email": self.email,
        "username": self.username,
        "is_active": self.is_active,
    }
```

### Resultado

```json
HTTP 201 Created
{
    "id": 1,
    "email": "ana@mail.com",
    "username": "ana",
    "is_active": true
}
```

---

## 6. Codigos HTTP mas usados

| Codigo | Nombre | Cuando usarlo |
|--------|--------|--------------|
| 200 | OK | GET, PUT, DELETE exitoso |
| 201 | Created | POST exitoso (se creo el recurso) |
| 400 | Bad Request | Faltan campos o datos invalidos |
| 404 | Not Found | El recurso no existe (ID invalido) |
| 409 | Conflict | Duplicado (email o username ya existe) |
| 500 | Server Error | Error inesperado del servidor |

---

## 7. Migraciones de base de datos

Flask-Migrate maneja los cambios en la estructura de las tablas:

```bash
# Inicializar (solo una vez)
flask db init

# Crear migracion despues de cambiar un modelo
flask db migrate -m "agregar campo telefono a users"

# Aplicar los cambios a la base de datos
flask db upgrade
```

---

## 8. Resumen de responsabilidades

| Capa | Archivo | Responsabilidad |
|------|---------|-----------------|
| **Model** | `models/user.py` | Definir columnas, relaciones y serialize |
| **Service** | `services/user_service.py` | Validar, consultar BD, commit/rollback |
| **Controller** | `controllers/user_controller.py` | Recibir HTTP, llamar servicio, devolver JSON |
| **App** | `app.py` | Configurar Flask, DB, registrar blueprints |

### Reglas clave

1. **El controller nunca toca la base de datos** - Solo llama al servicio
2. **El service nunca construye respuestas HTTP** - Solo devuelve datos o lanza abort
3. **El model nunca tiene logica de negocio** - Solo define la estructura y serializa
4. **Cada recurso tiene su propio archivo** en controllers/, services/ y models/
5. **Los blueprints se registran en un solo lugar** - `controllers/__init__.py`

---

## 9. Agregar un nuevo recurso (paso a paso)

Si necesitas agregar un recurso nuevo, por ejemplo `Category`:

### 1. Crear el modelo

```python
# src/models/category.py
from models import db
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

class Category(db.Model):
    __tablename__ = 'categories'
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)

    def serialize(self):
        return {"id": self.id, "name": self.name}
```

### 2. Exportar en models/__init__.py

```python
from models.category import Category
```

### 3. Crear el servicio

```python
# src/services/category_service.py
from flask import abort
from models import db, Category

class CategoryService:
    @staticmethod
    def get_all():
        return [c.serialize() for c in Category.query.all()]

    @staticmethod
    def create(data):
        if not data.get("name"):
            abort(400, description="El campo 'name' es obligatorio")
        if Category.query.filter_by(name=data["name"]).first():
            abort(409, description="Ya existe esa categoria")
        category = Category(name=data["name"])
        db.session.add(category)
        db.session.commit()
        return category.serialize()
```

### 4. Crear el controlador

```python
# src/controllers/category_controller.py
from flask import Blueprint, request, jsonify
from services.category_service import CategoryService

category_bp = Blueprint('categories', __name__)

@category_bp.route('/categories', methods=['GET'])
def get_categories():
    return jsonify(CategoryService.get_all()), 200

@category_bp.route('/categories', methods=['POST'])
def create_category():
    body = request.get_json()
    result = CategoryService.create(body)
    return jsonify(result), 201
```

### 5. Registrar el blueprint

```python
# src/controllers/__init__.py
from controllers.category_controller import category_bp

def register_controllers(app):
    # ... blueprints existentes ...
    app.register_blueprint(category_bp)
```

### 6. Crear la migracion

```bash
flask db migrate -m "agregar tabla categories"
flask db upgrade
```
