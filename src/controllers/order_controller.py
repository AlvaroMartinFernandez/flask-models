"""
Controlador de órdenes - Endpoints /orders
"""

from flask import Blueprint, request, jsonify
from services.order_service import OrderService

order_bp = Blueprint('orders', __name__)


# GET /orders - Obtener todas las órdenes
@order_bp.route('/orders', methods=['GET'])
def get_orders():
    try:
        orders = OrderService.get_all()
        return jsonify(orders), 200
    except Exception as error:
        return jsonify({"error": f"Error al obtener órdenes: {str(error)}"}), 500


# GET /orders/<id> - Obtener una orden por ID (con sus items)
@order_bp.route('/orders/<int:order_id>', methods=['GET'])
def get_order(order_id):
    try:
        order = OrderService.get_by_id(order_id)
        return jsonify(order), 200
    except ValueError as error:
        return jsonify({"error": str(error)}), 404
    except Exception as error:
        return jsonify({"error": f"Error al obtener orden: {str(error)}"}), 500


# POST /orders - Crear una nueva orden
@order_bp.route('/orders', methods=['POST'])
def create_order():
    try:
        body = request.get_json()
        if not body:
            return jsonify({"error": "El body no puede estar vacío"}), 400

        order = OrderService.create(body)
        return jsonify(order), 201
    except ValueError as error:
        return jsonify({"error": str(error)}), 400
    except Exception as error:
        return jsonify({"error": f"Error al crear orden: {str(error)}"}), 500


# PUT /orders/<id> - Actualizar estado de una orden
@order_bp.route('/orders/<int:order_id>', methods=['PUT'])
def update_order(order_id):
    try:
        body = request.get_json()
        if not body:
            return jsonify({"error": "El body no puede estar vacío"}), 400

        order = OrderService.update(order_id, body)
        return jsonify(order), 200
    except ValueError as error:
        return jsonify({"error": str(error)}), 400
    except Exception as error:
        return jsonify({"error": f"Error al actualizar orden: {str(error)}"}), 500


# DELETE /orders/<id> - Eliminar una orden
@order_bp.route('/orders/<int:order_id>', methods=['DELETE'])
def delete_order(order_id):
    try:
        result = OrderService.delete(order_id)
        return jsonify(result), 200
    except ValueError as error:
        return jsonify({"error": str(error)}), 404
    except Exception as error:
        return jsonify({"error": f"Error al eliminar orden: {str(error)}"}), 500
