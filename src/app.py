"""
=============================================================================
                          FLASK APP - Punto de entrada
=============================================================================

Este archivo se encarga de:
- Crear la aplicación Flask
- Configurar la base de datos
- Inicializar extensiones (db, migrate, cors, admin)
- Registrar los controladores (blueprints)

Los endpoints están en src/controllers/
La lógica de negocio está en src/services/
Los modelos están en src/models/
"""
import os
from flask import Flask, jsonify
from flask import Flask, request, jsonify, url_for, abort
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from utils import APIException, generate_sitemap
from admin import setup_admin
from models import db
from controllers import register_controllers

app = Flask(__name__)
app.url_map.strict_slashes = False

db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    db_path = os.path.join(os.path.dirname(__file__), '..', 'instance', 'test.db')
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///" + os.path.abspath(db_path)
    if os.name == 'nt':  # Windows
        db_path = os.path.join(os.path.dirname(__file__), '..', 'instance', 'test.db')
        os.makedirs(os.path.dirname(os.path.abspath(db_path)), exist_ok=True)
        app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///" + os.path.abspath(db_path)
    else:  # Unix/Linux/Codespaces
        app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

MIGRATE = Migrate(app, db)
db.init_app(app)
CORS(app)
setup_admin(app)

# Registrar todos los controladores (blueprints)
register_controllers(app)

# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    return generate_sitemap(app)

# this only runs if `$ python src/app.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3000))
    app.run(host='0.0.0.0', port=PORT, debug=False)
