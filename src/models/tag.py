"""
=============================================================================
                              MODELO: TAG (Etiqueta)
=============================================================================

Almacena las etiquetas que se pueden asignar a los artículos.
Ejemplos: "Oferta", "Nuevo", "Popular", "Electrónica", "Ropa"

Relación MUCHOS a MUCHOS con Article (a través de article_tags)
"""

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from models import db


class Tag(db.Model):
    __tablename__ = 'tags'

    # Columnas
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    color: Mapped[str] = mapped_column(String(20), nullable=True, default="#3498db")

    # Relación Muchos a Muchos con Article
    articles: Mapped[list["Article"]] = relationship(
        "Article",
        secondary="article_tags",
        back_populates="tags"
    )

    def __repr__(self):
        return f'<Tag {self.id}: {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "color": self.color
        }

    def serialize_with_articles(self):
        data = self.serialize()
        data["articles"] = [article.serialize_simple() for article in self.articles]
        data["articles_count"] = len(self.articles)
        return data
