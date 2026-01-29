"""
Controlador de artículos - Endpoints /articles
"""

from flask import Blueprint, request, jsonify
from services.article_service import ArticleService

article_bp = Blueprint('articles', __name__)


# GET /articles - Obtener todos los artículos
@article_bp.route('/articles', methods=['GET'])
def get_articles():
    try:
        articles = ArticleService.get_all()
        return jsonify(articles), 200
    except Exception as error:
        return jsonify({"error": f"Error al obtener artículos: {str(error)}"}), 500


# GET /articles/<id> - Obtener un artículo por ID
@article_bp.route('/articles/<int:article_id>', methods=['GET'])
def get_article(article_id):
    try:
        article = ArticleService.get_by_id(article_id)
        return jsonify(article), 200
    except ValueError as error:
        return jsonify({"error": str(error)}), 404
    except Exception as error:
        return jsonify({"error": f"Error al obtener artículo: {str(error)}"}), 500


# POST /articles - Crear un nuevo artículo
@article_bp.route('/articles', methods=['POST'])
def create_article():
    try:
        body = request.get_json()
        if not body:
            return jsonify({"error": "El body no puede estar vacío"}), 400

        article = ArticleService.create(body)
        return jsonify(article), 201
    except ValueError as error:
        return jsonify({"error": str(error)}), 400
    except Exception as error:
        return jsonify({"error": f"Error al crear artículo: {str(error)}"}), 500


# PUT /articles/<id> - Editar un artículo
@article_bp.route('/articles/<int:article_id>', methods=['PUT'])
def update_article(article_id):
    try:
        body = request.get_json()
        if not body:
            return jsonify({"error": "El body no puede estar vacío"}), 400

        article = ArticleService.update(article_id, body)
        return jsonify(article), 200
    except ValueError as error:
        return jsonify({"error": str(error)}), 400
    except Exception as error:
        return jsonify({"error": f"Error al actualizar artículo: {str(error)}"}), 500


# DELETE /articles/<id> - Eliminar un artículo
@article_bp.route('/articles/<int:article_id>', methods=['DELETE'])
def delete_article(article_id):
    try:
        result = ArticleService.delete(article_id)
        return jsonify(result), 200
    except ValueError as error:
        return jsonify({"error": str(error)}), 404
    except Exception as error:
        return jsonify({"error": f"Error al eliminar artículo: {str(error)}"}), 500
