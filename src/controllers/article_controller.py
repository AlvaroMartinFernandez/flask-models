"""
Controlador de artículos - Endpoints /articles
"""

from flask import Blueprint, request, jsonify, abort
from services.article_service import ArticleService

article_bp = Blueprint('articles', __name__)


# GET /articles - Obtener todos los artículos
@article_bp.route('/articles', methods=['GET'])
def get_articles():
    articles = ArticleService.get_all()
    return jsonify(articles), 200


# GET /articles/<id> - Obtener un artículo por ID
@article_bp.route('/articles/<int:article_id>', methods=['GET'])
def get_article(article_id):
    article = ArticleService.get_by_id(article_id)
    return jsonify(article), 200


# POST /articles - Crear un nuevo artículo
@article_bp.route('/articles', methods=['POST'])
def create_article():
    body = request.get_json()
    if not body:
        abort(400, description="El body no puede estar vacío")

    article = ArticleService.create(body)
    return jsonify(article), 201


# PUT /articles/<id> - Editar un artículo
@article_bp.route('/articles/<int:article_id>', methods=['PUT'])
def update_article(article_id):
    body = request.get_json()
    if not body:
        abort(400, description="El body no puede estar vacío")

    article = ArticleService.update(article_id, body)
    return jsonify(article), 200


# DELETE /articles/<id> - Eliminar un artículo
@article_bp.route('/articles/<int:article_id>', methods=['DELETE'])
def delete_article(article_id):
    result = ArticleService.delete(article_id)
    return jsonify(result), 200
