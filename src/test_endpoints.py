"""
Script para testear todos los endpoints de la API.
Ejecutar con: pipenv run test

Uso:
    python src/test_endpoints.py                          (usa http://localhost:3000)
    python src/test_endpoints.py https://mi-url.com       (usa URL personalizada)
"""
import sys
import json
import urllib.request
import urllib.error

BASE_URL = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3000"
BASE_URL = BASE_URL.rstrip("/")

# =====================================================================
#                        HELPERS
# =====================================================================
passed = 0
failed = 0
total = 0


def request(method, path, body=None, expected_status=200):
    global passed, failed, total
    total += 1
    url = f"{BASE_URL}{path}"

    data = None
    if body is not None:
        data = json.dumps(body).encode("utf-8")

    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("Content-Type", "application/json")

    try:
        response = urllib.request.urlopen(req)
        status = response.status
        resp_body = json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        status = e.code
        try:
            resp_body = json.loads(e.read().decode("utf-8"))
        except Exception:
            resp_body = None

    ok = status == expected_status
    icon = "PASS" if ok else "FAIL"

    if ok:
        passed += 1
    else:
        failed += 1

    print(f"  [{icon}] {method:6} {path:40} -> {status} (esperado {expected_status})")

    if not ok and resp_body:
        print(f"         Respuesta: {resp_body}")

    return resp_body, status


def section(title):
    print(f"\n{'='*60}")
    print(f"  {title}")
    print(f"{'='*60}")


# =====================================================================
#                        TESTS
# =====================================================================

print(f"\n  Testeando API en: {BASE_URL}\n")

# ----- USERS -----
section("USERS")

# GET /users
data, _ = request("GET", "/users")
user_count = len(data) if data else 0
print(f"         -> {user_count} usuarios encontrados")

# POST /users - crear usuario de test
test_user, _ = request("POST", "/users", {
    "email": "test_script@test.com",
    "username": "test_script",
    "password": "123456"
}, expected_status=201)

test_user_id = test_user["id"] if test_user else None

# GET /users/:id
request("GET", f"/users/{test_user_id}")

# POST /users - email duplicado (409)
request("POST", "/users", {
    "email": "test_script@test.com",
    "username": "otro",
    "password": "123456"
}, expected_status=409)

# POST /users - campo faltante (400)
request("POST", "/users", {
    "email": "nuevo@test.com",
    "username": "nuevo"
}, expected_status=400)

# POST /users - body vacio (400)
request("POST", "/users", {}, expected_status=400)

# GET /users/999 - no encontrado (404)
request("GET", "/users/999", expected_status=404)

# PUT /users/:id
request("PUT", f"/users/{test_user_id}", {
    "username": "test_updated"
})

# PUT /users/:id - email duplicado (409) - usa el primer usuario del seed
if data and len(data) > 0:
    existing_email = data[0]["email"]
    request("PUT", f"/users/{test_user_id}", {
        "email": existing_email
    }, expected_status=409)

# DELETE /users/:id
request("DELETE", f"/users/{test_user_id}")

# DELETE /users/999 - no encontrado (404)
request("DELETE", "/users/999", expected_status=404)


# ----- USERS ESPECIALES -----
section("USERS - ENDPOINTS ESPECIALES")

# POST /users/with-profile
user_profile, _ = request("POST", "/users/with-profile", {
    "email": "profile_test@test.com",
    "username": "profile_test",
    "password": "123456",
    "profile": {
        "first_name": "Test",
        "last_name": "Profile",
        "phone": "+34 600000000",
        "bio": "Soy un test"
    }
}, expected_status=201)

user_profile_id = user_profile["id"] if user_profile else None

# POST /users/with-profile - duplicado (409)
request("POST", "/users/with-profile", {
    "email": "profile_test@test.com",
    "username": "otro",
    "password": "123456"
}, expected_status=409)

# POST /users/with-profile - campo faltante (400)
request("POST", "/users/with-profile", {
    "email": "nuevo@test.com"
}, expected_status=400)

# GET /users/:id/orders
if data and len(data) > 0:
    first_user_id = data[0]["id"]
    request("GET", f"/users/{first_user_id}/orders")

# GET /users/999/orders - no encontrado (404)
request("GET", "/users/999/orders", expected_status=404)

# Limpiar usuario con perfil
if user_profile_id:
    request("DELETE", f"/users/{user_profile_id}")


# ----- ARTICLES -----
section("ARTICLES")

# GET /articles
articles_data, _ = request("GET", "/articles")
article_count = len(articles_data) if articles_data else 0
print(f"         -> {article_count} articulos encontrados")

# POST /articles
test_article, _ = request("POST", "/articles", {
    "name": "Articulo Test",
    "description": "Creado por el script de test",
    "price": 99.99,
    "stock": 10,
    "tag_ids": [1] if articles_data else []
}, expected_status=201)

test_article_id = test_article["id"] if test_article else None

# GET /articles/:id
request("GET", f"/articles/{test_article_id}")

# POST /articles - sin nombre (400)
request("POST", "/articles", {
    "description": "Sin nombre"
}, expected_status=400)

# POST /articles - body vacio (400)
request("POST", "/articles", {}, expected_status=400)

# GET /articles/999 - no encontrado (404)
request("GET", "/articles/999", expected_status=404)

# PUT /articles/:id
request("PUT", f"/articles/{test_article_id}", {
    "name": "Articulo Actualizado",
    "price": 149.99
})

# PUT /articles/:id - cambiar tags
request("PUT", f"/articles/{test_article_id}", {
    "tag_ids": [1, 2] if articles_data else []
})

# DELETE /articles/:id
request("DELETE", f"/articles/{test_article_id}")

# DELETE /articles/999 - no encontrado (404)
request("DELETE", "/articles/999", expected_status=404)


# ----- TAGS -----
section("TAGS")

# GET /tags
tags_data, _ = request("GET", "/tags")
tag_count = len(tags_data) if tags_data else 0
print(f"         -> {tag_count} tags encontrados")

# POST /tags
test_tag, _ = request("POST", "/tags", {
    "name": "Tag Test",
    "color": "#ff0000"
}, expected_status=201)

test_tag_id = test_tag["id"] if test_tag else None

# GET /tags/:id (con articulos)
request("GET", f"/tags/{test_tag_id}")

# POST /tags - duplicado (409)
request("POST", "/tags", {
    "name": "Tag Test"
}, expected_status=409)

# POST /tags - sin nombre (400)
request("POST", "/tags", {}, expected_status=400)

# GET /tags/999 - no encontrado (404)
request("GET", "/tags/999", expected_status=404)

# PUT /tags/:id
request("PUT", f"/tags/{test_tag_id}", {
    "name": "Tag Actualizado",
    "color": "#00ff00"
})

# PUT /tags/:id - nombre duplicado (409)
if tags_data and len(tags_data) > 0:
    existing_tag_name = tags_data[0]["name"]
    request("PUT", f"/tags/{test_tag_id}", {
        "name": existing_tag_name
    }, expected_status=409)

# DELETE /tags/:id
request("DELETE", f"/tags/{test_tag_id}")

# DELETE /tags/999 - no encontrado (404)
request("DELETE", "/tags/999", expected_status=404)


# ----- ORDERS -----
section("ORDERS")

# GET /orders
orders_data, _ = request("GET", "/orders")
order_count = len(orders_data) if orders_data else 0
print(f"         -> {order_count} ordenes encontradas")

# Necesitamos un user_id y article_id existentes para crear ordenes
first_user_id = None
first_article_id = None

if data and len(data) > 0:
    first_user_id = data[0]["id"]
if articles_data and len(articles_data) > 0:
    # Buscar un articulo disponible con stock
    for art in articles_data:
        if art.get("is_available") and art.get("stock", 0) > 0:
            first_article_id = art["id"]
            break

# POST /orders
test_order = None
if first_user_id and first_article_id:
    test_order, _ = request("POST", "/orders", {
        "user_id": first_user_id,
        "shipping_address": "Calle Test 123",
        "items": [
            {"article_id": first_article_id, "quantity": 1}
        ]
    }, expected_status=201)

test_order_id = test_order["id"] if test_order else None

# GET /orders/:id
if test_order_id:
    request("GET", f"/orders/{test_order_id}")

# POST /orders - sin user_id (400)
request("POST", "/orders", {
    "shipping_address": "Test"
}, expected_status=400)

# POST /orders - usuario inexistente (404)
request("POST", "/orders", {
    "user_id": 999,
    "items": []
}, expected_status=404)

# POST /orders - articulo no disponible (400)
unavailable = None
if articles_data:
    for art in articles_data:
        if not art.get("is_available"):
            unavailable = art["id"]
            break

if unavailable and first_user_id:
    request("POST", "/orders", {
        "user_id": first_user_id,
        "items": [{"article_id": unavailable, "quantity": 1}]
    }, expected_status=400)

# POST /orders - body vacio (400)
request("POST", "/orders", {}, expected_status=400)

# GET /orders/999 - no encontrado (404)
request("GET", "/orders/999", expected_status=404)

# PUT /orders/:id - cambiar estado
if test_order_id:
    request("PUT", f"/orders/{test_order_id}", {
        "status": "paid"
    })

# PUT /orders/:id - estado invalido (400)
if test_order_id:
    request("PUT", f"/orders/{test_order_id}", {
        "status": "invalido"
    }, expected_status=400)

# DELETE /orders/:id
if test_order_id:
    request("DELETE", f"/orders/{test_order_id}")

# DELETE /orders/999 - no encontrado (404)
request("DELETE", "/orders/999", expected_status=404)


# =====================================================================
#                        RESUMEN
# =====================================================================
print(f"\n{'='*60}")
print(f"  RESUMEN")
print(f"{'='*60}")
print(f"  Total:    {total}")
print(f"  Pasados:  {passed}")
print(f"  Fallados: {failed}")
print(f"{'='*60}")

if failed > 0:
    print(f"\n  ** {failed} test(s) fallaron **\n")
    sys.exit(1)
else:
    print(f"\n  Todos los tests pasaron!\n")
    sys.exit(0)
