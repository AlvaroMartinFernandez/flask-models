"""
Servicio de tags - Lógica de negocio para CRUD de Tag
"""

from models import db, Tag


class TagService:

    @staticmethod
    def get_all():
        tags = Tag.query.all()
        return [tag.serialize() for tag in tags]

    @staticmethod
    def get_by_id(tag_id):
        tag = Tag.query.get(tag_id)
        if tag is None:
            raise ValueError(f"Tag con id {tag_id} no encontrado")
        return tag.serialize_with_articles()

    @staticmethod
    def create(data):
        if "name" not in data or not data["name"]:
            raise ValueError("El campo 'name' es obligatorio")

        # Verificar duplicado
        if Tag.query.filter_by(name=data["name"]).first():
            raise ValueError(f"Ya existe un tag con el nombre '{data['name']}'")

        try:
            new_tag = Tag(
                name=data["name"],
                color=data.get("color", "#3498db")
            )
            db.session.add(new_tag)
            db.session.commit()
            return new_tag.serialize()
        except Exception as error:
            db.session.rollback()
            raise error

    @staticmethod
    def update(tag_id, data):
        tag = Tag.query.get(tag_id)
        if tag is None:
            raise ValueError(f"Tag con id {tag_id} no encontrado")

        if "name" in data:
            existing = Tag.query.filter_by(name=data["name"]).first()
            if existing and existing.id != tag.id:
                raise ValueError(f"Ya existe un tag con el nombre '{data['name']}'")
            tag.name = data["name"]

        if "color" in data:
            tag.color = data["color"]

        try:
            db.session.commit()
            return tag.serialize()
        except Exception as error:
            db.session.rollback()
            raise error

    @staticmethod
    def delete(tag_id):
        tag = Tag.query.get(tag_id)
        if tag is None:
            raise ValueError(f"Tag con id {tag_id} no encontrado")

        name = tag.name
        try:
            db.session.delete(tag)
            db.session.commit()
            return {"message": f"Tag '{name}' eliminado correctamente"}
        except Exception as error:
            db.session.rollback()
            raise error
