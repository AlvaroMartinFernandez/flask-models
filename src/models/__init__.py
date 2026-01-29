"""
=============================================================================
                    MODELOS DE BASE DE DATOS - PAQUETE
=============================================================================

Este paquete contiene todos los modelos (tablas) de nuestra base de datos,
organizados en archivos separados siguiendo el patrón MVC.

Desde aquí se exportan todos los modelos y el objeto db para que
el resto de la aplicación pueda importarlos fácilmente:

    from models import db, User, Article, Order, Tag
"""

from flask_sqlalchemy import SQLAlchemy

# Inicializamos SQLAlchemy - esto crea la conexión con la base de datos
db = SQLAlchemy()

# Importamos todos los modelos para que estén disponibles desde el paquete
# IMPORTANTE: El orden de imports importa por las dependencias entre modelos
from models.associations import article_tags
from models.tag import Tag
from models.user import User
from models.profile_info import ProfileInfo
from models.article import Article
from models.order import Order
from models.order_item import OrderItem
