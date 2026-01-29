"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for
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
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

MIGRATE = Migrate(app, db)
db.init_app(app)
CORS(app)
setup_admin(app)

# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

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
    try:
        users = User.query.all()
        return jsonify([user.serialize() for user in users]), 200
    except Exception as error:
        return jsonify({"error": f"Error al obtener usuarios: {str(error)}"}), 500


# GET /users/<id> - Obtener un usuario por ID
@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    try:
        user = User.query.get(user_id)
        if user is None:
            return jsonify({"error": f"Usuario con id {user_id} no encontrado"}), 404
        return jsonify(user.serialize_with_profile()), 200
    except Exception as error:
        return jsonify({"error": f"Error al obtener usuario: {str(error)}"}), 500


# POST /users - Crear un nuevo usuario
@app.route('/users', methods=['POST'])
def create_user():
    try:
        body = request.get_json()

        if not body:
            return jsonify({"error": "El body no puede estar vacío"}), 400

        # Validar campos obligatorios
        required_fields = ["email", "username", "password"]
        for field in required_fields:
            if field not in body or not body[field]:
                return jsonify({"error": f"El campo '{field}' es obligatorio"}), 400

        # Verificar que no exista un usuario con ese email o username
        existing_email = User.query.filter_by(email=body["email"]).first()
        if existing_email:
            return jsonify({"error": "Ya existe un usuario con ese email"}), 409

        existing_username = User.query.filter_by(username=body["username"]).first()
        if existing_username:
            return jsonify({"error": "Ya existe un usuario con ese username"}), 409

        new_user = User(
            email=body["email"],
            username=body["username"],
            password=body["password"],
            is_active=body.get("is_active", True)
        )
        db.session.add(new_user)
        db.session.commit()

        return jsonify(new_user.serialize()), 201

    except Exception as error:
        db.session.rollback()
        return jsonify({"error": f"Error al crear usuario: {str(error)}"}), 500


# PUT /users/<id> - Editar un usuario
@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    try:
        user = User.query.get(user_id)
        if user is None:
            return jsonify({"error": f"Usuario con id {user_id} no encontrado"}), 404

        body = request.get_json()
        if not body:
            return jsonify({"error": "El body no puede estar vacío"}), 400

        # Verificar duplicados si se intenta cambiar email o username
        if "email" in body and body["email"] != user.email:
            existing = User.query.filter_by(email=body["email"]).first()
            if existing:
                return jsonify({"error": "Ya existe un usuario con ese email"}), 409
            user.email = body["email"]

        if "username" in body and body["username"] != user.username:
            existing = User.query.filter_by(username=body["username"]).first()
            if existing:
                return jsonify({"error": "Ya existe un usuario con ese username"}), 409
            user.username = body["username"]

        if "password" in body:
            user.password = body["password"]
        if "is_active" in body:
            user.is_active = body["is_active"]

        db.session.commit()
        return jsonify(user.serialize()), 200

    except Exception as error:
        db.session.rollback()
        return jsonify({"error": f"Error al actualizar usuario: {str(error)}"}), 500


# DELETE /users/<id> - Eliminar un usuario
@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        user = User.query.get(user_id)
        if user is None:
            return jsonify({"error": f"Usuario con id {user_id} no encontrado"}), 404

        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": f"Usuario '{user.username}' eliminado correctamente"}), 200

    except Exception as error:
        db.session.rollback()
        return jsonify({"error": f"Error al eliminar usuario: {str(error)}"}), 500


# =============================================================================
#                          ENDPOINTS DE ARTICLES
# =============================================================================

# GET /articles - Obtener todos los artículos
@app.route('/articles', methods=['GET'])
def get_articles():
    try:
        articles = Article.query.all()
        return jsonify([article.serialize() for article in articles]), 200
    except Exception as error:
        return jsonify({"error": f"Error al obtener artículos: {str(error)}"}), 500


# GET /articles/<id> - Obtener un artículo por ID
@app.route('/articles/<int:article_id>', methods=['GET'])
def get_article(article_id):
    try:
        article = Article.query.get(article_id)
        if article is None:
            return jsonify({"error": f"Artículo con id {article_id} no encontrado"}), 404
        return jsonify(article.serialize_with_tags()), 200
    except Exception as error:
        return jsonify({"error": f"Error al obtener artículo: {str(error)}"}), 500


# POST /articles - Crear un nuevo artículo
@app.route('/articles', methods=['POST'])
def create_article():
    try:
        body = request.get_json()

        if not body:
            return jsonify({"error": "El body no puede estar vacío"}), 400

        if "name" not in body or not body["name"]:
            return jsonify({"error": "El campo 'name' es obligatorio"}), 400

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

        db.session.add(new_article)
        db.session.commit()

        return jsonify(new_article.serialize_with_tags()), 201

    except Exception as error:
        db.session.rollback()
        return jsonify({"error": f"Error al crear artículo: {str(error)}"}), 500


# PUT /articles/<id> - Editar un artículo
@app.route('/articles/<int:article_id>', methods=['PUT'])
def update_article(article_id):
    try:
        article = Article.query.get(article_id)
        if article is None:
            return jsonify({"error": f"Artículo con id {article_id} no encontrado"}), 404

        body = request.get_json()
        if not body:
            return jsonify({"error": "El body no puede estar vacío"}), 400

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

        db.session.commit()
        return jsonify(article.serialize_with_tags()), 200

    except Exception as error:
        db.session.rollback()
        return jsonify({"error": f"Error al actualizar artículo: {str(error)}"}), 500


# DELETE /articles/<id> - Eliminar un artículo
@app.route('/articles/<int:article_id>', methods=['DELETE'])
def delete_article(article_id):
    try:
        article = Article.query.get(article_id)
        if article is None:
            return jsonify({"error": f"Artículo con id {article_id} no encontrado"}), 404

        db.session.delete(article)
        db.session.commit()
        return jsonify({"message": f"Artículo '{article.name}' eliminado correctamente"}), 200

    except Exception as error:
        db.session.rollback()
        return jsonify({"error": f"Error al eliminar artículo: {str(error)}"}), 500


# =============================================================================
#                          ENDPOINTS DE ORDERS
# =============================================================================

# GET /orders - Obtener todas las órdenes
@app.route('/orders', methods=['GET'])
def get_orders():
    try:
        orders = Order.query.all()
        return jsonify([order.serialize() for order in orders]), 200
    except Exception as error:
        return jsonify({"error": f"Error al obtener órdenes: {str(error)}"}), 500


# GET /orders/<id> - Obtener una orden por ID (con sus items)
@app.route('/orders/<int:order_id>', methods=['GET'])
def get_order(order_id):
    try:
        order = Order.query.get(order_id)
        if order is None:
            return jsonify({"error": f"Orden con id {order_id} no encontrada"}), 404
        return jsonify(order.serialize_with_items()), 200
    except Exception as error:
        return jsonify({"error": f"Error al obtener orden: {str(error)}"}), 500


# POST /orders - Crear una nueva orden
@app.route('/orders', methods=['POST'])
def create_order():
    try:
        body = request.get_json()

        if not body:
            return jsonify({"error": "El body no puede estar vacío"}), 400

        if "user_id" not in body:
            return jsonify({"error": "El campo 'user_id' es obligatorio"}), 400

        # Verificar que el usuario existe
        user = User.query.get(body["user_id"])
        if user is None:
            return jsonify({"error": f"Usuario con id {body['user_id']} no encontrado"}), 404

        new_order = Order(
            user_id=body["user_id"],
            shipping_address=body.get("shipping_address")
        )

        # Si se envían items, crearlos y asociarlos a la orden
        if "items" in body and isinstance(body["items"], list):
            for item_data in body["items"]:
                if "article_id" not in item_data or "quantity" not in item_data:
                    return jsonify({"error": "Cada item necesita 'article_id' y 'quantity'"}), 400

                article = Article.query.get(item_data["article_id"])
                if article is None:
                    return jsonify({"error": f"Artículo con id {item_data['article_id']} no encontrado"}), 404

                if not article.is_available:
                    return jsonify({"error": f"El artículo '{article.name}' no está disponible"}), 400

                if article.stock < item_data["quantity"]:
                    return jsonify({"error": f"Stock insuficiente para '{article.name}'. Disponible: {article.stock}"}), 400

                order_item = OrderItem(
                    article_id=article.id,
                    quantity=item_data["quantity"],
                    unit_price=article.price
                )
                order_item.calculate_subtotal()
                new_order.items.append(order_item)

        db.session.add(new_order)
        db.session.flush()  # Para que los items tengan sus subtotales calculados
        new_order.calculate_total()
        db.session.commit()

        return jsonify(new_order.serialize_with_items()), 201

    except Exception as error:
        db.session.rollback()
        return jsonify({"error": f"Error al crear orden: {str(error)}"}), 500


# PUT /orders/<id> - Actualizar estado de una orden
@app.route('/orders/<int:order_id>', methods=['PUT'])
def update_order(order_id):
    try:
        order = Order.query.get(order_id)
        if order is None:
            return jsonify({"error": f"Orden con id {order_id} no encontrada"}), 404

        body = request.get_json()
        if not body:
            return jsonify({"error": "El body no puede estar vacío"}), 400

        valid_statuses = ["pending", "paid", "shipped", "delivered", "cancelled"]

        if "status" in body:
            if body["status"] not in valid_statuses:
                return jsonify({
                    "error": f"Estado inválido. Los estados válidos son: {', '.join(valid_statuses)}"
                }), 400
            order.status = body["status"]

        if "shipping_address" in body:
            order.shipping_address = body["shipping_address"]

        db.session.commit()
        return jsonify(order.serialize()), 200

    except Exception as error:
        db.session.rollback()
        return jsonify({"error": f"Error al actualizar orden: {str(error)}"}), 500


# DELETE /orders/<id> - Eliminar una orden
@app.route('/orders/<int:order_id>', methods=['DELETE'])
def delete_order(order_id):
    try:
        order = Order.query.get(order_id)
        if order is None:
            return jsonify({"error": f"Orden con id {order_id} no encontrada"}), 404

        db.session.delete(order)
        db.session.commit()
        return jsonify({"message": f"Orden #{order_id} eliminada correctamente"}), 200

    except Exception as error:
        db.session.rollback()
        return jsonify({"error": f"Error al eliminar orden: {str(error)}"}), 500


# =============================================================================
#                          ENDPOINTS DE TAGS
# =============================================================================

# GET /tags - Obtener todos los tags
@app.route('/tags', methods=['GET'])
def get_tags():
    try:
        tags = Tag.query.all()
        return jsonify([tag.serialize() for tag in tags]), 200
    except Exception as error:
        return jsonify({"error": f"Error al obtener tags: {str(error)}"}), 500


# GET /tags/<id> - Obtener un tag por ID (con sus artículos)
@app.route('/tags/<int:tag_id>', methods=['GET'])
def get_tag(tag_id):
    try:
        tag = Tag.query.get(tag_id)
        if tag is None:
            return jsonify({"error": f"Tag con id {tag_id} no encontrado"}), 404
        return jsonify(tag.serialize_with_articles()), 200
    except Exception as error:
        return jsonify({"error": f"Error al obtener tag: {str(error)}"}), 500


# POST /tags - Crear un nuevo tag
@app.route('/tags', methods=['POST'])
def create_tag():
    try:
        body = request.get_json()

        if not body:
            return jsonify({"error": "El body no puede estar vacío"}), 400

        if "name" not in body or not body["name"]:
            return jsonify({"error": "El campo 'name' es obligatorio"}), 400

        # Verificar que no exista un tag con ese nombre
        existing = Tag.query.filter_by(name=body["name"]).first()
        if existing:
            return jsonify({"error": f"Ya existe un tag con el nombre '{body['name']}'"}), 409

        new_tag = Tag(
            name=body["name"],
            color=body.get("color", "#3498db")
        )
        db.session.add(new_tag)
        db.session.commit()

        return jsonify(new_tag.serialize()), 201

    except Exception as error:
        db.session.rollback()
        return jsonify({"error": f"Error al crear tag: {str(error)}"}), 500


# PUT /tags/<id> - Editar un tag
@app.route('/tags/<int:tag_id>', methods=['PUT'])
def update_tag(tag_id):
    try:
        tag = Tag.query.get(tag_id)
        if tag is None:
            return jsonify({"error": f"Tag con id {tag_id} no encontrado"}), 404

        body = request.get_json()
        if not body:
            return jsonify({"error": "El body no puede estar vacío"}), 400

        if "name" in body:
            # Verificar que no exista otro tag con ese nombre
            existing = Tag.query.filter_by(name=body["name"]).first()
            if existing and existing.id != tag.id:
                return jsonify({"error": f"Ya existe un tag con el nombre '{body['name']}'"}), 409
            tag.name = body["name"]

        if "color" in body:
            tag.color = body["color"]

        db.session.commit()
        return jsonify(tag.serialize()), 200

    except Exception as error:
        db.session.rollback()
        return jsonify({"error": f"Error al actualizar tag: {str(error)}"}), 500


# DELETE /tags/<id> - Eliminar un tag
@app.route('/tags/<int:tag_id>', methods=['DELETE'])
def delete_tag(tag_id):
    try:
        tag = Tag.query.get(tag_id)
        if tag is None:
            return jsonify({"error": f"Tag con id {tag_id} no encontrado"}), 404

        db.session.delete(tag)
        db.session.commit()
        return jsonify({"message": f"Tag '{tag.name}' eliminado correctamente"}), 200

    except Exception as error:
        db.session.rollback()
        return jsonify({"error": f"Error al eliminar tag: {str(error)}"}), 500


# this only runs if `$ python src/app.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3000))
    app.run(host='0.0.0.0', port=PORT, debug=False)
