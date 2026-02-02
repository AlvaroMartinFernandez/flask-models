"""
Controlador de tags - Endpoints /tags
"""

from flask import Blueprint, request, jsonify, abort
from services.tag_service import TagService

tag_bp = Blueprint('tags', __name__)


# GET /tags - Obtener todos los tags
@tag_bp.route('/tags', methods=['GET'])
def get_tags():
    tags = TagService.get_all()
    return jsonify(tags), 200


# GET /tags/<id> - Obtener un tag por ID (con sus artículos)
@tag_bp.route('/tags/<int:tag_id>', methods=['GET'])
def get_tag(tag_id):
    tag = TagService.get_by_id(tag_id)
    return jsonify(tag), 200


# POST /tags - Crear un nuevo tag
@tag_bp.route('/tags', methods=['POST'])
def create_tag():
    body = request.get_json()
    if not body:
        abort(400, description="El body no puede estar vacío")

    tag = TagService.create(body)
    return jsonify(tag), 201


# PUT /tags/<id> - Editar un tag
@tag_bp.route('/tags/<int:tag_id>', methods=['PUT'])
def update_tag(tag_id):
    body = request.get_json()
    if not body:
        abort(400, description="El body no puede estar vacío")

    tag = TagService.update(tag_id, body)
    return jsonify(tag), 200


# DELETE /tags/<id> - Eliminar un tag
@tag_bp.route('/tags/<int:tag_id>', methods=['DELETE'])
def delete_tag(tag_id):
    result = TagService.delete(tag_id)
    return jsonify(result), 200
