"""
=============================================================================
              TABLA DE ASOCIACIÓN: article_tags (Muchos a Muchos PURA)
=============================================================================

Esta es la forma MÁS SIMPLE de crear una relación muchos a muchos en SQLAlchemy.

¿Cuándo usar db.Table vs una Clase Modelo?
------------------------------------------
- USA db.Table cuando SOLO necesitas conectar dos tablas (sin campos extra)
- USA una Clase (como OrderItem) cuando necesitas campos adicionales
  (cantidad, precio, fecha, etc.)

La tabla article_tags tendrá solo 2 columnas:
- article_id: FK hacia articles
- tag_id: FK hacia tags
"""

from sqlalchemy import Integer, ForeignKey, Table, Column
from models import db

article_tags = Table(
    'article_tags',
    db.metadata,
    Column(
        'article_id',
        Integer,
        ForeignKey('articles.id'),
        primary_key=True
    ),
    Column(
        'tag_id',
        Integer,
        ForeignKey('tags.id'),
        primary_key=True
    )
)
