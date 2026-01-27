# SQLAlchemy Models - Guía Completa

## Tabla de Contenidos

1. [¿Qué es un ORM?](#1-qué-es-un-orm)
2. [¿Qué es SQLAlchemy?](#2-qué-es-sqlalchemy)
3. [Inicializar SQLAlchemy en Flask](#3-inicializar-sqlalchemy-en-flask)
4. [Crear Modelos con SQLAlchemy](#4-crear-modelos-con-sqlalchemy)
5. [Relaciones en SQLAlchemy](#5-relaciones-en-sqlalchemy)
6. [Serialización y Métodos Especiales](#6-serialización-y-métodos-especiales)
7. [Migraciones de Base de Datos](#7-migraciones-de-base-de-datos)
8. [Flask-Admin](#8-flask-admin)

---

## 1. ¿Qué es un ORM?

### Definición

**ORM** significa **Object-Relational Mapping** (Mapeo Objeto-Relacional). Es una técnica de programación que permite convertir datos entre sistemas incompatibles usando programación orientada a objetos.

### ¿Qué problema resuelve?

Sin ORM, tendrías que escribir SQL directamente:

```python
# SIN ORM - SQL directo (tedioso y propenso a errores)
cursor.execute("INSERT INTO users (email, password) VALUES ('juan@email.com', '1234')")
cursor.execute("SELECT * FROM users WHERE id = 1")
row = cursor.fetchone()
```

Con ORM, trabajas con objetos de Python:

```python
# CON ORM - Objetos Python (más intuitivo y seguro)
user = User(email="juan@email.com", password="1234")
db.session.add(user)
db.session.commit()

user = User.query.get(1)
```

### Ventajas del ORM

| Ventaja           | Descripción                                                       |
| ----------------- | ----------------------------------------------------------------- |
| **Abstracción**   | No necesitas escribir SQL directamente                            |
| **Portabilidad**  | Cambiar de base de datos es más fácil (MySQL, PostgreSQL, SQLite) |
| **Seguridad**     | Previene inyección SQL automáticamente                            |
| **Productividad** | Código más limpio y mantenible                                    |
| **Validación**    | Tipos de datos validados automáticamente                          |

### Analogía Simple

Piensa en el ORM como un **traductor**:

- Tú hablas "Python" (objetos, clases)
- La base de datos habla "SQL" (tablas, filas)
- El ORM traduce entre ambos idiomas

---

## 2. ¿Qué es SQLAlchemy?

### Definición

**SQLAlchemy** es el ORM más popular y poderoso para Python. Es una biblioteca que facilita la comunicación entre Python y bases de datos relacionales.

### Información Oficial

- **Web Oficial**: [https://www.sqlalchemy.org/](https://www.sqlalchemy.org/)
- **Documentación**: [https://docs.sqlalchemy.org/](https://docs.sqlalchemy.org/)
- **GitHub**: [https://github.com/sqlalchemy/sqlalchemy](https://github.com/sqlalchemy/sqlalchemy)

### Flask-SQLAlchemy

Para usar SQLAlchemy con Flask, usamos **Flask-SQLAlchemy**, una extensión que simplifica la integración.

- **Documentación Flask-SQLAlchemy**: [https://flask-sqlalchemy.palletsprojects.com/](https://flask-sqlalchemy.palletsprojects.com/)

### Instalación

```bash
pip install flask-sqlalchemy
```

### Características Principales

- Soporte para múltiples bases de datos (PostgreSQL, MySQL, SQLite, Oracle, etc.)
- Sistema de migraciones con Alembic
- Consultas expresivas y potentes
- Manejo automático de conexiones
- Transacciones y rollbacks

---

## 3. Inicializar SQLAlchemy en Flask

### Paso 1: Crear la instancia de SQLAlchemy

```python
# models.py
from flask_sqlalchemy import SQLAlchemy

# Crear la instancia de SQLAlchemy
# Esta línea crea el objeto que manejará toda la comunicación con la BD
db = SQLAlchemy()
```

### Paso 2: Configurar la aplicación Flask

```python
# app.py
import os
from flask import Flask
from flask_migrate import Migrate
from models import db

# Crear la aplicación Flask
app = Flask(__name__)

# Configurar la URL de la base de datos
# Puede venir de una variable de entorno o usar SQLite por defecto
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    # Para Heroku/Render que usan "postgres://" en lugar de "postgresql://"
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    # Base de datos SQLite local para desarrollo
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

# Desactivar el seguimiento de modificaciones (consume memoria innecesaria)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inicializar SQLAlchemy con la app
db.init_app(app)

# Configurar migraciones
MIGRATE = Migrate(app, db)
```

### Estructura de Archivos Típica

```
proyecto/
├── src/
│   ├── app.py          # Configuración de Flask
│   ├── models.py       # Definición de modelos
│   ├── admin.py        # Configuración de Flask-Admin
│   └── utils.py        # Utilidades
├── migrations/         # Carpeta de migraciones (se crea automáticamente)
└── requirements.txt
```

---

## 4. Crear Modelos con SQLAlchemy

### Sintaxis Moderna (SQLAlchemy 2.0+)

La forma moderna usa **type hints** con `Mapped` y `mapped_column`:

```python
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Integer, Float, Text, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    # Nombre de la tabla (opcional, por defecto usa el nombre de la clase en minúsculas)
    __tablename__ = 'users'

    # COLUMNAS
    # --------

    # Clave primaria - se genera automáticamente
    id: Mapped[int] = mapped_column(primary_key=True)

    # String con límite de caracteres, único y obligatorio
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)

    # String sin restricción de unicidad
    username: Mapped[str] = mapped_column(String(80), nullable=False)

    # Contraseña (siempre hashear en producción)
    password: Mapped[str] = mapped_column(String(256), nullable=False)

    # Booleano con valor por defecto
    is_active: Mapped[bool] = mapped_column(Boolean(), default=True, nullable=False)

    # Fecha con valor por defecto automático
    created_at: Mapped[datetime] = mapped_column(DateTime(), default=datetime.utcnow)
```

### Tipos de Columnas Comunes

| Tipo SQLAlchemy | Tipo Python | Uso                              |
| --------------- | ----------- | -------------------------------- |
| `Integer()`     | `int`       | Números enteros                  |
| `String(n)`     | `str`       | Texto con límite de n caracteres |
| `Text()`        | `str`       | Texto largo sin límite           |
| `Float()`       | `float`     | Números decimales                |
| `Boolean()`     | `bool`      | Verdadero/Falso                  |
| `DateTime()`    | `datetime`  | Fecha y hora                     |
| `Date()`        | `date`      | Solo fecha                       |
| `Time()`        | `time`      | Solo hora                        |

### Opciones de Columnas

| Opción             | Descripción       | Ejemplo                           |
| ------------------ | ----------------- | --------------------------------- |
| `primary_key=True` | Clave primaria    | `mapped_column(primary_key=True)` |
| `unique=True`      | Valor único       | `mapped_column(unique=True)`      |
| `nullable=False`   | No puede ser NULL | `mapped_column(nullable=False)`   |
| `default=valor`    | Valor por defecto | `mapped_column(default=True)`     |
| `index=True`       | Crear índice      | `mapped_column(index=True)`       |

---

## 5. Relaciones en SQLAlchemy

### 5.1 Relación Uno a Uno (1:1)

Un usuario tiene UN solo perfil, y un perfil pertenece a UN solo usuario.

```python
class User(db.Model):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)

    # Relación 1 a 1 con ProfileInfo
    # uselist=False indica que es UN objeto, no una lista
    profile: Mapped["ProfileInfo"] = relationship(
        "ProfileInfo",
        back_populates="user",
        uselist=False,                    # <-- Clave para 1 a 1
        cascade="all, delete-orphan"
    )


class ProfileInfo(db.Model):
    __tablename__ = 'profile_info'

    id: Mapped[int] = mapped_column(primary_key=True)

    # Clave foránea hacia User
    # unique=True asegura que solo haya UN perfil por usuario
    user_id: Mapped[int] = mapped_column(
        ForeignKey('users.id'),
        unique=True,                      # <-- Clave para 1 a 1
        nullable=False
    )

    first_name: Mapped[str] = mapped_column(String(100), nullable=True)
    last_name: Mapped[str] = mapped_column(String(100), nullable=True)

    # Relación inversa
    user: Mapped["User"] = relationship("User", back_populates="profile")
```

**Uso:**

```python
# Crear usuario con perfil
user = User(email="juan@email.com", password="1234")
user.profile = ProfileInfo(first_name="Juan", last_name="Pérez")
db.session.add(user)
db.session.commit()

# Acceder al perfil desde el usuario
print(user.profile.first_name)  # "Juan"
print(user.email)  # "juan@email.com"

# Acceder al usuario desde el perfil
print(user.profile.user.email)  # "juan@email.com"
```

---

### 5.2 Relación Uno a Muchos (1:N)

Un usuario puede tener MUCHAS órdenes, pero cada orden pertenece a UN solo usuario.

```python
class User(db.Model):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)

    # Relación 1 a Muchos con Order
    # Por defecto es una lista (uselist=True)
    orders: Mapped[list["Order"]] = relationship(
        "Order",
        back_populates="user",
        cascade="all, delete-orphan"
    )


class Order(db.Model):
    __tablename__ = 'orders'

    id: Mapped[int] = mapped_column(primary_key=True)

    # Clave foránea hacia User (NO es unique, permite múltiples órdenes por usuario)
    user_id: Mapped[int] = mapped_column(
        ForeignKey('users.id'),
        nullable=False
    )

    total: Mapped[float] = mapped_column(Float(), default=0.0)
    status: Mapped[str] = mapped_column(String(20), default='pending')

    # Relación inversa - acceder al usuario desde la orden
    user: Mapped["User"] = relationship("User", back_populates="orders")
```

**Uso:**

```python
# Crear usuario con órdenes
user = User(email="juan@email.com", password="1234")
order1 = Order(total=100.00, status="paid")
order2 = Order(total=50.00, status="pending")

user.orders.append(order1)
user.orders.append(order2)
db.session.add(user)
db.session.commit()

# Acceder a las órdenes del usuario
for order in user.orders:
    print(f"Orden {order.id}: ${order.total}")

# Acceder al usuario desde una orden
print(order1.user.email)  # "juan@email.com"
```

---

### 5.3 Relación Muchos a Muchos (N:N)

Hay **dos formas** de crear relaciones muchos a muchos:

#### Forma 1: Con tabla de asociación simple (db.Table)

Usa esta forma cuando **SOLO** necesitas conectar dos tablas, sin campos adicionales.

```python
from sqlalchemy import Table, Column, Integer, ForeignKey

# Tabla de asociación (NO es una clase, es una tabla simple)
article_tags = Table(
    'article_tags',
    db.metadata,
    Column('article_id', Integer, ForeignKey('articles.id'), primary_key=True),
    Column('tag_id', Integer, ForeignKey('tags.id'), primary_key=True)
)


class Article(db.Model):
    __tablename__ = 'articles'

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(200), nullable=False)

    # Relación N:N usando secondary
    tags: Mapped[list["Tag"]] = relationship(
        "Tag",
        secondary=article_tags,      # <-- Usa la tabla de asociación
        back_populates="articles"
    )


class Tag(db.Model):
    __tablename__ = 'tags'

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)

    # Relación inversa
    articles: Mapped[list["Article"]] = relationship(
        "Article",
        secondary=article_tags,
        back_populates="tags"
    )
```

**Uso:**

```python
# Crear artículo con etiquetas
article = Article(name="Laptop Gaming")
tag1 = Tag(name="Electrónica")
tag2 = Tag(name="Oferta")

article.tags.append(tag1)
article.tags.append(tag2)
db.session.add(article)
db.session.commit()

# Ver etiquetas de un artículo
for tag in article.tags:
    print(tag.name)

# Ver artículos con una etiqueta
for article in tag1.articles:
    print(article.name)
```

---

#### Forma 2: Con clase modelo (cuando necesitas campos extra)

Usa esta forma cuando necesitas **campos adicionales** en la relación (cantidad, precio, fecha, etc.)

```python
class Order(db.Model):
    __tablename__ = 'orders'

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id'), nullable=False)
    total: Mapped[float] = mapped_column(Float(), default=0.0)

    # Relación con la tabla intermedia
    items: Mapped[list["OrderItem"]] = relationship(
        "OrderItem",
        back_populates="order",
        cascade="all, delete-orphan"
    )


class Article(db.Model):
    __tablename__ = 'articles'

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    price: Mapped[float] = mapped_column(Float(), nullable=False)

    order_items: Mapped[list["OrderItem"]] = relationship(
        "OrderItem",
        back_populates="article"
    )


# Tabla intermedia como CLASE (permite campos adicionales)
class OrderItem(db.Model):
    __tablename__ = 'order_items'

    id: Mapped[int] = mapped_column(primary_key=True)

    # Claves foráneas
    order_id: Mapped[int] = mapped_column(ForeignKey('orders.id'), nullable=False)
    article_id: Mapped[int] = mapped_column(ForeignKey('articles.id'), nullable=False)

    # CAMPOS ADICIONALES - Esta es la ventaja de usar una clase
    quantity: Mapped[int] = mapped_column(Integer(), default=1)
    unit_price: Mapped[float] = mapped_column(Float(), nullable=False)
    subtotal: Mapped[float] = mapped_column(Float(), default=0.0)

    # Relaciones
    order: Mapped["Order"] = relationship("Order", back_populates="items")
    article: Mapped["Article"] = relationship("Article", back_populates="order_items")
```

**Uso:**

```python
# Crear orden con items
order = Order(user_id=1)
article = Article.query.get(1)  # Laptop a $999

item = OrderItem(
    article=article,
    quantity=2,
    unit_price=article.price,
    subtotal=2 * article.price
)
order.items.append(item)
db.session.add(order)
db.session.commit()
```

---

### Comparación de las dos formas

| Característica   | `db.Table`           | Clase Modelo       |
| ---------------- | -------------------- | ------------------ |
| **Campos extra** | No                   | Sí                 |
| **Complejidad**  | Simple               | Mayor              |
| **Uso**          | Solo conectar tablas | Datos adicionales  |
| **Ejemplo**      | Tags, Categorías     | Carrito de compras |

---

### 5.4 Tipos de ON DELETE (Comportamiento al Eliminar)

Cuando tienes relaciones entre tablas, debes definir **qué sucede con los registros relacionados cuando eliminas el registro padre**. Esto se controla con `ondelete` en la `ForeignKey`.

#### Tipos Disponibles

| Tipo          | Descripción                                 | Cuándo Usar                                     |
| ------------- | ------------------------------------------- | ----------------------------------------------- |
| `CASCADE`     | Elimina automáticamente los registros hijos | Cuando los hijos no tienen sentido sin el padre |
| `SET NULL`    | Pone `NULL` en la clave foránea             | Cuando los hijos pueden existir sin padre       |
| `SET DEFAULT` | Pone el valor por defecto en la FK          | Cuando hay un valor por defecto definido        |
| `RESTRICT`    | **Impide** eliminar si hay registros hijos  | Cuando quieres proteger los datos               |
| `NO ACTION`   | Similar a RESTRICT (depende de la BD)       | Comportamiento por defecto                      |

---

#### CASCADE - Eliminación en Cascada

**Elimina automáticamente** todos los registros relacionados cuando se elimina el padre.

```python
class User(db.Model):
    __tablename__ = 'users'
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True)

    # cascade="all, delete-orphan" en el relationship
    orders: Mapped[list["Order"]] = relationship(
        "Order",
        back_populates="user",
        cascade="all, delete-orphan"  # <-- Maneja la eliminación desde Python
    )


class Order(db.Model):
    __tablename__ = 'orders'
    id: Mapped[int] = mapped_column(primary_key=True)

    # ondelete="CASCADE" en la ForeignKey
    user_id: Mapped[int] = mapped_column(
        ForeignKey('users.id', ondelete="CASCADE"),  # <-- Maneja la eliminación desde la BD
        nullable=False
    )

    user: Mapped["User"] = relationship("User", back_populates="orders")
```

**Ejemplo de uso:**

```python
# Si eliminas el usuario, TODAS sus órdenes se eliminan automáticamente
user = User.query.get(1)
db.session.delete(user)
db.session.commit()
# Las órdenes del usuario también fueron eliminadas
```

**¿Cuándo usar CASCADE?**

- Perfil de usuario (si se borra el usuario, el perfil no tiene sentido)
- Comentarios de un post (si se borra el post, los comentarios tampoco)
- Items de una orden (si se borra la orden, los items no sirven)

---

#### SET NULL - Poner NULL

Cuando se elimina el padre, la clave foránea se pone en `NULL`.

```python
class Article(db.Model):
    __tablename__ = 'articles'
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(200), nullable=False)

    # La categoría puede ser NULL (artículo sin categoría)
    category_id: Mapped[int] = mapped_column(
        ForeignKey('categories.id', ondelete="SET NULL"),
        nullable=True  # <-- IMPORTANTE: debe ser nullable=True
    )


class Category(db.Model):
    __tablename__ = 'categories'
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
```

**Ejemplo de uso:**

```python
# Si eliminas la categoría "Electrónica", los artículos quedan con category_id = NULL
category = Category.query.filter_by(name="Electrónica").first()
db.session.delete(category)
db.session.commit()
# Los artículos que tenían esa categoría ahora tienen category_id = NULL
```

**¿Cuándo usar SET NULL?**

- Artículos con categoría opcional
- Posts con autor que puede ser eliminado
- Cualquier relación donde el hijo puede existir independientemente

---

#### RESTRICT - Impedir Eliminación

**Impide eliminar** el padre si tiene registros hijos relacionados.

```python
class Department(db.Model):
    __tablename__ = 'departments'
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)

    employees: Mapped[list["Employee"]] = relationship("Employee", back_populates="department")


class Employee(db.Model):
    __tablename__ = 'employees'
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)

    department_id: Mapped[int] = mapped_column(
        ForeignKey('departments.id', ondelete="RESTRICT"),  # <-- Impide borrar
        nullable=False
    )

    department: Mapped["Department"] = relationship("Department", back_populates="employees")
```

**Ejemplo de uso:**

```python
# Si intentas eliminar un departamento que tiene empleados, dará ERROR
department = Department.query.get(1)
db.session.delete(department)
db.session.commit()  # ERROR: No puedes eliminar, hay empleados asociados
```

**¿Cuándo usar RESTRICT?**

- Departamentos con empleados (no puedes borrar un departamento que tiene gente)
- Categorías que deben estar vacías antes de eliminar
- Proteger datos importantes de eliminación accidental

---

#### SET DEFAULT - Poner Valor por Defecto

Pone un valor por defecto cuando se elimina el padre.

```python
class Article(db.Model):
    __tablename__ = 'articles'
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(200), nullable=False)

    # Si se elimina el autor, se asigna el autor con id=1 (ej: "Admin" o "Anónimo")
    author_id: Mapped[int] = mapped_column(
        ForeignKey('authors.id', ondelete="SET DEFAULT"),
        default=1,  # <-- ID del autor por defecto
        nullable=False
    )
```

**Nota:** SET DEFAULT no está soportado en todas las bases de datos (ej: MySQL con InnoDB no lo soporta completamente).

---

### Diferencia entre `cascade` y `ondelete`

Es importante entender que hay **DOS lugares** donde puedes configurar el comportamiento de eliminación:

| Ubicación        | Sintaxis                       | Nivel         | Cuándo se ejecuta                     |
| ---------------- | ------------------------------ | ------------- | ------------------------------------- |
| `relationship()` | `cascade="all, delete-orphan"` | Python/ORM    | Cuando usas `db.session.delete()`     |
| `ForeignKey()`   | `ondelete="CASCADE"`           | Base de datos | Cuando eliminas directamente en la BD |

**Recomendación:** Usa **AMBOS** para asegurar consistencia:

```python
class User(db.Model):
    __tablename__ = 'users'
    id: Mapped[int] = mapped_column(primary_key=True)

    # Nivel ORM (Python)
    orders: Mapped[list["Order"]] = relationship(
        "Order",
        back_populates="user",
        cascade="all, delete-orphan"  # <-- Para db.session.delete()
    )


class Order(db.Model):
    __tablename__ = 'orders'
    id: Mapped[int] = mapped_column(primary_key=True)

    # Nivel Base de Datos
    user_id: Mapped[int] = mapped_column(
        ForeignKey('users.id', ondelete="CASCADE"),  # <-- Para DELETE directo en BD
        nullable=False
    )

    user: Mapped["User"] = relationship("User", back_populates="orders")
```

---

### Opciones de `cascade` en relationship()

El parámetro `cascade` en `relationship()` acepta varias opciones:

| Opción               | Descripción                                                            |
| -------------------- | ---------------------------------------------------------------------- |
| `save-update`        | Al agregar/actualizar el padre, también guarda los hijos (por defecto) |
| `merge`              | Al hacer merge del padre, también hace merge de los hijos              |
| `delete`             | Al eliminar el padre, elimina los hijos                                |
| `delete-orphan`      | Elimina hijos que ya no tienen padre (huérfanos)                       |
| `all`                | Incluye: save-update, merge, refresh-expire, expunge, delete           |
| `all, delete-orphan` | Todo lo anterior + eliminar huérfanos (más común)                      |

**Ejemplo más común:**

```python
# La combinación más usada para relaciones padre-hijo
orders: Mapped[list["Order"]] = relationship(
    "Order",
    back_populates="user",
    cascade="all, delete-orphan"
)
```

---

### Resumen Visual de ON DELETE

```
┌─────────────────────────────────────────────────────────────────────┐
│                    ELIMINAR REGISTRO PADRE                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   CASCADE      →  Elimina todos los hijos automáticamente          │
│                   User → Orders (se borran las órdenes)            │
│                                                                     │
│   SET NULL     →  Pone NULL en la FK de los hijos                  │
│                   Category → Articles (quedan sin categoría)       │
│                                                                     │
│   RESTRICT     →  ERROR si hay hijos (no permite eliminar)         │
│                   Department → Employees (protege el departamento) │
│                                                                     │
│   SET DEFAULT  →  Pone valor por defecto en la FK                  │
│                   Author → Articles (asigna autor "Anónimo")       │
│                                                                     │
│   NO ACTION    →  Igual que RESTRICT (comportamiento por defecto)  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 6. Serialización y Métodos Especiales

### 6.1 El método `__repr__`

Define cómo se muestra el objeto cuando lo imprimes. Es útil para debugging.

```python
class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True)

    def __repr__(self):
        return f'<User {self.id}: {self.email}>'

# Uso
user = User.query.get(1)
print(user)  # <User 1: juan@email.com>
```

### 6.2 El método `serialize`

Convierte el objeto a un **diccionario Python**, necesario para enviar datos como JSON en una API.

```python
class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True)
    password: Mapped[str] = mapped_column(String(256))
    is_active: Mapped[bool] = mapped_column(Boolean(), default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(), default=datetime.utcnow)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "is_active": self.is_active,
            "created_at": self.created_at.isoformat() if self.created_at else None
            # NUNCA incluir password por seguridad
        }
```

**Uso en un endpoint:**

```python
@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.serialize() for user in users]), 200

@app.route('/user/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get(id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify(user.serialize()), 200
```

### 6.3 Serializaciones con Relaciones

Crea métodos adicionales para incluir datos relacionados:

```python
class User(db.Model):
    # ... columnas ...

    profile: Mapped["ProfileInfo"] = relationship("ProfileInfo", back_populates="user", uselist=False)
    orders: Mapped[list["Order"]] = relationship("Order", back_populates="user")

    def serialize(self):
        """Serialización básica - solo datos del usuario"""
        return {
            "id": self.id,
            "email": self.email,
            "is_active": self.is_active
        }

    def serialize_with_profile(self):
        """Serialización con perfil incluido"""
        data = self.serialize()
        data["profile"] = self.profile.serialize() if self.profile else None
        return data

    def serialize_with_orders(self):
        """Serialización con órdenes incluidas"""
        data = self.serialize()
        data["orders"] = [order.serialize() for order in self.orders]
        data["orders_count"] = len(self.orders)
        return data

    def serialize_full(self):
        """Serialización completa con todo"""
        data = self.serialize()
        data["profile"] = self.profile.serialize() if self.profile else None
        data["orders"] = [order.serialize() for order in self.orders]
        return data
```

**Uso según la necesidad:**

```python
# Solo datos básicos
@app.route('/users')
def get_users():
    users = User.query.all()
    return jsonify([u.serialize() for u in users])

# Con perfil
@app.route('/user/<int:id>/profile')
def get_user_profile(id):
    user = User.query.get(id)
    return jsonify(user.serialize_with_profile())

# Con órdenes
@app.route('/user/<int:id>/orders')
def get_user_orders(id):
    user = User.query.get(id)
    return jsonify(user.serialize_with_orders())
```

---

## 7. Migraciones de Base de Datos

### ¿Qué son las Migraciones?

Las migraciones son como un **control de versiones para tu base de datos**. Permiten:

- Rastrear cambios en la estructura de las tablas
- Aplicar cambios de forma incremental
- Revertir cambios si hay problemas
- Sincronizar la base de datos entre diferentes entornos (desarrollo, producción)

### Analogía

Piensa en las migraciones como **commits de Git**, pero para la base de datos:

- Cada migración es un "commit" que describe un cambio
- Puedes avanzar o retroceder entre versiones
- El historial queda documentado

### Configuración con Flask-Migrate

```bash
# Instalar
pip install flask-migrate
```

```python
# app.py
from flask_migrate import Migrate
from models import db

app = Flask(__name__)
# ... configuración ...

MIGRATE = Migrate(app, db)
```

### Comandos Principales

```bash
# 1. INICIALIZAR (solo la primera vez)
# Crea la carpeta migrations/
flask db init

# 2. CREAR UNA MIGRACIÓN
# Detecta cambios en los modelos y crea un archivo de migración
flask db migrate -m "Descripción del cambio"

# 3. APLICAR LA MIGRACIÓN
# Ejecuta los cambios en la base de datos
flask db upgrade

# 4. REVERTIR LA ÚLTIMA MIGRACIÓN
flask db downgrade

# 5. VER EL HISTORIAL
flask db history

# 6. VER LA VERSIÓN ACTUAL
flask db current
```

### Flujo de Trabajo Típico

```bash
# 1. Modificas tus modelos en models.py
# (agregas una columna, una tabla, cambias un tipo, etc.)

# 2. Creas la migración
flask db migrate -m "Agregar columna phone a users"

# 3. Revisas el archivo generado en migrations/versions/
# (asegúrate de que los cambios son correctos)

# 4. Aplicas la migración
flask db upgrade

# ¡Listo! Tu base de datos está actualizada
```

### Estructura de Carpeta migrations/

```
migrations/
├── alembic.ini          # Configuración de Alembic
├── env.py               # Script de entorno
├── script.py.mako       # Plantilla para migraciones
└── versions/            # Archivos de migración
    ├── a5cffa318ac2_initial.py
    ├── b7d9e123456_add_profile.py
    └── c8e0f234567_add_orders.py
```

### Ejemplo de Archivo de Migración

```python
# migrations/versions/b7d9e123456_add_phone_to_users.py

from alembic import op
import sqlalchemy as sa

# Identificador único de esta migración
revision = 'b7d9e123456'
down_revision = 'a5cffa318ac2'  # Migración anterior

def upgrade():
    """Aplicar el cambio"""
    op.add_column('users', sa.Column('phone', sa.String(20), nullable=True))

def downgrade():
    """Revertir el cambio"""
    op.drop_column('users', 'phone')
```

---

## 8. Flask-Admin

### ¿Qué es Flask-Admin?

**Flask-Admin** es una extensión que genera automáticamente un **panel de administración** para tus modelos. Es como tener un "Django Admin" para Flask.

### Características

- Interfaz web para ver, crear, editar y eliminar registros
- Generación automática basada en tus modelos
- Personalizable (vistas, filtros, acciones)
- Soporte para relaciones

### Instalación

```bash
pip install flask-admin
```

### Configuración Básica

```python
# admin.py
import os
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from models import db, User, ProfileInfo, Article, Order, OrderItem, Tag

def setup_admin(app):
    # Configurar clave secreta (necesaria para sesiones)
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'clave-secreta-desarrollo')

    # Configurar el tema visual
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'

    # Crear la instancia de Admin
    admin = Admin(
        app,
        name='Mi Panel Admin',      # Nombre que aparece en el header
        template_mode='bootstrap3'   # Usa Bootstrap 3 para el diseño
    )

    # Agregar vistas para cada modelo
    # ModelView genera automáticamente CRUD para el modelo
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(ProfileInfo, db.session))
    admin.add_view(ModelView(Article, db.session))
    admin.add_view(ModelView(Order, db.session))
    admin.add_view(ModelView(OrderItem, db.session))
    admin.add_view(ModelView(Tag, db.session))
```

```python
# app.py
from admin import setup_admin

app = Flask(__name__)
# ... configuración de db ...

setup_admin(app)  # Activar el admin
```

### Acceder al Panel

Una vez configurado, accede a: `http://localhost:3000/admin`

### Personalizar Vistas

Puedes crear vistas personalizadas heredando de `ModelView`:

```python
from flask_admin.contrib.sqla import ModelView

class UserAdmin(ModelView):
    # Columnas a mostrar en la lista
    column_list = ['id', 'email', 'username', 'is_active', 'created_at']

    # Columnas por las que se puede buscar
    column_searchable_list = ['email', 'username']

    # Columnas por las que se puede filtrar
    column_filters = ['is_active', 'created_at']

    # Campos excluidos del formulario (no editables)
    form_excluded_columns = ['password', 'created_at']

    # Ordenar por defecto
    column_default_sort = ('created_at', True)  # True = descendente

# Usar la vista personalizada
admin.add_view(UserAdmin(User, db.session))
```

### Proteger el Admin (Producción)

En producción, **SIEMPRE** protege el admin con autenticación:

```python
from flask_admin.contrib.sqla import ModelView
from flask import redirect, url_for
from flask_login import current_user

class SecureModelView(ModelView):
    def is_accessible(self):
        # Solo accesible si el usuario está autenticado y es admin
        return current_user.is_authenticated and current_user.is_admin

    def inaccessible_callback(self, name, **kwargs):
        # Redirigir al login si no tiene acceso
        return redirect(url_for('login'))

# Usar la vista segura
admin.add_view(SecureModelView(User, db.session))
```

---

## Resumen Visual

```
┌─────────────────────────────────────────────────────────────────┐
│                        FLUJO DE TRABAJO                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   1. Definir Modelos (models.py)                                │
│          ↓                                                       │
│   2. Crear Migración (flask db migrate)                         │
│          ↓                                                       │
│   3. Aplicar Migración (flask db upgrade)                       │
│          ↓                                                       │
│   4. Usar en la App (queries, serialize, API)                   │
│          ↓                                                       │
│   5. Administrar con Flask-Admin (/admin)                       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      TIPOS DE RELACIONES                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   1:1  → uselist=False + unique=True en FK                      │
│   1:N  → Solo FK (sin unique)                                   │
│   N:N  → db.Table (simple) o Clase (con campos extra)           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Recursos Adicionales

- [SQLAlchemy Oficial](https://www.sqlalchemy.org/)
- [Flask-SQLAlchemy](https://flask-sqlalchemy.palletsprojects.com/)
- [Flask-Migrate](https://flask-migrate.readthedocs.io/)
- [Flask-Admin](https://flask-admin.readthedocs.io/)
- [Alembic (Migraciones)](https://alembic.sqlalchemy.org/)
