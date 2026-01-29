"""
Servicio de usuarios - Lógica de negocio para CRUD de User
"""

from models import db, User


class UserService:

    @staticmethod
    def get_all():
        users = User.query.all()
        return [user.serialize() for user in users]

    @staticmethod
    def get_by_id(user_id):
        user = User.query.get(user_id)
        if user is None:
            raise ValueError(f"Usuario con id {user_id} no encontrado")
        return user.serialize_with_profile()

    @staticmethod
    def create(data):
        # Validar campos obligatorios
        required_fields = ["email", "username", "password"]
        for field in required_fields:
            if field not in data or not data[field]:
                raise ValueError(f"El campo '{field}' es obligatorio")

        # Verificar duplicados
        if User.query.filter_by(email=data["email"]).first():
            raise ValueError("Ya existe un usuario con ese email")

        if User.query.filter_by(username=data["username"]).first():
            raise ValueError("Ya existe un usuario con ese username")

        try:
            new_user = User(
                email=data["email"],
                username=data["username"],
                password=data["password"],
                is_active=data.get("is_active", True)
            )
            db.session.add(new_user)
            db.session.commit()
            return new_user.serialize()
        except Exception as error:
            db.session.rollback()
            raise error

    @staticmethod
    def update(user_id, data):
        user = User.query.get(user_id)
        if user is None:
            raise ValueError(f"Usuario con id {user_id} no encontrado")

        # Verificar duplicados si se cambia email o username
        if "email" in data and data["email"] != user.email:
            if User.query.filter_by(email=data["email"]).first():
                raise ValueError("Ya existe un usuario con ese email")
            user.email = data["email"]

        if "username" in data and data["username"] != user.username:
            if User.query.filter_by(username=data["username"]).first():
                raise ValueError("Ya existe un usuario con ese username")
            user.username = data["username"]

        if "password" in data:
            user.password = data["password"]
        if "is_active" in data:
            user.is_active = data["is_active"]

        try:
            db.session.commit()
            return user.serialize()
        except Exception as error:
            db.session.rollback()
            raise error

    @staticmethod
    def delete(user_id):
        user = User.query.get(user_id)
        if user is None:
            raise ValueError(f"Usuario con id {user_id} no encontrado")

        username = user.username
        try:
            db.session.delete(user)
            db.session.commit()
            return {"message": f"Usuario '{username}' eliminado correctamente"}
        except Exception as error:
            db.session.rollback()
            raise error
