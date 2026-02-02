"""
Script para poblar la base de datos con datos de ejemplo.
Ejecutar con: pipenv run seed
"""
import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

from app import app
from models import db, User, ProfileInfo, Article, Order, OrderItem, Tag


def seed():
    with app.app_context():

        print("Limpiando base de datos...")
        OrderItem.query.delete()
        Order.query.delete()
        ProfileInfo.query.delete()
        # Limpiar article_tags (tabla de asociación)
        db.session.execute(db.text("DELETE FROM article_tags"))
        Article.query.delete()
        Tag.query.delete()
        User.query.delete()
        db.session.commit()

        # =====================================================================
        #                              TAGS
        # =====================================================================
        print("Creando tags...")
        tags = [
            Tag(name="Electrónica", color="#e74c3c"),
            Tag(name="Ropa", color="#3498db"),
            Tag(name="Hogar", color="#2ecc71"),
            Tag(name="Deportes", color="#f39c12"),
            Tag(name="Oferta", color="#9b59b6"),
        ]
        db.session.add_all(tags)
        db.session.commit()

        # =====================================================================
        #                           USUARIOS + PERFILES
        # =====================================================================
        print("Creando usuarios con perfiles...")

        user1 = User(email="ana@example.com", username="ana", password="123456")
        user1.profile = ProfileInfo(
            first_name="Ana", last_name="Martinez",
            phone="+34 611111111", address="Calle Gran Vía 1, Madrid",
            bio="Amante de la tecnología"
        )

        user2 = User(email="pedro@example.com", username="pedro", password="123456")
        user2.profile = ProfileInfo(
            first_name="Pedro", last_name="Lopez",
            phone="+34 622222222", address="Av. Diagonal 100, Barcelona",
            bio="Deportista y gamer"
        )

        user3 = User(email="lucia@example.com", username="lucia", password="123456")
        user3.profile = ProfileInfo(
            first_name="Lucía", last_name="García",
            phone="+34 633333333", address="Calle Sierpes 25, Sevilla",
            bio="Diseñadora de interiores"
        )

        db.session.add_all([user1, user2, user3])
        db.session.commit()

        # =====================================================================
        #                           ARTÍCULOS
        # =====================================================================
        print("Creando artículos...")

        articles = [
            Article(
                name="Laptop Pro 15",
                description="Portátil de alto rendimiento con 16GB RAM y 512GB SSD",
                price=1299.99, stock=15, is_available=True
            ),
            Article(
                name="Auriculares Bluetooth",
                description="Auriculares inalámbricos con cancelación de ruido",
                price=79.99, stock=50, is_available=True
            ),
            Article(
                name="Camiseta Running",
                description="Camiseta técnica transpirable para correr",
                price=29.99, stock=100, is_available=True
            ),
            Article(
                name="Zapatillas Trail",
                description="Zapatillas para correr por montaña",
                price=119.99, stock=30, is_available=True
            ),
            Article(
                name="Lámpara LED Escritorio",
                description="Lámpara de escritorio con 3 niveles de brillo",
                price=34.99, stock=40, is_available=True
            ),
            Article(
                name="Teclado Mecánico RGB",
                description="Teclado mecánico con switches Cherry MX e iluminación RGB",
                price=89.99, stock=25, is_available=True
            ),
            Article(
                name="Sudadera Oversize",
                description="Sudadera cómoda de algodón orgánico",
                price=44.99, stock=60, is_available=True
            ),
            Article(
                name="Balón de Fútbol",
                description="Balón oficial tamaño 5",
                price=24.99, stock=0, is_available=False
            ),
        ]
        db.session.add_all(articles)
        db.session.commit()

        # Asignar tags a artículos
        print("Asignando tags a artículos...")
        articles[0].tags.extend([tags[0], tags[4]])           # Laptop: Electrónica, Oferta
        articles[1].tags.append(tags[0])                       # Auriculares: Electrónica
        articles[2].tags.extend([tags[1], tags[3]])            # Camiseta: Ropa, Deportes
        articles[3].tags.extend([tags[3], tags[4]])            # Zapatillas: Deportes, Oferta
        articles[4].tags.extend([tags[0], tags[2]])            # Lámpara: Electrónica, Hogar
        articles[5].tags.extend([tags[0], tags[4]])            # Teclado: Electrónica, Oferta
        articles[6].tags.append(tags[1])                       # Sudadera: Ropa
        articles[7].tags.append(tags[3])                       # Balón: Deportes
        db.session.commit()

        # =====================================================================
        #                           ÓRDENES
        # =====================================================================
        print("Creando órdenes...")

        # Orden 1: Ana compra laptop + auriculares
        order1 = Order(user_id=user1.id, shipping_address="Calle Gran Vía 1, Madrid")
        item1 = OrderItem(article_id=articles[0].id, quantity=1, unit_price=articles[0].price)
        item1.calculate_subtotal()
        item2 = OrderItem(article_id=articles[1].id, quantity=2, unit_price=articles[1].price)
        item2.calculate_subtotal()
        order1.items.extend([item1, item2])
        db.session.add(order1)
        db.session.flush()
        order1.calculate_total()
        order1.status = "paid"

        # Orden 2: Pedro compra zapatillas + camiseta
        order2 = Order(user_id=user2.id, shipping_address="Av. Diagonal 100, Barcelona")
        item3 = OrderItem(article_id=articles[3].id, quantity=1, unit_price=articles[3].price)
        item3.calculate_subtotal()
        item4 = OrderItem(article_id=articles[2].id, quantity=3, unit_price=articles[2].price)
        item4.calculate_subtotal()
        order2.items.extend([item3, item4])
        db.session.add(order2)
        db.session.flush()
        order2.calculate_total()
        order2.status = "shipped"

        # Orden 3: Lucía compra lámpara + teclado + sudadera
        order3 = Order(user_id=user3.id, shipping_address="Calle Sierpes 25, Sevilla")
        item5 = OrderItem(article_id=articles[4].id, quantity=2, unit_price=articles[4].price)
        item5.calculate_subtotal()
        item6 = OrderItem(article_id=articles[5].id, quantity=1, unit_price=articles[5].price)
        item6.calculate_subtotal()
        item7 = OrderItem(article_id=articles[6].id, quantity=1, unit_price=articles[6].price)
        item7.calculate_subtotal()
        order3.items.extend([item5, item6, item7])
        db.session.add(order3)
        db.session.flush()
        order3.calculate_total()
        order3.status = "delivered"

        # Orden 4: Ana hace otra compra (pendiente)
        order4 = Order(user_id=user1.id, shipping_address="Calle Gran Vía 1, Madrid")
        item8 = OrderItem(article_id=articles[5].id, quantity=1, unit_price=articles[5].price)
        item8.calculate_subtotal()
        order4.items.append(item8)
        db.session.add(order4)
        db.session.flush()
        order4.calculate_total()

        db.session.commit()

        # =====================================================================
        #                           RESUMEN
        # =====================================================================
        print("\n=== Base de datos poblada ===")
        print(f"  Tags:      {Tag.query.count()}")
        print(f"  Usuarios:  {User.query.count()}")
        print(f"  Perfiles:  {ProfileInfo.query.count()}")
        print(f"  Artículos: {Article.query.count()}")
        print(f"  Órdenes:   {Order.query.count()}")
        print(f"  Items:     {OrderItem.query.count()}")
        print("=============================\n")


if __name__ == "__main__":
    seed()
