"""
Servicio de artículos - Lógica de negocio para CRUD de Article
"""

from flask import abort
from models import db, Article, Tag


class ArticleService:

    @staticmethod
    def get_all():
        articles = Article.query.all()
        return [article.serialize() for article in articles]

    @staticmethod
    def get_by_id(article_id):
        article = Article.query.get(article_id)
        if article is None:
            abort(404, description=f"Artículo con id {article_id} no encontrado")
        return article.serialize_with_tags()

    @staticmethod
    def create(data):
        if "name" not in data or not data["name"]:
            abort(400, description="El campo 'name' es obligatorio")

        try:
            new_article = Article(
                name=data["name"],
                description=data.get("description"),
                price=data.get("price", 0.0),
                stock=data.get("stock", 0),
                image_url=data.get("image_url"),
                is_available=data.get("is_available", True)
            )

            # Asociar tags si se envían
            if "tag_ids" in data and isinstance(data["tag_ids"], list):
                for tag_id in data["tag_ids"]:
                    tag = Tag.query.get(tag_id)
                    if tag:
                        new_article.tags.append(tag)

            db.session.add(new_article)
            db.session.commit()
            return new_article.serialize_with_tags()
        except Exception as error:
            db.session.rollback()
            abort(500, description=f"Error al crear artículo: {str(error)}")

    @staticmethod
    def update(article_id, data):
        article = Article.query.get(article_id)
        if article is None:
            abort(404, description=f"Artículo con id {article_id} no encontrado")

        if "name" in data:
            article.name = data["name"]
        if "description" in data:
            article.description = data["description"]
        if "price" in data:
            article.price = data["price"]
        if "stock" in data:
            article.stock = data["stock"]
        if "image_url" in data:
            article.image_url = data["image_url"]
        if "is_available" in data:
            article.is_available = data["is_available"]

        # Reemplazar tags si se envían
        if "tag_ids" in data and isinstance(data["tag_ids"], list):
            article.tags.clear()
            for tag_id in data["tag_ids"]:
                tag = Tag.query.get(tag_id)
                if tag:
                    article.tags.append(tag)

        try:
            db.session.commit()
            return article.serialize_with_tags()
        except Exception as error:
            db.session.rollback()
            abort(500, description=f"Error al actualizar artículo: {str(error)}")

    @staticmethod
    def delete(article_id):
        article = Article.query.get(article_id)
        if article is None:
            abort(404, description=f"Artículo con id {article_id} no encontrado")

        name = article.name
        try:
            db.session.delete(article)
            db.session.commit()
            return {"message": f"Artículo '{name}' eliminado correctamente"}
        except Exception as error:
            db.session.rollback()
            abort(500, description=f"Error al eliminar artículo: {str(error)}")
