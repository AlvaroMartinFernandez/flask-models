"""
=============================================================================
                              MODELO: USER (Usuario)
=============================================================================

Tabla principal de usuarios.
- Relación 1 a 1 con ProfileInfo
- Relación 1 a Muchos con Order
"""

from sqlalchemy import String, Boolean, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime
from models import db


class User(db.Model):
    __tablename__ = 'users'

    # Columnas
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    username: Mapped[str] = mapped_column(String(80), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(256), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), default=True, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(), default=datetime.utcnow)

    # Relaciones
    profile: Mapped["ProfileInfo"] = relationship(
        "ProfileInfo",
        back_populates="user",
        uselist=False,
        cascade="all, delete-orphan"
    )

    orders: Mapped[list["Order"]] = relationship(
        "Order",
        back_populates="user",
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f'<User {self.id}: {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "is_active": self.is_active,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }

    def serialize_with_profile(self):
        data = self.serialize()
        data["profile"] = self.profile.serialize() if self.profile else None
        return data

    def serialize_with_orders(self):
        data = self.serialize()
        data["orders"] = [order.serialize() for order in self.orders]
        return data
