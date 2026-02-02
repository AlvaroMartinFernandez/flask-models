// Snippets de codigo para el video educativo de SQLAlchemy Models
// Basado en los ejemplos de summaries/SQL-Alchemy-models.md

export const codeSnippets = {
  // ============================================
  // ACTO 1: Fundamentos - ORM y SQLAlchemy
  // ============================================

  // Comparacion sin ORM vs con ORM
  sinOrm: `# Sin ORM - SQL directo
import sqlite3
conn = sqlite3.connect('database.db')
cursor = conn.cursor()

cursor.execute("""
    INSERT INTO users (name, email)
    VALUES ('Ana', 'ana@email.com')
""")

cursor.execute("SELECT * FROM users WHERE id = 1")
user = cursor.fetchone()`,

  conOrm: `# Con ORM - Objetos Python
from models import db, User

# Crear usuario
new_user = User(name="Ana", email="ana@email.com")
db.session.add(new_user)
db.session.commit()

# Consultar usuario
user = User.query.get(1)
print(user.name)  # Ana`,

  // Instalacion
  instalacion: `# Instalar Flask-SQLAlchemy
pip install flask-sqlalchemy

# Instalar Flask-Migrate (migraciones)
pip install flask-migrate`,

  // Inicializacion en models.py
  modelsInit: `# models.py
from flask_sqlalchemy import SQLAlchemy

# Crear instancia de SQLAlchemy
db = SQLAlchemy()`,

  // Configuracion en app.py
  appConfig: `# app.py
import os
from flask import Flask
from models import db

app = Flask(__name__)

# Configurar URL de base de datos
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
    'DATABASE_URL',
    'sqlite:///database.db'  # SQLite por defecto
)

# Inicializar SQLAlchemy con la app
db.init_app(app)`,

  // Configurar migraciones
  migrateConfig: `# app.py (continuacion)
from flask_migrate import Migrate

migrate = Migrate(app, db)

# Comandos de migracion:
# flask db init      - Inicializar migraciones
# flask db migrate   - Crear migracion
# flask db upgrade   - Aplicar migracion`,

  // ============================================
  // ACTO 2: Modelos y Columnas
  // ============================================

  // Modelo basico con sintaxis moderna
  modeloBasico: `from sqlalchemy.orm import Mapped, mapped_column
from models import db

class User(db.Model):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(
        db.String(120),
        unique=True,
        nullable=False
    )
    name: Mapped[str] = mapped_column(db.String(80))
    is_active: Mapped[bool] = mapped_column(default=True)`,

  // Tipos de columnas
  tiposColumnas: `# Tipos de columnas SQLAlchemy

# Numeros
id: Mapped[int] = mapped_column(db.Integer)
price: Mapped[float] = mapped_column(db.Float)

# Texto
name: Mapped[str] = mapped_column(db.String(80))
bio: Mapped[str] = mapped_column(db.Text)

# Booleanos
is_active: Mapped[bool] = mapped_column(db.Boolean)

# Fechas
created_at: Mapped[datetime] = mapped_column(db.DateTime)
birth_date: Mapped[date] = mapped_column(db.Date)`,

  // Opciones de columnas
  opcionesColumnas: `# Opciones de mapped_column()

# Clave primaria
id: Mapped[int] = mapped_column(primary_key=True)

# Valor unico (no puede repetirse)
email: Mapped[str] = mapped_column(unique=True)

# Campo obligatorio
name: Mapped[str] = mapped_column(nullable=False)

# Valor por defecto
is_active: Mapped[bool] = mapped_column(default=True)

# Crear indice para busquedas rapidas
email: Mapped[str] = mapped_column(index=True)`,

  // ============================================
  // ACTO 3: Relaciones
  // ============================================

  // Relacion 1 a 1
  relacionUnoAUno: `# Relacion 1:1 - User tiene UN ProfileInfo
class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    profile: Mapped["ProfileInfo"] = relationship(
        "ProfileInfo", back_populates="user", uselist=False)

class ProfileInfo(db.Model):
    user_id: Mapped[int] = mapped_column(
        ForeignKey('users.id'), unique=True)
    user: Mapped["User"] = relationship(
        "User", back_populates="profile")`,

  // Relacion 1 a muchos
  relacionUnoAMuchos: `# Relacion 1:N - User tiene MUCHAS Orders
class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    orders: Mapped[list["Order"]] = relationship(
        "Order", back_populates="user", cascade="all, delete-orphan")

class Order(db.Model):
    user_id: Mapped[int] = mapped_column(
        ForeignKey('users.id', ondelete='CASCADE'))
    user: Mapped["User"] = relationship(
        "User", back_populates="orders")`,

  // Relacion muchos a muchos con db.Table
  relacionMuchosTable: `# Relacion N:N con db.Table
article_tags = db.Table('article_tags',
    db.Column('article_id', db.Integer, db.ForeignKey('articles.id'), primary_key=True),
    db.Column('tag_id', db.Integer, db.ForeignKey('tags.id'), primary_key=True))

class Article(db.Model):
    tags: Mapped[list["Tag"]] = relationship(
        "Tag", secondary=article_tags, back_populates="articles")

class Tag(db.Model):
    articles: Mapped[list["Article"]] = relationship(
        "Article", secondary=article_tags, back_populates="tags")`,

  // Relacion muchos a muchos con clase
  relacionMuchosClase: `# Relacion N:N con clase (campos adicionales)
class Order(db.Model):
    items: Mapped[list["OrderItem"]] = relationship(
        "OrderItem", back_populates="order")

class Article(db.Model):
    order_items: Mapped[list["OrderItem"]] = relationship(
        "OrderItem", back_populates="article")

class OrderItem(db.Model):
    order_id: Mapped[int] = mapped_column(ForeignKey('orders.id'))
    article_id: Mapped[int] = mapped_column(ForeignKey('articles.id'))
    quantity: Mapped[int] = mapped_column(default=1)
    unit_price: Mapped[float] = mapped_column(db.Float)
    subtotal: Mapped[float] = mapped_column(db.Float)
    order: Mapped["Order"] = relationship("Order", back_populates="items")
    article: Mapped["Article"] = relationship("Article", back_populates="order_items")`,

  // ON DELETE opciones
  onDeleteOpciones: `# Opciones de ON DELETE

# CASCADE - Elimina hijos automaticamente
user_id: Mapped[int] = mapped_column(
    ForeignKey('users.id', ondelete='CASCADE')
)

# SET NULL - Pone NULL en la FK
user_id: Mapped[int] = mapped_column(
    ForeignKey('users.id', ondelete='SET NULL'),
    nullable=True
)

# RESTRICT - Impide eliminar si hay hijos
user_id: Mapped[int] = mapped_column(
    ForeignKey('users.id', ondelete='RESTRICT')
)`,

  // ============================================
  // ACTO 4: Serializacion
  // ============================================

  // Metodo __repr__
  metodoRepr: `class User(db.Model):
    # ... columnas ...

    def __repr__(self):
        """Representacion para debugging"""
        return f'<User {self.id}: {self.email}>'

# Uso:
user = User.query.get(1)
print(user)  # <User 1: ana@email.com>`,

  // Metodo serialize basico
  serializeBasico: `class User(db.Model):
    def serialize(self):
        """Convierte objeto a diccionario"""
        return {
            'id': self.id,
            'email': self.email,
            'name': self.name,
            # NUNCA incluir password!
        }

# En el endpoint:
@app.route('/users/<int:id>')
def get_user(id):
    user = User.query.get_or_404(id)
    return jsonify(user.serialize())`,

  // Serialize con relaciones
  serializeRelaciones: `class User(db.Model):
    def serialize(self):
        return {'id': self.id, 'email': self.email, 'name': self.name}

    def serialize_with_profile(self):
        """Incluye perfil (1:1)"""
        data = self.serialize()
        data['profile'] = self.profile.serialize() if self.profile else None
        return data

    def serialize_with_orders(self):
        """Incluye ordenes (1:N)"""
        data = self.serialize()
        data['orders'] = [o.serialize() for o in self.orders]
        return data`,

  // Ejemplo completo endpoint
  endpointCompleto: `@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([u.serialize() for u in users])

@app.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get_or_404(id)
    return jsonify(user.serialize_with_orders())

@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    user = User(
        email=data['email'],
        name=data['name']
    )
    db.session.add(user)
    db.session.commit()
    return jsonify(user.serialize()), 201`,

  // Resumen conceptos clave
  resumenConceptos: `# Resumen SQLAlchemy Models

# 1. Inicializar
db = SQLAlchemy()
db.init_app(app)

# 2. Crear modelo
class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)

# 3. Relaciones
# 1:1 -> uselist=False, unique FK
# 1:N -> lista + FK normal
# N:N -> db.Table o clase modelo

# 4. Serializar
def serialize(self):
    return {'id': self.id, ...}`,
};
