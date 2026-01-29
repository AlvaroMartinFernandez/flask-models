"""
=============================================================================
                         CAPA DE CONTROLADORES
=============================================================================

Los controladores definen las rutas/endpoints de la API usando Blueprints.
Cada controlador se encarga de:
- Recibir la petición HTTP
- Extraer los datos del request
- Llamar al servicio correspondiente
- Retornar la respuesta JSON con el código de estado adecuado
"""

from controllers.user_controller import user_bp
from controllers.article_controller import article_bp
from controllers.order_controller import order_bp
from controllers.tag_controller import tag_bp


def register_controllers(app):
    """
    Registra todos los blueprints (controladores) en la aplicación Flask.
    Se llama desde app.py al inicializar la aplicación.
    """
    app.register_blueprint(user_bp)
    app.register_blueprint(article_bp)
    app.register_blueprint(order_bp)
    app.register_blueprint(tag_bp)
