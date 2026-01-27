"""
=============================================================================
                        MODELOS DE BASE DE DATOS CON SQLALCHEMY
=============================================================================

Este archivo contiene todos los modelos (tablas) de nuestra base de datos.
SQLAlchemy es un ORM (Object-Relational Mapping) que nos permite trabajar
con bases de datos usando clases de Python en lugar de SQL directo.

RELACIONES EN ESTE ARCHIVO:
---------------------------
1. User <-> ProfileInfo:     Relación 1 a 1 (Un usuario tiene un perfil)
2. User <-> Order:           Relación 1 a Muchos (Un usuario tiene muchas órdenes)
3. Order <-> OrderItem:      Relación 1 a Muchos (Una orden tiene muchos items)
4. Article <-> OrderItem:    Relación 1 a Muchos (Un artículo puede estar en muchos items)

La tabla OrderItem actúa como tabla intermedia entre Order y Article,
permitiendo una relación Muchos a Muchos entre órdenes y artículos.

5. Article <-> Tag:          Relación Muchos a Muchos PURA (usando secondary)
   Un artículo puede tener muchas etiquetas y una etiqueta puede estar en muchos artículos.
"""

# =============================================================================
#                              IMPORTACIONES
# =============================================================================

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Integer, Float, Text, DateTime, ForeignKey, Table, Column
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime

# Inicializamos SQLAlchemy - esto crea la conexión con la base de datos
db = SQLAlchemy()


# =============================================================================
#              TABLA DE ASOCIACIÓN: article_tags (Muchos a Muchos PURA)
# =============================================================================
"""
TABLA DE ASOCIACIÓN PARA RELACIÓN MUCHOS A MUCHOS
-------------------------------------------------
Esta es la forma MÁS SIMPLE de crear una relación muchos a muchos en SQLAlchemy.

¿Cuándo usar db.Table vs una Clase Modelo?
------------------------------------------
- USA db.Table cuando SOLO necesitas conectar dos tablas (sin campos extra)
- USA una Clase (como OrderItem) cuando necesitas campos adicionales
  (cantidad, precio, fecha, etc.)

En este caso:
- article_tags: Solo conecta artículos con etiquetas (no hay campos extra)
- OrderItem: Necesita quantity, unit_price, subtotal (por eso es una clase)

La tabla article_tags tendrá solo 2 columnas:
- article_id: FK hacia articles
- tag_id: FK hacia tags
"""
article_tags = Table(
    'article_tags',  # Nombre de la tabla en la base de datos
    db.metadata,     # Metadata de SQLAlchemy (necesario para que funcione)

    # Columna 1: Referencia al artículo
    Column(
        'article_id',                    # Nombre de la columna
        Integer,                         # Tipo de dato
        ForeignKey('articles.id'),       # Clave foránea hacia articles
        primary_key=True                 # Parte de la clave primaria compuesta
    ),

    # Columna 2: Referencia a la etiqueta
    Column(
        'tag_id',                        # Nombre de la columna
        Integer,                         # Tipo de dato
        ForeignKey('tags.id'),           # Clave foránea hacia tags
        primary_key=True                 # Parte de la clave primaria compuesta
    )
)
# NOTA: La clave primaria es COMPUESTA (article_id + tag_id)
# Esto significa que un artículo puede tener la misma etiqueta solo UNA vez


# =============================================================================
#                              MODELO: TAG (Etiqueta)
# =============================================================================
class Tag(db.Model):
    """
    Tabla de Etiquetas/Tags
    -----------------------
    Almacena las etiquetas que se pueden asignar a los artículos.

    Ejemplos de etiquetas: "Oferta", "Nuevo", "Popular", "Electrónica", "Ropa"

    Esta tabla tiene una relación MUCHOS a MUCHOS con Article:
    - Un artículo puede tener MUCHAS etiquetas
    - Una etiqueta puede estar en MUCHOS artículos

    Atributos:
        id: Identificador único de la etiqueta
        name: Nombre de la etiqueta (único)
        color: Color para mostrar en la UI (opcional)
    """

    __tablename__ = 'tags'

    # -------------------------------------------------------------------------
    # COLUMNAS
    # -------------------------------------------------------------------------

    id: Mapped[int] = mapped_column(primary_key=True)

    # Nombre de la etiqueta (debe ser único)
    name: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)

    # Color para la UI (ejemplo: "#FF5733" o "red")
    color: Mapped[str] = mapped_column(String(20), nullable=True, default="#3498db")

    # -------------------------------------------------------------------------
    # RELACIÓN MUCHOS A MUCHOS CON ARTICLE
    # -------------------------------------------------------------------------

    # secondary=article_tags indica que use la tabla de asociación
    # back_populates="tags" conecta con el atributo 'tags' en Article
    articles: Mapped[list["Article"]] = relationship(
        "Article",
        secondary=article_tags,      # ¡Esta es la clave! Usa la tabla de asociación
        back_populates="tags"        # Relación bidireccional con Article
    )

    # -------------------------------------------------------------------------
    # MÉTODOS
    # -------------------------------------------------------------------------

    def __repr__(self):
        return f'<Tag {self.id}: {self.name}>'

    def serialize(self):
        """
        Serializa la etiqueta para la API.

        Returns:
            dict: Datos de la etiqueta
        """
        return {
            "id": self.id,
            "name": self.name,
            "color": self.color
        }

    def serialize_with_articles(self):
        """
        Serializa la etiqueta incluyendo todos sus artículos.
        Útil para ver qué artículos tienen esta etiqueta.

        Returns:
            dict: Datos de la etiqueta con lista de artículos
        """
        data = self.serialize()
        data["articles"] = [article.serialize_simple() for article in self.articles]
        data["articles_count"] = len(self.articles)
        return data


# =============================================================================
#                              MODELO: USER (Usuario)
# =============================================================================
class User(db.Model):
    """
    Tabla de Usuarios
    -----------------
    Esta es la tabla principal de usuarios. Cada usuario puede tener:
    - Un perfil (relación 1 a 1 con ProfileInfo)
    - Muchas órdenes (relación 1 a muchos con Order)

    Atributos:
        id: Identificador único del usuario (clave primaria)
        email: Correo electrónico (único, no puede repetirse)
        username: Nombre de usuario (único)
        password: Contraseña del usuario (NUNCA se serializa por seguridad)
        is_active: Indica si el usuario está activo o no
        created_at: Fecha y hora de creación del usuario
    """

    # -------------------------------------------------------------------------
    # NOMBRE DE LA TABLA EN LA BASE DE DATOS
    # -------------------------------------------------------------------------
    # Por defecto SQLAlchemy usa el nombre de la clase en minúsculas
    # Puedes personalizarlo con __tablename__
    __tablename__ = 'users'

    # -------------------------------------------------------------------------
    # COLUMNAS DE LA TABLA
    # -------------------------------------------------------------------------

    # ID: Clave primaria - se genera automáticamente
    # Mapped[int] indica que es un entero en Python
    # primary_key=True lo convierte en la clave primaria
    id: Mapped[int] = mapped_column(primary_key=True)

    # EMAIL: Campo único para el correo
    # String(120) limita a 120 caracteres
    # unique=True significa que no puede haber dos usuarios con el mismo email
    # nullable=False significa que es obligatorio (no puede ser NULL)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)

    # USERNAME: Nombre de usuario único
    username: Mapped[str] = mapped_column(String(80), unique=True, nullable=False)

    # PASSWORD: Contraseña del usuario
    # IMPORTANTE: En producción, siempre almacena contraseñas hasheadas
    password: Mapped[str] = mapped_column(String(256), nullable=False)

    # IS_ACTIVE: Booleano para saber si la cuenta está activa
    # default=True significa que por defecto será True
    is_active: Mapped[bool] = mapped_column(Boolean(), default=True, nullable=False)

    # CREATED_AT: Fecha de creación del usuario
    # default=datetime.utcnow crea automáticamente la fecha actual
    created_at: Mapped[datetime] = mapped_column(DateTime(), default=datetime.utcnow)

    # -------------------------------------------------------------------------
    # RELACIONES CON OTRAS TABLAS
    # -------------------------------------------------------------------------

    # RELACIÓN 1 a 1 con ProfileInfo
    # back_populates='user' crea la relación bidireccional
    # uselist=False indica que es UNA sola instancia, no una lista (relación 1 a 1)
    profile: Mapped["ProfileInfo"] = relationship(
        "ProfileInfo",           # Nombre de la clase relacionada
        back_populates="user",   # Nombre del atributo en la otra clase
        uselist=False,           # False = relación 1 a 1 (no es una lista)
        cascade="all, delete-orphan"  # Si se borra el usuario, se borra su perfil
    )

    # RELACIÓN 1 a MUCHOS con Order
    # Un usuario puede tener muchas órdenes
    # Por defecto uselist=True, así que será una lista
    orders: Mapped[list["Order"]] = relationship(
        "Order",
        back_populates="user",
        cascade="all, delete-orphan"  # Si se borra el usuario, se borran sus órdenes
    )

    # -------------------------------------------------------------------------
    # MÉTODOS DE LA CLASE
    # -------------------------------------------------------------------------

    def __repr__(self):
        """
        Método especial que define cómo se representa el objeto como string.
        Útil para debugging. Ejemplo: <User 1: john@email.com>
        """
        return f'<User {self.id}: {self.email}>'

    def serialize(self):
        """
        Convierte el objeto User a un diccionario Python.
        Esto es necesario para enviar los datos como JSON en la API.

        IMPORTANTE: Nunca incluyas la contraseña en el serialize
        por razones de seguridad.

        Returns:
            dict: Diccionario con los datos del usuario
        """
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "is_active": self.is_active,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            # NOTA: La contraseña NUNCA se incluye aquí por seguridad
        }

    def serialize_with_profile(self):
        """
        Serializa el usuario incluyendo su información de perfil.
        Útil cuando necesitas todos los datos del usuario.

        Returns:
            dict: Diccionario con usuario y perfil
        """
        data = self.serialize()
        data["profile"] = self.profile.serialize() if self.profile else None
        return data

    def serialize_with_orders(self):
        """
        Serializa el usuario incluyendo todas sus órdenes.
        Útil para ver el historial de compras.

        Returns:
            dict: Diccionario con usuario y lista de órdenes
        """
        data = self.serialize()
        data["orders"] = [order.serialize() for order in self.orders]
        return data


# =============================================================================
#                        MODELO: PROFILE_INFO (Perfil de Usuario)
# =============================================================================
class ProfileInfo(db.Model):
    """
    Tabla de Información de Perfil
    ------------------------------
    Almacena información adicional del usuario.
    Tiene una relación 1 a 1 con User (un usuario = un perfil).

    ¿Por qué separar User y ProfileInfo?
    - Mantiene la tabla User limpia con solo datos de autenticación
    - Los datos del perfil pueden ser opcionales
    - Mejor organización y mantenimiento del código

    Atributos:
        id: Identificador único del perfil
        user_id: Clave foránea que conecta con el usuario (relación 1 a 1)
        first_name: Nombre del usuario
        last_name: Apellido del usuario
        phone: Número de teléfono
        address: Dirección
        bio: Biografía o descripción del usuario
        avatar_url: URL de la imagen de perfil
    """

    __tablename__ = 'profile_info'

    # -------------------------------------------------------------------------
    # COLUMNAS
    # -------------------------------------------------------------------------

    id: Mapped[int] = mapped_column(primary_key=True)

    # CLAVE FORÁNEA (Foreign Key)
    # ForeignKey('users.id') conecta esta tabla con la tabla 'users'
    # unique=True asegura que solo haya UN perfil por usuario (relación 1 a 1)
    user_id: Mapped[int] = mapped_column(
        ForeignKey('users.id'),  # Referencia a la columna 'id' de la tabla 'users'
        unique=True,             # Un usuario solo puede tener UN perfil
        nullable=False           # Es obligatorio tener un user_id
    )

    # Datos personales del usuario
    first_name: Mapped[str] = mapped_column(String(100), nullable=True)
    last_name: Mapped[str] = mapped_column(String(100), nullable=True)
    phone: Mapped[str] = mapped_column(String(20), nullable=True)
    address: Mapped[str] = mapped_column(String(250), nullable=True)

    # Bio usa Text() para textos largos (sin límite fijo de caracteres)
    bio: Mapped[str] = mapped_column(Text(), nullable=True)

    # URL del avatar/foto de perfil
    avatar_url: Mapped[str] = mapped_column(String(500), nullable=True)

    # -------------------------------------------------------------------------
    # RELACIÓN INVERSA CON USER
    # -------------------------------------------------------------------------

    # Esto permite acceder al usuario desde el perfil: profile.user
    user: Mapped["User"] = relationship(
        "User",
        back_populates="profile"  # Conecta con el atributo 'profile' en User
    )

    # -------------------------------------------------------------------------
    # MÉTODOS
    # -------------------------------------------------------------------------

    def __repr__(self):
        return f'<ProfileInfo {self.id}: {self.first_name} {self.last_name}>'

    def serialize(self):
        """
        Convierte el perfil a diccionario.

        Returns:
            dict: Datos del perfil
        """
        return {
            "id": self.id,
            "user_id": self.user_id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "full_name": f"{self.first_name or ''} {self.last_name or ''}".strip(),
            "phone": self.phone,
            "address": self.address,
            "bio": self.bio,
            "avatar_url": self.avatar_url
        }


# =============================================================================
#                           MODELO: ARTICLE (Artículo/Producto)
# =============================================================================
class Article(db.Model):
    """
    Tabla de Artículos/Productos
    ----------------------------
    Almacena los productos disponibles para comprar.

    Un artículo puede aparecer en múltiples órdenes a través de OrderItem.
    Esto crea una relación MUCHOS a MUCHOS entre Article y Order.

    Atributos:
        id: Identificador único del artículo
        name: Nombre del producto
        description: Descripción detallada
        price: Precio unitario del producto
        stock: Cantidad disponible en inventario
        image_url: URL de la imagen del producto
        is_available: Si el producto está disponible para venta
        created_at: Fecha de creación del registro
    """

    __tablename__ = 'articles'

    # -------------------------------------------------------------------------
    # COLUMNAS
    # -------------------------------------------------------------------------

    id: Mapped[int] = mapped_column(primary_key=True)

    # Nombre del producto (obligatorio)
    name: Mapped[str] = mapped_column(String(200), nullable=False)

    # Descripción del producto (opcional, puede ser largo)
    description: Mapped[str] = mapped_column(Text(), nullable=True)

    # Precio del producto
    # Float permite decimales para precios como 19.99
    price: Mapped[float] = mapped_column(Float(), nullable=False, default=0.0)

    # Stock disponible
    stock: Mapped[int] = mapped_column(Integer(), nullable=False, default=0)

    # URL de imagen del producto
    image_url: Mapped[str] = mapped_column(String(500), nullable=True)

    # Si está disponible para la venta
    is_available: Mapped[bool] = mapped_column(Boolean(), default=True)

    # Fecha de creación
    created_at: Mapped[datetime] = mapped_column(DateTime(), default=datetime.utcnow)

    # -------------------------------------------------------------------------
    # RELACIÓN CON ORDER_ITEMS
    # -------------------------------------------------------------------------

    # Un artículo puede estar en muchos items de orden
    order_items: Mapped[list["OrderItem"]] = relationship(
        "OrderItem",
        back_populates="article",
        cascade="all, delete-orphan"
    )

    # -------------------------------------------------------------------------
    # RELACIÓN MUCHOS A MUCHOS CON TAG (usando secondary)
    # -------------------------------------------------------------------------

    # RELACIÓN MUCHOS A MUCHOS PURA
    # secondary=article_tags le dice a SQLAlchemy que use esa tabla de asociación
    # SQLAlchemy maneja automáticamente las inserciones/eliminaciones en article_tags
    tags: Mapped[list["Tag"]] = relationship(
        "Tag",
        secondary=article_tags,     # Tabla de asociación creada arriba
        back_populates="articles"   # Conecta con el atributo 'articles' en Tag
    )

    # -------------------------------------------------------------------------
    # MÉTODOS
    # -------------------------------------------------------------------------

    def __repr__(self):
        return f'<Article {self.id}: {self.name} - ${self.price}>'

    def serialize(self):
        """
        Serializa el artículo para la API.

        Returns:
            dict: Datos del artículo
        """
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "stock": self.stock,
            "image_url": self.image_url,
            "is_available": self.is_available,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }

    def serialize_simple(self):
        """
        Versión simplificada para listas y referencias.

        Returns:
            dict: Datos básicos del artículo
        """
        return {
            "id": self.id,
            "name": self.name,
            "price": self.price,
            "is_available": self.is_available
        }

    def serialize_with_tags(self):
        """
        Serializa el artículo incluyendo todas sus etiquetas.
        Útil para mostrar el detalle de un producto con sus tags.

        Returns:
            dict: Datos del artículo con lista de etiquetas
        """
        data = self.serialize()
        # Serializamos cada etiqueta asociada al artículo
        data["tags"] = [tag.serialize() for tag in self.tags]
        return data


# =============================================================================
#                           MODELO: ORDER (Orden/Pedido)
# =============================================================================
class Order(db.Model):
    """
    Tabla de Órdenes/Pedidos
    ------------------------
    Representa una compra realizada por un usuario.

    Relaciones:
    - Pertenece a UN usuario (relación Muchos a 1 con User)
    - Contiene MUCHOS items (relación 1 a Muchos con OrderItem)

    Estados posibles (status):
    - 'pending': Pendiente de pago
    - 'paid': Pagada
    - 'shipped': Enviada
    - 'delivered': Entregada
    - 'cancelled': Cancelada

    Atributos:
        id: Identificador único de la orden
        user_id: ID del usuario que hizo la orden
        status: Estado actual de la orden
        total: Precio total de la orden
        shipping_address: Dirección de envío
        created_at: Fecha de creación
        updated_at: Fecha de última actualización
    """

    __tablename__ = 'orders'

    # -------------------------------------------------------------------------
    # COLUMNAS
    # -------------------------------------------------------------------------

    id: Mapped[int] = mapped_column(primary_key=True)

    # CLAVE FORÁNEA hacia User
    # Un usuario puede tener MUCHAS órdenes, pero cada orden pertenece a UN usuario
    user_id: Mapped[int] = mapped_column(
        ForeignKey('users.id'),
        nullable=False
    )

    # Estado de la orden
    status: Mapped[str] = mapped_column(
        String(20),
        default='pending',
        nullable=False
    )

    # Total de la orden (se calcula sumando los items)
    total: Mapped[float] = mapped_column(Float(), default=0.0)

    # Dirección de envío (puede ser diferente a la del perfil)
    shipping_address: Mapped[str] = mapped_column(String(500), nullable=True)

    # Fechas de auditoría
    created_at: Mapped[datetime] = mapped_column(DateTime(), default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(),
        default=datetime.utcnow,
        onupdate=datetime.utcnow  # Se actualiza automáticamente al modificar
    )

    # -------------------------------------------------------------------------
    # RELACIONES
    # -------------------------------------------------------------------------

    # Relación INVERSA con User (Muchos a 1)
    # Permite acceder al usuario: order.user
    user: Mapped["User"] = relationship(
        "User",
        back_populates="orders"
    )

    # Relación con OrderItem (1 a Muchos)
    # Una orden tiene muchos items
    items: Mapped[list["OrderItem"]] = relationship(
        "OrderItem",
        back_populates="order",
        cascade="all, delete-orphan"  # Si se borra la orden, se borran sus items
    )

    # -------------------------------------------------------------------------
    # MÉTODOS
    # -------------------------------------------------------------------------

    def __repr__(self):
        return f'<Order {self.id}: User {self.user_id} - ${self.total} ({self.status})>'

    def calculate_total(self):
        """
        Calcula el total de la orden sumando todos los items.
        Llama a este método después de agregar/modificar items.

        Returns:
            float: El total calculado
        """
        self.total = sum(item.subtotal for item in self.items)
        return self.total

    def serialize(self):
        """
        Serializa la orden para la API.

        Returns:
            dict: Datos de la orden
        """
        return {
            "id": self.id,
            "user_id": self.user_id,
            "status": self.status,
            "total": self.total,
            "shipping_address": self.shipping_address,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
            "items_count": len(self.items)  # Número de items sin cargar todo
        }

    def serialize_with_items(self):
        """
        Serializa la orden incluyendo todos sus items.
        Útil para ver el detalle completo de una orden.

        Returns:
            dict: Datos de la orden con lista de items
        """
        data = self.serialize()
        data["items"] = [item.serialize() for item in self.items]
        return data

    def serialize_with_user(self):
        """
        Serializa la orden incluyendo datos del usuario.
        Útil para administradores.

        Returns:
            dict: Datos de la orden con información del usuario
        """
        data = self.serialize()
        data["user"] = self.user.serialize() if self.user else None
        return data


# =============================================================================
#                      MODELO: ORDER_ITEM (Item de Orden)
# =============================================================================
class OrderItem(db.Model):
    """
    Tabla de Items de Orden (Tabla Intermedia/Pivote)
    -------------------------------------------------
    Esta tabla conecta Order con Article.

    ¿Por qué necesitamos esta tabla?
    - Una orden puede tener MUCHOS artículos
    - Un artículo puede estar en MUCHAS órdenes
    - Esto es una relación MUCHOS a MUCHOS
    - Además necesitamos guardar la CANTIDAD y el PRECIO al momento de la compra

    Esta tabla también se conoce como:
    - Tabla pivote
    - Tabla intermedia
    - Tabla de unión (junction table)

    Atributos:
        id: Identificador único del item
        order_id: ID de la orden a la que pertenece
        article_id: ID del artículo
        quantity: Cantidad de unidades
        unit_price: Precio unitario al momento de la compra
        subtotal: Total del item (quantity * unit_price)
    """

    __tablename__ = 'order_items'

    # -------------------------------------------------------------------------
    # COLUMNAS
    # -------------------------------------------------------------------------

    id: Mapped[int] = mapped_column(primary_key=True)

    # CLAVE FORÁNEA hacia Order
    order_id: Mapped[int] = mapped_column(
        ForeignKey('orders.id'),
        nullable=False
    )

    # CLAVE FORÁNEA hacia Article
    article_id: Mapped[int] = mapped_column(
        ForeignKey('articles.id'),
        nullable=False
    )

    # Cantidad de este artículo en la orden
    quantity: Mapped[int] = mapped_column(Integer(), nullable=False, default=1)

    # Precio unitario AL MOMENTO DE LA COMPRA
    # IMPORTANTE: Guardamos el precio aquí porque el precio del artículo
    # puede cambiar en el futuro, pero queremos mantener el precio histórico
    unit_price: Mapped[float] = mapped_column(Float(), nullable=False)

    # Subtotal = quantity * unit_price
    # Se calcula automáticamente, pero lo guardamos para consultas rápidas
    subtotal: Mapped[float] = mapped_column(Float(), nullable=False, default=0.0)

    # -------------------------------------------------------------------------
    # RELACIONES
    # -------------------------------------------------------------------------

    # Relación con Order (Muchos a 1)
    # Permite acceder a la orden: order_item.order
    order: Mapped["Order"] = relationship(
        "Order",
        back_populates="items"
    )

    # Relación con Article (Muchos a 1)
    # Permite acceder al artículo: order_item.article
    article: Mapped["Article"] = relationship(
        "Article",
        back_populates="order_items"
    )

    # -------------------------------------------------------------------------
    # MÉTODOS
    # -------------------------------------------------------------------------

    def __repr__(self):
        return f'<OrderItem {self.id}: {self.quantity}x Article {self.article_id}>'

    def calculate_subtotal(self):
        """
        Calcula el subtotal de este item.
        Llama a este método después de cambiar quantity o unit_price.

        Returns:
            float: El subtotal calculado
        """
        self.subtotal = self.quantity * self.unit_price
        return self.subtotal

    def serialize(self):
        """
        Serializa el item para la API.

        Returns:
            dict: Datos del item
        """
        return {
            "id": self.id,
            "order_id": self.order_id,
            "article_id": self.article_id,
            "quantity": self.quantity,
            "unit_price": self.unit_price,
            "subtotal": self.subtotal
        }

    def serialize_with_article(self):
        """
        Serializa el item incluyendo los datos del artículo.
        Útil para mostrar el detalle de una orden.

        Returns:
            dict: Datos del item con información del artículo
        """
        data = self.serialize()
        data["article"] = self.article.serialize_simple() if self.article else None
        return data


# =============================================================================
#                           RESUMEN DE RELACIONES
# =============================================================================
"""
DIAGRAMA DE RELACIONES:
=======================

    ┌─────────────┐         ┌──────────────┐
    │    User     │ 1 ─── 1 │  ProfileInfo │
    │             │         │              │
    │  - id       │◄────────│  - user_id   │
    │  - email    │         │  - first_name│
    │  - username │         │  - last_name │
    │  - password │         │  - phone     │
    │  - is_active│         │  - address   │
    └──────┬──────┘         └──────────────┘
           │
           │ 1
           │
           │ n
    ┌──────▼──────┐
    │   Order     │
    │             │         ┌──────────────┐         ┌──────────────┐
    │  - id       │         │   Article    │ n ─── n │     Tag      │
    │  - user_id  │         │              │         │              │
    │  - status   │         │  - id        │◄───────►│  - id        │
    │  - total    │         │  - name      │         │  - name      │
    └──────┬──────┘         │  - price     │         │  - color     │
           │                │  - stock     │         └──────────────┘
           │ 1              └──────▲───────┘               ▲
           │                       │ 1                     │
           │ n                     │                       │
    ┌──────▼──────┐                │ n           ┌────────┴────────┐
    │  OrderItem  │────────────────┘             │  article_tags   │
    │             │                              │  (tabla pivote) │
    │  - id       │                              │                 │
    │  - order_id │                              │  - article_id   │
    │  - article_id                              │  - tag_id       │
    │  - quantity │                              └─────────────────┘
    │  - unit_price
    │  - subtotal │
    └─────────────┘

TIPOS DE RELACIONES:
====================
- 1 a 1:      User ↔ ProfileInfo (Un usuario tiene un solo perfil)
- 1 a Muchos: User ↔ Order (Un usuario tiene muchas órdenes)
- 1 a Muchos: Order ↔ OrderItem (Una orden tiene muchos items)
- 1 a Muchos: Article ↔ OrderItem (Un artículo puede estar en muchos items)
- Muchos a Muchos: Order ↔ Article (A través de OrderItem - CON campos extras)
- Muchos a Muchos: Article ↔ Tag (A través de article_tags - SIN campos extras)

DOS FORMAS DE HACER MUCHOS A MUCHOS:
====================================

1. CON CLASE MODELO (OrderItem):
   - Usas cuando necesitas campos ADICIONALES (quantity, price, date, etc.)
   - Creas una clase completa con sus propios atributos
   - Tienes control total sobre la tabla intermedia

2. CON db.Table (article_tags):
   - Usas cuando SOLO necesitas conectar dos tablas
   - SQLAlchemy maneja la tabla automáticamente
   - Es más simple y requiere menos código
   - Se usa con el parámetro secondary= en relationship()

EJEMPLO DE USO:
===============
# Agregar una etiqueta a un artículo (muy fácil con secondary)
articulo = Article.query.get(1)
etiqueta = Tag.query.get(1)
articulo.tags.append(etiqueta)  # SQLAlchemy maneja article_tags automáticamente
db.session.commit()

# Quitar una etiqueta
articulo.tags.remove(etiqueta)
db.session.commit()

# Ver todos los artículos con una etiqueta
etiqueta = Tag.query.filter_by(name="Oferta").first()
print(etiqueta.articles)  # Lista de artículos con esa etiqueta
"""
