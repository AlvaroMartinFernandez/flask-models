"""
=============================================================================
                      MODELO: ORDER_ITEM (Item de Orden)
=============================================================================

Tabla intermedia/pivote que conecta Order con Article.
Necesitamos esta clase (en vez de una simple Table) porque
almacena campos adicionales: quantity, unit_price, subtotal.
"""

from sqlalchemy import Integer, Float, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from models import db


class OrderItem(db.Model):
    __tablename__ = 'order_items'

    # Columnas
    id: Mapped[int] = mapped_column(primary_key=True)
    order_id: Mapped[int] = mapped_column(ForeignKey('orders.id'), nullable=False)
    article_id: Mapped[int] = mapped_column(ForeignKey('articles.id'), nullable=False)
    quantity: Mapped[int] = mapped_column(Integer(), nullable=False, default=1)
    unit_price: Mapped[float] = mapped_column(Float(), nullable=False)
    subtotal: Mapped[float] = mapped_column(Float(), nullable=False, default=0.0)

    # Relaciones
    order: Mapped["Order"] = relationship("Order", back_populates="items")
    article: Mapped["Article"] = relationship("Article", back_populates="order_items")

    def __repr__(self):
        return f'<OrderItem {self.id}: {self.quantity}x Article {self.article_id}>'

    def calculate_subtotal(self):
        self.subtotal = self.quantity * self.unit_price
        return self.subtotal

    def serialize(self):
        return {
            "id": self.id,
            "order_id": self.order_id,
            "article_id": self.article_id,
            "quantity": self.quantity,
            "unit_price": self.unit_price,
            "subtotal": self.subtotal
        }

    def serialize_with_article(self):
        data = self.serialize()
        data["article"] = self.article.serialize_simple() if self.article else None
        return data
