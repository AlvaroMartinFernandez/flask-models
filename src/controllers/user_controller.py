"""
Controlador de usuarios - Endpoints /users
"""

from flask import Blueprint, request, jsonify, abort
from services.user_service import UserService

user_bp = Blueprint('users', __name__)


# GET /users - Obtener todos los usuarios
@user_bp.route('/users', methods=['GET'])
def get_users():
    users = UserService.get_all()
    return jsonify(users), 200


# GET /users/<id> - Obtener un usuario por ID
@user_bp.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = UserService.get_by_id(user_id)
    return jsonify(user), 200


# POST /users - Crear un nuevo usuario
@user_bp.route('/users', methods=['POST'])
def create_user():
    body = request.get_json()
    if not body:
        abort(400, description="El body no puede estar vacío")

    user = UserService.create(body)
    return jsonify(user), 201


# PUT /users/<id> - Editar un usuario
@user_bp.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    body = request.get_json()
    if not body:
        abort(400, description="El body no puede estar vacío")

    user = UserService.update(user_id, body)
    return jsonify(user), 200


# DELETE /users/<id> - Eliminar un usuario
@user_bp.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    result = UserService.delete(user_id)
    return jsonify(result), 200


# POST /users/with-profile - Crear usuario con su perfil
@user_bp.route('/users/with-profile', methods=['POST'])
def create_user_with_profile():
    body = request.get_json()
    if not body:
        abort(400, description="El body no puede estar vacío")

    user = UserService.create_with_profile(body)
    return jsonify(user), 201


# GET /users/<id>/orders - Obtener un usuario con sus órdenes
@user_bp.route('/users/<int:user_id>/orders', methods=['GET'])
def get_user_orders(user_id):
    user = UserService.get_with_orders(user_id)
    return jsonify(user), 200
