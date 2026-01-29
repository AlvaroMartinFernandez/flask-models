"""
=============================================================================
                           MODELO: ARTICLE (Artículo/Producto)
=============================================================================

Almacena los productos disponibles para comprar.
- Relación 1 a Muchos con OrderItem
- Relación Muchos a Muchos con Tag (a través de article_tags)
"""

from sqlalchemy import String, Boolean, Integer, Float, Text, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime
from models import db


class Article(db.Model):
    __tablename__ = 'articles'

    # Columnas
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[str] = mapped_column(Text(), nullable=True)
    price: Mapped[float] = mapped_column(Float(), nullable=False, default=0.0)
    stock: Mapped[int] = mapped_column(Integer(), nullable=False, default=0)
    image_url: Mapped[str] = mapped_column(String(500), nullable=True)
    is_available: Mapped[bool] = mapped_column(Boolean(), default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(), default=datetime.utcnow)

    # Relaciones
    order_items: Mapped[list["OrderItem"]] = relationship(
        "OrderItem",
        back_populates="article",
        cascade="all, delete-orphan"
    )

    tags: Mapped[list["Tag"]] = relationship(
        "Tag",
        secondary="article_tags",
        back_populates="articles"
    )

    def __repr__(self):
        return f'<Article {self.id}: {self.name} - ${self.price}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "stock": self.stock,
            "image_url": self.image_url,
            "is_available": self.is_available,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }

    def serialize_simple(self):
        return {
            "id": self.id,
            "name": self.name,
            "price": self.price,
            "is_available": self.is_available
        }

    def serialize_with_tags(self):
        data = self.serialize()
        data["tags"] = [tag.serialize() for tag in self.tags]
        return data
