"""
=============================================================================
                           MODELO: ORDER (Orden/Pedido)
=============================================================================

Representa una compra realizada por un usuario.
- Pertenece a UN usuario (relación Muchos a 1 con User)
- Contiene MUCHOS items (relación 1 a Muchos con OrderItem)

Estados posibles: pending, paid, shipped, delivered, cancelled
"""

from sqlalchemy import String, Float, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime
from models import db


class Order(db.Model):
    __tablename__ = 'orders'

    # Columnas
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id'), nullable=False)
    status: Mapped[str] = mapped_column(String(20), default='pending', nullable=False)
    total: Mapped[float] = mapped_column(Float(), default=0.0)
    shipping_address: Mapped[str] = mapped_column(String(500), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(), default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(),
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    # Relaciones
    user: Mapped["User"] = relationship("User", back_populates="orders")
    items: Mapped[list["OrderItem"]] = relationship(
        "OrderItem",
        back_populates="order",
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f'<Order {self.id}: User {self.user_id} - ${self.total} ({self.status})>'

    def calculate_total(self):
        self.total = sum(item.subtotal for item in self.items)
        return self.total

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "status": self.status,
            "total": self.total,
            "shipping_address": self.shipping_address,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
            "items_count": len(self.items)
        }

    def serialize_with_items(self):
        data = self.serialize()
        data["items"] = [item.serialize() for item in self.items]
        return data

    def serialize_with_user(self):
        data = self.serialize()
        data["user"] = self.user.serialize() if self.user else None
        return data
