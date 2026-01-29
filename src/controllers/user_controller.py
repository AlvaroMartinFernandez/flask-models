"""
Controlador de usuarios - Endpoints /users
"""

from flask import Blueprint, request, jsonify
from services.user_service import UserService

user_bp = Blueprint('users', __name__)


# GET /users - Obtener todos los usuarios
@user_bp.route('/users', methods=['GET'])
def get_users():
    try:
        users = UserService.get_all()
        return jsonify(users), 200
    except Exception as error:
        return jsonify({"error": f"Error al obtener usuarios: {str(error)}"}), 500


# GET /users/<id> - Obtener un usuario por ID
@user_bp.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    try:
        user = UserService.get_by_id(user_id)
        return jsonify(user), 200
    except ValueError as error:
        return jsonify({"error": str(error)}), 404
    except Exception as error:
        return jsonify({"error": f"Error al obtener usuario: {str(error)}"}), 500


# POST /users - Crear un nuevo usuario
@user_bp.route('/users', methods=['POST'])
def create_user():
    try:
        body = request.get_json()
        if not body:
            return jsonify({"error": "El body no puede estar vacío"}), 400

        user = UserService.create(body)
        return jsonify(user), 201
    except ValueError as error:
        return jsonify({"error": str(error)}), 400
    except Exception as error:
        return jsonify({"error": f"Error al crear usuario: {str(error)}"}), 500


# PUT /users/<id> - Editar un usuario
@user_bp.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    try:
        body = request.get_json()
        if not body:
            return jsonify({"error": "El body no puede estar vacío"}), 400

        user = UserService.update(user_id, body)
        return jsonify(user), 200
    except ValueError as error:
        return jsonify({"error": str(error)}), 400
    except Exception as error:
        return jsonify({"error": f"Error al actualizar usuario: {str(error)}"}), 500


# DELETE /users/<id> - Eliminar un usuario
@user_bp.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        result = UserService.delete(user_id)
        return jsonify(result), 200
    except ValueError as error:
        return jsonify({"error": str(error)}), 404
    except Exception as error:
        return jsonify({"error": f"Error al eliminar usuario: {str(error)}"}), 500
