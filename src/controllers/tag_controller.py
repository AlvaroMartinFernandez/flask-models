"""
Controlador de tags - Endpoints /tags
"""

from flask import Blueprint, request, jsonify
from services.tag_service import TagService

tag_bp = Blueprint('tags', __name__)


# GET /tags - Obtener todos los tags
@tag_bp.route('/tags', methods=['GET'])
def get_tags():
    try:
        tags = TagService.get_all()
        return jsonify(tags), 200
    except Exception as error:
        return jsonify({"error": f"Error al obtener tags: {str(error)}"}), 500


# GET /tags/<id> - Obtener un tag por ID (con sus artículos)
@tag_bp.route('/tags/<int:tag_id>', methods=['GET'])
def get_tag(tag_id):
    try:
        tag = TagService.get_by_id(tag_id)
        return jsonify(tag), 200
    except ValueError as error:
        return jsonify({"error": str(error)}), 404
    except Exception as error:
        return jsonify({"error": f"Error al obtener tag: {str(error)}"}), 500


# POST /tags - Crear un nuevo tag
@tag_bp.route('/tags', methods=['POST'])
def create_tag():
    try:
        body = request.get_json()
        if not body:
            return jsonify({"error": "El body no puede estar vacío"}), 400

        tag = TagService.create(body)
        return jsonify(tag), 201
    except ValueError as error:
        return jsonify({"error": str(error)}), 400
    except Exception as error:
        return jsonify({"error": f"Error al crear tag: {str(error)}"}), 500


# PUT /tags/<id> - Editar un tag
@tag_bp.route('/tags/<int:tag_id>', methods=['PUT'])
def update_tag(tag_id):
    try:
        body = request.get_json()
        if not body:
            return jsonify({"error": "El body no puede estar vacío"}), 400

        tag = TagService.update(tag_id, body)
        return jsonify(tag), 200
    except ValueError as error:
        return jsonify({"error": str(error)}), 400
    except Exception as error:
        return jsonify({"error": f"Error al actualizar tag: {str(error)}"}), 500


# DELETE /tags/<id> - Eliminar un tag
@tag_bp.route('/tags/<int:tag_id>', methods=['DELETE'])
def delete_tag(tag_id):
    try:
        result = TagService.delete(tag_id)
        return jsonify(result), 200
    except ValueError as error:
        return jsonify({"error": str(error)}), 404
    except Exception as error:
        return jsonify({"error": f"Error al eliminar tag: {str(error)}"}), 500
