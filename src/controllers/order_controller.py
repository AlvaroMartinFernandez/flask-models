"""
Controlador de órdenes - Endpoints /orders
"""

from flask import Blueprint, request, jsonify, abort
from services.order_service import OrderService

order_bp = Blueprint('orders', __name__)


# GET /orders - Obtener todas las órdenes
@order_bp.route('/orders', methods=['GET'])
def get_orders():
    orders = OrderService.get_all()
    return jsonify(orders), 200


# GET /orders/<id> - Obtener una orden por ID (con sus items)
@order_bp.route('/orders/<int:order_id>', methods=['GET'])
def get_order(order_id):
    order = OrderService.get_by_id(order_id)
    return jsonify(order), 200


# POST /orders - Crear una nueva orden
@order_bp.route('/orders', methods=['POST'])
def create_order():
    body = request.get_json()
    if not body:
        abort(400, description="El body no puede estar vacío")

    order = OrderService.create(body)
    return jsonify(order), 201


# PUT /orders/<id> - Actualizar estado de una orden
@order_bp.route('/orders/<int:order_id>', methods=['PUT'])
def update_order(order_id):
    body = request.get_json()
    if not body:
        abort(400, description="El body no puede estar vacío")

    order = OrderService.update(order_id, body)
    return jsonify(order), 200


# DELETE /orders/<id> - Eliminar una orden
@order_bp.route('/orders/<int:order_id>', methods=['DELETE'])
def delete_order(order_id):
    result = OrderService.delete(order_id)
    return jsonify(result), 200
