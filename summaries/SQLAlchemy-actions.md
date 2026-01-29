# SQLAlchemy Actions - Guía de Consultas y Operaciones CRUD

## ¿Qué vamos a aprender?

En esta guía aprenderás a **interactuar con la base de datos** usando SQLAlchemy.
Ya sabes crear modelos (tablas), ahora toca lo más importante: **consultar, crear, editar y eliminar datos**.

---

## Índice

1. [Configuración previa](#1-configuración-previa)
2. [CREATE - Crear registros](#2-create---crear-registros)
3. [READ - Consultar registros](#3-read---consultar-registros)
4. [UPDATE - Editar registros](#4-update---editar-registros)
5. [DELETE - Eliminar registros](#5-delete---eliminar-registros)
6. [Manejo de la sesión](#6-manejo-de-la-sesión)
7. [Gestión de errores](#7-gestión-de-errores)
8. [Resumen rápido](#8-resumen-rápido)

---

## 1. Configuración previa

Antes de hacer cualquier operación, necesitas tener acceso al objeto `db` (tu instancia de SQLAlchemy) y a tus modelos:

```python
from models import db, User, Article, Order, OrderItem, Tag
```

> **Importante:** Todas las operaciones de escritura (crear, editar, eliminar) requieren llamar a `db.session.commit()` para que los cambios se guarden permanentemente en la base de datos. Sin el `commit()`, los cambios se pierden.

---

## 2. CREATE - Crear registros

### Crear un solo registro

```python
# Paso 1: Crear una instancia del modelo (como crear un objeto en Python)
nuevo_usuario = User(
    email="juan@email.com",
    username="juanito",
    password="mi_contraseña_segura",
    is_active=True
)

# Paso 2: Añadir el objeto a la sesión de base de datos
db.session.add(nuevo_usuario)

# Paso 3: Confirmar los cambios (guardar en la base de datos)
db.session.commit()

# Después del commit, el objeto ya tiene su ID asignado
print(nuevo_usuario.id)  # Ejemplo: 1
```

### Crear varios registros a la vez

```python
tag1 = Tag(name="Oferta", color="#FF0000")
tag2 = Tag(name="Nuevo", color="#00FF00")
tag3 = Tag(name="Popular", color="#0000FF")

# add_all() recibe una lista de objetos
db.session.add_all([tag1, tag2, tag3])
db.session.commit()
```

### Crear registros con relaciones

```python
# Crear un usuario con su perfil al mismo tiempo
usuario = User(
    email="maria@email.com",
    username="maria",
    password="contraseña123"
)
# Como la relación tiene cascade, al hacer commit del usuario
# también se guarda el perfil automáticamente
usuario.profile = ProfileInfo(
    first_name="María",
    last_name="García",
    phone="123456789"
)

db.session.add(usuario)
db.session.commit()
```

---

## 3. READ - Consultar registros

Esta es la parte más extensa porque hay muchas formas de buscar datos.

### 3.1 Obtener TODOS los registros

```python
# Devuelve una LISTA con todos los usuarios
todos_los_usuarios = User.query.all()
# Resultado: [<User 1: juan@email.com>, <User 2: maria@email.com>, ...]
```

### 3.2 Obtener UN registro por su ID

```python
# Busca el usuario con id=1
usuario = User.query.get(1)
# Si no existe, devuelve None (no da error)

# Alternativa que lanza error 404 automáticamente si no existe
usuario = User.query.get_or_404(1)
```

### 3.3 Filtrar registros con filter_by() - Filtro simple

`filter_by()` usa **nombres de columna como argumentos** (más fácil de escribir):

```python
# Buscar usuario por email exacto
usuario = User.query.filter_by(email="juan@email.com").first()
# .first() devuelve el PRIMER resultado o None si no hay

# Buscar todos los usuarios activos
activos = User.query.filter_by(is_active=True).all()

# Buscar artículo por nombre
articulo = Article.query.filter_by(name="Laptop").first()

# Filtrar por múltiples campos (AND implícito)
usuario = User.query.filter_by(
    email="juan@email.com",
    is_active=True
).first()
```

### 3.4 Filtrar registros con filter() - Filtro avanzado

`filter()` usa **expresiones de Python** (más potente):

```python
# Comparaciones
caros = Article.query.filter(Article.price > 100).all()
baratos = Article.query.filter(Article.price <= 50).all()
rango = Article.query.filter(Article.price.between(10, 100)).all()

# Buscar texto que CONTENGA algo (LIKE en SQL)
resultados = Article.query.filter(Article.name.like("%laptop%")).all()
# El % es comodín: busca "laptop" en cualquier parte del nombre

# Versión que ignora mayúsculas/minúsculas
resultados = Article.query.filter(Article.name.ilike("%laptop%")).all()

# Buscar en una lista de valores (IN en SQL)
usuarios = User.query.filter(User.id.in_([1, 3, 5])).all()

# Buscar valores NULL
sin_bio = ProfileInfo.query.filter(ProfileInfo.bio.is_(None)).all()
con_bio = ProfileInfo.query.filter(ProfileInfo.bio.isnot(None)).all()

# Negar condición (NOT)
no_disponibles = Article.query.filter(Article.is_available != True).all()
```

### 3.5 Combinar filtros (AND / OR)

```python
from sqlalchemy import and_, or_

# AND: ambas condiciones deben cumplirse
resultados = Article.query.filter(
    and_(
        Article.price > 50,
        Article.is_available == True
    )
).all()

# También se puede encadenar (es lo mismo que AND)
resultados = Article.query.filter(
    Article.price > 50
).filter(
    Article.is_available == True
).all()

# OR: al menos una condición debe cumplirse
resultados = Article.query.filter(
    or_(
        Article.price < 10,
        Article.stock > 100
    )
).all()
```

### 3.6 Ordenar resultados

```python
# Ordenar por precio de menor a mayor (ascendente, es el default)
articulos = Article.query.order_by(Article.price).all()
articulos = Article.query.order_by(Article.price.asc()).all()  # Equivalente

# Ordenar de mayor a menor (descendente)
articulos = Article.query.order_by(Article.price.desc()).all()

# Ordenar por múltiples campos
articulos = Article.query.order_by(
    Article.is_available.desc(),  # Primero los disponibles
    Article.price.asc()           # Luego por precio ascendente
).all()
```

### 3.7 Limitar y paginar resultados

```python
# Obtener solo los primeros 5
primeros_5 = Article.query.limit(5).all()

# Saltar los primeros 10 y obtener los siguientes 5 (paginación manual)
pagina_3 = Article.query.offset(10).limit(5).all()

# Paginación con paginate() - la forma recomendada
# page=1 (número de página), per_page=10 (items por página)
pagina = Article.query.paginate(page=1, per_page=10)
# pagina.items     → Lista de artículos de esta página
# pagina.total     → Total de artículos en toda la tabla
# pagina.pages     → Número total de páginas
# pagina.has_next  → ¿Hay página siguiente?
# pagina.has_prev  → ¿Hay página anterior?
```

### 3.8 Contar registros

```python
# Contar todos los usuarios
total = User.query.count()

# Contar con filtro
activos = User.query.filter_by(is_active=True).count()
```

### 3.9 Verificar si existe un registro

```python
# Forma eficiente de verificar existencia
existe = User.query.filter_by(email="juan@email.com").first() is not None
```

### 3.10 Obtener el primero o el último

```python
# Primer registro
primero = User.query.first()

# "Último" registro (ordenando por ID descendente)
ultimo = User.query.order_by(User.id.desc()).first()
```

---

## 4. UPDATE - Editar registros

### Editar un registro

```python
# Paso 1: Obtener el registro que quieres editar
usuario = User.query.get(1)

# Paso 2: Modificar los atributos directamente
usuario.username = "nuevo_nombre"
usuario.email = "nuevo@email.com"

# Paso 3: Confirmar los cambios
db.session.commit()
```

> **Nota:** No necesitas hacer `db.session.add()` cuando editas un objeto que ya existe en la base de datos. SQLAlchemy lo detecta automáticamente.

### Editar varios registros a la vez (bulk update)

```python
# Desactivar todos los usuarios que no tienen perfil
User.query.filter(User.profile == None).update(
    {"is_active": False}
)
db.session.commit()
```

---

## 5. DELETE - Eliminar registros

### Eliminar un registro

```python
# Paso 1: Obtener el registro
usuario = User.query.get(1)

# Paso 2: Eliminarlo de la sesión
db.session.delete(usuario)

# Paso 3: Confirmar la eliminación
db.session.commit()
```

> **Cuidado con cascade:** Si el modelo tiene `cascade="all, delete-orphan"`, al eliminar un usuario también se eliminan automáticamente su perfil y sus órdenes.

### Eliminar varios registros con filtro

```python
# Eliminar todos los artículos sin stock
Article.query.filter_by(stock=0).delete()
db.session.commit()
```

---

## 6. Manejo de la sesión

La "sesión" (`db.session`) es como un **borrador** donde preparas todos los cambios antes de guardarlos.

### commit() - Guardar cambios

```python
db.session.commit()
# Confirma TODOS los cambios pendientes (adds, deletes, updates)
```

### rollback() - Deshacer cambios

```python
db.session.rollback()
# Deshace TODOS los cambios que no se han confirmado con commit()
# Útil cuando algo sale mal y quieres volver al estado anterior
```

### flush() - Sincronizar sin confirmar

```python
db.session.flush()
# Envía los cambios pendientes a la base de datos PERO no los confirma
# Útil cuando necesitas el ID de un objeto recién creado
# antes de hacer commit()

nuevo_usuario = User(email="test@test.com", username="test", password="123")
db.session.add(nuevo_usuario)
db.session.flush()  # Ahora nuevo_usuario.id ya tiene valor
print(nuevo_usuario.id)  # Ya existe aunque no hemos hecho commit
```

### Patrón try/except recomendado

```python
try:
    nuevo = User(email="test@test.com", username="test", password="123")
    db.session.add(nuevo)
    db.session.commit()
except Exception as error:
    db.session.rollback()  # Si hay error, deshacer todo
    print(f"Error: {error}")
    # Manejar el error apropiadamente
```

---

## 7. Gestión de errores

### Errores comunes y cómo manejarlos

```python
from sqlalchemy.exc import IntegrityError

# IntegrityError: Cuando intentas crear un registro que viola una restricción
# (ejemplo: email duplicado, campo único repetido)
try:
    usuario = User(email="existente@email.com", username="nuevo", password="123")
    db.session.add(usuario)
    db.session.commit()
except IntegrityError:
    db.session.rollback()
    print("Error: El email ya existe en la base de datos")
```

### Patrón completo para un endpoint

```python
@app.route('/users', methods=['POST'])
def create_user():
    try:
        body = request.get_json()

        # Validar que vienen los campos obligatorios
        if not body:
            return jsonify({"error": "El body no puede estar vacío"}), 400

        if "email" not in body or "password" not in body:
            return jsonify({"error": "Faltan campos obligatorios"}), 400

        # Verificar que no exista un usuario con ese email
        existe = User.query.filter_by(email=body["email"]).first()
        if existe:
            return jsonify({"error": "El email ya está registrado"}), 409

        # Crear el usuario
        nuevo = User(
            email=body["email"],
            username=body["username"],
            password=body["password"]
        )
        db.session.add(nuevo)
        db.session.commit()

        return jsonify(nuevo.serialize()), 201

    except Exception as error:
        db.session.rollback()
        return jsonify({"error": f"Error interno: {str(error)}"}), 500
```

---

## 8. Resumen rápido

| Operación | Código | Descripción |
|-----------|--------|-------------|
| **Crear uno** | `db.session.add(obj)` + `commit()` | Añade un registro |
| **Crear varios** | `db.session.add_all([lista])` + `commit()` | Añade varios registros |
| **Leer todos** | `Model.query.all()` | Lista completa |
| **Leer por ID** | `Model.query.get(id)` | Un registro o `None` |
| **Filtrar simple** | `Model.query.filter_by(campo=valor)` | Filtro por igualdad |
| **Filtrar avanzado** | `Model.query.filter(expresión)` | Filtro con operadores |
| **Primer resultado** | `.first()` | Primer match o `None` |
| **Ordenar** | `.order_by(Model.campo.desc())` | Ascendente o descendente |
| **Limitar** | `.limit(n)` | Máximo N resultados |
| **Contar** | `.count()` | Número de registros |
| **Editar** | Modificar atributos + `commit()` | Actualiza campos |
| **Eliminar uno** | `db.session.delete(obj)` + `commit()` | Borra un registro |
| **Eliminar filtro** | `Model.query.filter_by(...).delete()` + `commit()` | Borra varios |
| **Deshacer** | `db.session.rollback()` | Revierte cambios |
| **Sincronizar** | `db.session.flush()` | Envia sin confirmar |

### Reglas de oro

1. **Siempre** haz `commit()` después de crear, editar o eliminar
2. **Siempre** haz `rollback()` en el bloque `except` cuando algo falla
3. **Nunca** expongas la contraseña en el `serialize()`
4. **Verifica** que el registro existe antes de editarlo o eliminarlo
5. **Valida** los datos del `request.get_json()` antes de usarlos
