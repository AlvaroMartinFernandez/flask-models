import os
from flask_admin import Admin
from models import db, User, ProfileInfo, Article, Order, OrderItem, Tag
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')


    # Agregamos todos los modelos al panel de administración
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(ProfileInfo, db.session))
    admin.add_view(ModelView(Article, db.session))
    admin.add_view(ModelView(Order, db.session))
    admin.add_view(ModelView(OrderItem, db.session))
    admin.add_view(ModelView(Tag, db.session))
