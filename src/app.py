"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, abort
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from utils import APIException, generate_sitemap
from admin import setup_admin
from models import db, User, ProfileInfo, Article, Order, OrderItem, Tag

app = Flask(__name__)
app.url_map.strict_slashes = False

db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    if os.name == 'nt':  # Windows
        db_path = os.path.join(os.path.dirname(__file__), '..', 'instance', 'test.db')
        os.makedirs(os.path.dirname(os.path.abspath(db_path)), exist_ok=True)
        app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///" + os.path.abspath(db_path)
    else:  # Unix/Linux/Codespaces
        app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

MIGRATE = Migrate(app, db)
db.init_app(app)
CORS(app)
setup_admin(app)

# generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    return generate_sitemap(app)

# =============================================================================
#                          ENDPOINTS DE USERS
# =============================================================================

# GET /users - Obtener todos los usuarios
@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.serialize() for user in users]), 200


# GET /users/<id> - Obtener un usuario por ID
@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if user is None:
        abort(404, description=f"Usuario con id {user_id} no encontrado")
    return jsonify(user.serialize_with_profile()), 200


# POST /users - Crear un nuevo usuario
@app.route('/users', methods=['POST'])
def create_user():
    body = request.get_json()

    if not body:
        abort(400, description="El body no puede estar vacío")

    # Validar campos obligatorios
    required_fields = ["email", "username", "password"]
    for field in required_fields:
        if field not in body or not body[field]:
            abort(400, description=f"El campo '{field}' es obligatorio")

    # Verificar que no exista un usuario con ese email o username
    existing_email = User.query.filter_by(email=body["email"]).first()
    if existing_email:
        abort(409, description="Ya existe un usuario con ese email")

    existing_username = User.query.filter_by(username=body["username"]).first()
    if existing_username:
        abort(409, description="Ya existe un usuario con ese username")

    try:
        new_user = User(
            email=body["email"],
            username=body["username"],
            password=body["password"],
            is_active=body.get("is_active", True)
        )
        db.session.add(new_user)
        db.session.commit()
    except Exception:
        db.session.rollback()
        abort(500, description="Error al crear usuario")

    return jsonify(new_user.serialize()), 201


# PUT /users/<id> - Editar un usuario
@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get(user_id)
    if user is None:
        abort(404, description=f"Usuario con id {user_id} no encontrado")

    body = request.get_json()
    if not body:
        abort(400, description="El body no puede estar vacío")

    # Verificar duplicados si se intenta cambiar email o username
    if "email" in body and body["email"] != user.email:
        existing = User.query.filter_by(email=body["email"]).first()
        if existing:
            abort(409, description="Ya existe un usuario con ese email")
        user.email = body["email"]

    if "username" in body and body["username"] != user.username:
        existing = User.query.filter_by(username=body["username"]).first()
        if existing:
            abort(409, description="Ya existe un usuario con ese username")
        user.username = body["username"]

    if "password" in body:
        user.password = body["password"]
    if "is_active" in body:
        user.is_active = body["is_active"]

    try:
        db.session.commit()
    except Exception:
        db.session.rollback()
        abort(500, description="Error al actualizar usuario")

    return jsonify(user.serialize()), 200


# DELETE /users/<id> - Eliminar un usuario
@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if user is None:
        abort(404, description=f"Usuario con id {user_id} no encontrado")

    try:
        db.session.delete(user)
        db.session.commit()
    except Exception:
        db.session.rollback()
        abort(500, description="Error al eliminar usuario")

    return jsonify({"message": f"Usuario '{user.username}' eliminado correctamente"}), 200


# POST /users/with-profile - Crear usuario con su perfil
@app.route('/users/with-profile', methods=['POST'])
def create_user_with_profile():
    body = request.get_json()

    if not body:
        abort(400, description="El body no puede estar vacío")

    # Validar campos obligatorios del usuario
    required_fields = ["email", "username", "password"]
    for field in required_fields:
        if field not in body or not body[field]:
            abort(400, description=f"El campo '{field}' es obligatorio")

    # Verificar duplicados
    if User.query.filter_by(email=body["email"]).first():
        abort(409, description="Ya existe un usuario con ese email")
    if User.query.filter_by(username=body["username"]).first():
        abort(409, description="Ya existe un usuario con ese username")

    try:
        new_user = User(
            email=body["email"],
            username=body["username"],
            password=body["password"],
            is_active=body.get("is_active", True)
        )

        # Crear el perfil asociado
        profile_data = body.get("profile", {})
        new_profile = ProfileInfo(
            first_name=profile_data.get("first_name"),
            last_name=profile_data.get("last_name"),
            phone=profile_data.get("phone"),
            address=profile_data.get("address"),
            bio=profile_data.get("bio"),
            avatar_url=profile_data.get("avatar_url")
        )
        new_user.profile = new_profile

        db.session.add(new_user)
        db.session.commit()
    except Exception:
        db.session.rollback()
        abort(500, description="Error al crear usuario con perfil")

    return jsonify(new_user.serialize_with_profile()), 201


# GET /users/<id>/orders - Obtener un usuario con sus órdenes
@app.route('/users/<int:user_id>/orders', methods=['GET'])
def get_user_orders(user_id):
    user = User.query.get(user_id)
    if user is None:
        abort(404, description=f"Usuario con id {user_id} no encontrado")
    return jsonify(user.serialize_with_orders()), 200


# =============================================================================
#                          ENDPOINTS DE ARTICLES
# =============================================================================

# GET /articles - Obtener todos los artículos
@app.route('/articles', methods=['GET'])
def get_articles():
    articles = Article.query.all()
    return jsonify([article.serialize() for article in articles]), 200


# GET /articles/<id> - Obtener un artículo por ID
@app.route('/articles/<int:article_id>', methods=['GET'])
def get_article(article_id):
    article = Article.query.get(article_id)
    if article is None:
        abort(404, description=f"Artículo con id {article_id} no encontrado")
    return jsonify(article.serialize_with_tags()), 200


# POST /articles - Crear un nuevo artículo
@app.route('/articles', methods=['POST'])
def create_article():
    body = request.get_json()

    if not body:
        abort(400, description="El body no puede estar vacío")

    if "name" not in body or not body["name"]:
        abort(400, description="El campo 'name' es obligatorio")

    new_article = Article(
        name=body["name"],
        description=body.get("description"),
        price=body.get("price", 0.0),
        stock=body.get("stock", 0),
        image_url=body.get("image_url"),
        is_available=body.get("is_available", True)
    )

    # Si se envían tags, asociarlos al artículo
    if "tag_ids" in body and isinstance(body["tag_ids"], list):
        for tag_id in body["tag_ids"]:
            tag = Tag.query.get(tag_id)
            if tag:
                new_article.tags.append(tag)

    try:
        db.session.add(new_article)
        db.session.commit()
    except Exception:
        db.session.rollback()
        abort(500, description="Error al crear artículo")

    return jsonify(new_article.serialize_with_tags()), 201


# PUT /articles/<id> - Editar un artículo
@app.route('/articles/<int:article_id>', methods=['PUT'])
def update_article(article_id):
    article = Article.query.get(article_id)
    if article is None:
        abort(404, description=f"Artículo con id {article_id} no encontrado")

    body = request.get_json()
    if not body:
        abort(400, description="El body no puede estar vacío")

    if "name" in body:
        article.name = body["name"]
    if "description" in body:
        article.description = body["description"]
    if "price" in body:
        article.price = body["price"]
    if "stock" in body:
        article.stock = body["stock"]
    if "image_url" in body:
        article.image_url = body["image_url"]
    if "is_available" in body:
        article.is_available = body["is_available"]

    # Si se envían tag_ids, reemplazar los tags del artículo
    if "tag_ids" in body and isinstance(body["tag_ids"], list):
        article.tags.clear()
        for tag_id in body["tag_ids"]:
            tag = Tag.query.get(tag_id)
            if tag:
                article.tags.append(tag)

    try:
        db.session.commit()
    except Exception:
        db.session.rollback()
        abort(500, description="Error al actualizar artículo")

    return jsonify(article.serialize_with_tags()), 200


# DELETE /articles/<id> - Eliminar un artículo
@app.route('/articles/<int:article_id>', methods=['DELETE'])
def delete_article(article_id):
    article = Article.query.get(article_id)
    if article is None:
        abort(404, description=f"Artículo con id {article_id} no encontrado")

    try:
        db.session.delete(article)
        db.session.commit()
    except Exception:
        db.session.rollback()
        abort(500, description="Error al eliminar artículo")

    return jsonify({"message": f"Artículo '{article.name}' eliminado correctamente"}), 200


# =============================================================================
#                          ENDPOINTS DE ORDERS
# =============================================================================

# GET /orders - Obtener todas las órdenes
@app.route('/orders', methods=['GET'])
def get_orders():
    orders = Order.query.all()
    return jsonify([order.serialize() for order in orders]), 200


# GET /orders/<id> - Obtener una orden por ID (con sus items)
@app.route('/orders/<int:order_id>', methods=['GET'])
def get_order(order_id):
    order = Order.query.get(order_id)
    if order is None:
        abort(404, description=f"Orden con id {order_id} no encontrada")
    return jsonify(order.serialize_with_items()), 200


# POST /orders - Crear una nueva orden
@app.route('/orders', methods=['POST'])
def create_order():
    body = request.get_json()

    if not body:
        abort(400, description="El body no puede estar vacío")

    if "user_id" not in body:
        abort(400, description="El campo 'user_id' es obligatorio")

    # Verificar que el usuario existe
    user = User.query.get(body["user_id"])
    if user is None:
        abort(404, description=f"Usuario con id {body['user_id']} no encontrado")

    new_order = Order(
        user_id=body["user_id"],
        shipping_address=body.get("shipping_address")
    )

    # Si se envían items, crearlos y asociarlos a la orden
    if "items" in body and isinstance(body["items"], list):
        for item_data in body["items"]:
            if "article_id" not in item_data or "quantity" not in item_data:
                abort(400, description="Cada item necesita 'article_id' y 'quantity'")

            article = Article.query.get(item_data["article_id"])
            if article is None:
                abort(404, description=f"Artículo con id {item_data['article_id']} no encontrado")

            if not article.is_available:
                abort(400, description=f"El artículo '{article.name}' no está disponible")

            if article.stock < item_data["quantity"]:
                abort(400, description=f"Stock insuficiente para '{article.name}'. Disponible: {article.stock}")

            order_item = OrderItem(
                article_id=article.id,
                quantity=item_data["quantity"],
                unit_price=article.price
            )
            order_item.calculate_subtotal()
            new_order.items.append(order_item)

    try:
        db.session.add(new_order)
        db.session.flush()
        new_order.calculate_total()
        db.session.commit()
    except Exception:
        db.session.rollback()
        abort(500, description="Error al crear orden")

    return jsonify(new_order.serialize_with_items()), 201


# PUT /orders/<id> - Actualizar estado de una orden
@app.route('/orders/<int:order_id>', methods=['PUT'])
def update_order(order_id):
    order = Order.query.get(order_id)
    if order is None:
        abort(404, description=f"Orden con id {order_id} no encontrada")

    body = request.get_json()
    if not body:
        abort(400, description="El body no puede estar vacío")

    valid_statuses = ["pending", "paid", "shipped", "delivered", "cancelled"]

    if "status" in body:
        if body["status"] not in valid_statuses:
            abort(400, description=f"Estado inválido. Los estados válidos son: {', '.join(valid_statuses)}")
        order.status = body["status"]

    if "shipping_address" in body:
        order.shipping_address = body["shipping_address"]

    try:
        db.session.commit()
    except Exception:
        db.session.rollback()
        abort(500, description="Error al actualizar orden")

    return jsonify(order.serialize()), 200


# DELETE /orders/<id> - Eliminar una orden
@app.route('/orders/<int:order_id>', methods=['DELETE'])
def delete_order(order_id):
    order = Order.query.get(order_id)
    if order is None:
        abort(404, description=f"Orden con id {order_id} no encontrada")

    try:
        db.session.delete(order)
        db.session.commit()
    except Exception:
        db.session.rollback()
        abort(500, description="Error al eliminar orden")

    return jsonify({"message": f"Orden #{order_id} eliminada correctamente"}), 200


# =============================================================================
#                          ENDPOINTS DE TAGS
# =============================================================================

# GET /tags - Obtener todos los tags
@app.route('/tags', methods=['GET'])
def get_tags():
    tags = Tag.query.all()
    return jsonify([tag.serialize() for tag in tags]), 200


# GET /tags/<id> - Obtener un tag por ID (con sus artículos)
@app.route('/tags/<int:tag_id>', methods=['GET'])
def get_tag(tag_id):
    tag = Tag.query.get(tag_id)
    if tag is None:
        abort(404, description=f"Tag con id {tag_id} no encontrado")
    return jsonify(tag.serialize_with_articles()), 200


# POST /tags - Crear un nuevo tag
@app.route('/tags', methods=['POST'])
def create_tag():
    body = request.get_json()

    if not body:
        abort(400, description="El body no puede estar vacío")

    if "name" not in body or not body["name"]:
        abort(400, description="El campo 'name' es obligatorio")

    # Verificar que no exista un tag con ese nombre
    existing = Tag.query.filter_by(name=body["name"]).first()
    if existing:
        abort(409, description=f"Ya existe un tag con el nombre '{body['name']}'")

    try:
        new_tag = Tag(
            name=body["name"],
            color=body.get("color", "#3498db")
        )
        db.session.add(new_tag)
        db.session.commit()
    except Exception:
        db.session.rollback()
        abort(500, description="Error al crear tag")

    return jsonify(new_tag.serialize()), 201


# PUT /tags/<id> - Editar un tag
@app.route('/tags/<int:tag_id>', methods=['PUT'])
def update_tag(tag_id):
    tag = Tag.query.get(tag_id)
    if tag is None:
        abort(404, description=f"Tag con id {tag_id} no encontrado")

    body = request.get_json()
    if not body:
        abort(400, description="El body no puede estar vacío")

    if "name" in body:
        # Verificar que no exista otro tag con ese nombre
        existing = Tag.query.filter_by(name=body["name"]).first()
        if existing and existing.id != tag.id:
            abort(409, description=f"Ya existe un tag con el nombre '{body['name']}'")
        tag.name = body["name"]

    if "color" in body:
        tag.color = body["color"]

    try:
        db.session.commit()
    except Exception:
        db.session.rollback()
        abort(500, description="Error al actualizar tag")

    return jsonify(tag.serialize()), 200


# DELETE /tags/<id> - Eliminar un tag
@app.route('/tags/<int:tag_id>', methods=['DELETE'])
def delete_tag(tag_id):
    tag = Tag.query.get(tag_id)
    if tag is None:
        abort(404, description=f"Tag con id {tag_id} no encontrado")

    try:
        db.session.delete(tag)
        db.session.commit()
    except Exception:
        db.session.rollback()
        abort(500, description="Error al eliminar tag")

    return jsonify({"message": f"Tag '{tag.name}' eliminado correctamente"}), 200


# this only runs if `$ python src/app.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3000))
    app.run(host='0.0.0.0', port=PORT, debug=False)
