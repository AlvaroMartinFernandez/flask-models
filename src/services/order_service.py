"""
Servicio de órdenes - Lógica de negocio para CRUD de Order
"""

from models import db, User, Article, Order, OrderItem


class OrderService:

    @staticmethod
    def get_all():
        orders = Order.query.all()
        return [order.serialize() for order in orders]

    @staticmethod
    def get_by_id(order_id):
        order = Order.query.get(order_id)
        if order is None:
            raise ValueError(f"Orden con id {order_id} no encontrada")
        return order.serialize_with_items()

    @staticmethod
    def create(data):
        if "user_id" not in data:
            raise ValueError("El campo 'user_id' es obligatorio")

        # Verificar que el usuario existe
        user = User.query.get(data["user_id"])
        if user is None:
            raise ValueError(f"Usuario con id {data['user_id']} no encontrado")

        try:
            new_order = Order(
                user_id=data["user_id"],
                shipping_address=data.get("shipping_address")
            )

            # Crear items si se envían
            if "items" in data and isinstance(data["items"], list):
                for item_data in data["items"]:
                    if "article_id" not in item_data or "quantity" not in item_data:
                        raise ValueError("Cada item necesita 'article_id' y 'quantity'")

                    article = Article.query.get(item_data["article_id"])
                    if article is None:
                        raise ValueError(f"Artículo con id {item_data['article_id']} no encontrado")

                    if not article.is_available:
                        raise ValueError(f"El artículo '{article.name}' no está disponible")

                    if article.stock < item_data["quantity"]:
                        raise ValueError(f"Stock insuficiente para '{article.name}'. Disponible: {article.stock}")

                    order_item = OrderItem(
                        article_id=article.id,
                        quantity=item_data["quantity"],
                        unit_price=article.price
                    )
                    order_item.calculate_subtotal()
                    new_order.items.append(order_item)

            db.session.add(new_order)
            db.session.flush()
            new_order.calculate_total()
            db.session.commit()
            return new_order.serialize_with_items()

        except ValueError:
            db.session.rollback()
            raise
        except Exception as error:
            db.session.rollback()
            raise error

    @staticmethod
    def update(order_id, data):
        order = Order.query.get(order_id)
        if order is None:
            raise ValueError(f"Orden con id {order_id} no encontrada")

        valid_statuses = ["pending", "paid", "shipped", "delivered", "cancelled"]

        if "status" in data:
            if data["status"] not in valid_statuses:
                raise ValueError(f"Estado inválido. Los estados válidos son: {', '.join(valid_statuses)}")
            order.status = data["status"]

        if "shipping_address" in data:
            order.shipping_address = data["shipping_address"]

        try:
            db.session.commit()
            return order.serialize()
        except Exception as error:
            db.session.rollback()
            raise error

    @staticmethod
    def delete(order_id):
        order = Order.query.get(order_id)
        if order is None:
            raise ValueError(f"Orden con id {order_id} no encontrada")

        try:
            db.session.delete(order)
            db.session.commit()
            return {"message": f"Orden #{order_id} eliminada correctamente"}
        except Exception as error:
            db.session.rollback()
            raise error
