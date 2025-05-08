from unittest.mock import patch
import requests

BASE_URL = "http://127.0.0.1:5000"

@patch("requests.get")
def test_products(mock_get):
    mock_get.return_value.status_code = 200
    mock_get.return_value.json.return_value = [
        {
            "id": 1,
            "name": "Producto A",
            "price": 50.0,
            "description": "Descripción del producto A",
            "image": "imagen_producto_a.png",
            "id_farm": 2,
            "category": 1,
            "contact": "3111234567",
            "name_farm": "Finca A",
            "name_category": "Categoría 1",
        }
    ]

    response = requests.get(f"{BASE_URL}/products")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
    assert response.json()[0]["name"] == "Producto A"

@patch("requests.post")
def test_add_product(mock_post):
    mock_post.return_value.status_code = 200
    mock_post.return_value.json.return_value = {
        "isCorrect": True,
        "message": "Producto agregado exitosamente"
    }

    data = {
        "Nombre": "Producto Prueba",
        "Precio": 1000,
        "Descripcion": "Un producto de prueba",
        "Imagen": "imagen_prueba.png",
        "IDFinca": 1,
        "Categoria": 1,
        "contacto": "3111234567"
    }

    response = requests.post(f"{BASE_URL}/agregar_producto", json=data)
    assert response.status_code == 200
    assert response.json()["isCorrect"] is True

@patch("requests.delete")
def test_delete_product(mock_delete):
    mock_delete.return_value.status_code = 200
    mock_delete.return_value.json.return_value = {
        "mensaje": "Producto eliminado correctamente"
    }

    response = requests.delete(f"{BASE_URL}/eliminar-producto/123")
    assert response.status_code == 200
    assert response.json()["mensaje"] == "Producto eliminado correctamente"

@patch("requests.put")
def test_edit_product(mock_put):
    mock_put.return_value.status_code = 200
    mock_put.return_value.json.return_value = {
        "mensaje": "Producto actualizado correctamente"
    }

    data = {
        "Nombre": "Producto Actualizado",
        "Precio": 1500,
        "Descripcion": "Producto actualizado",
        "Categoria": 2,
        "Imagen": "imagen_actualizada.png",
        "IDFinca": 1
    }

    response = requests.put(f"{BASE_URL}/editar_producto/123", json=data)
    assert response.status_code == 200
    assert response.json()["mensaje"] == "Producto actualizado correctamente"

@patch("requests.post")
def test_register_user(mock_post):
    mock_post.return_value.status_code = 200
    mock_post.return_value.json.return_value = {
        "mensaje": "Usuario registrado correctamente"
    }

    data = {
        "cedula": "12345678",
        "nombre": "Juan",
        "apellido": "Pérez",
        "telefono": "3111234567",
        "email": "juan@example.com",
        "rol": "cliente",
        "edad": 30,
        "direccion": "Calle Falsa 123",
        "password": "password123"
    }

    response = requests.post(f"{BASE_URL}/registrar-usuario", json=data)
    assert response.status_code == 200
    assert response.json()["mensaje"] == "Usuario registrado correctamente"

@patch("requests.post")
def test_session(mock_post):
    mock_post.return_value.status_code = 200
    mock_post.return_value.json.return_value = {
        "exito": True,
        "mensaje": "Inicio de sesión exitoso",
        "usuario": {
            "cedula": "12345678",
            "nombre": "Juan",
            "apellido": "Pérez",
            "telefono": "3111234567",
            "email": "juan@example.com",
            "rol": "cliente",
            "edad": 30,
            "direccion": "Calle Falsa 123",
            "password": "hashedpassword123"
        }
    }

    data = {
        "email": "juan@example.com",
        "password": "password123"
    }

    response = requests.post(f"{BASE_URL}/sesion", json=data)
    assert response.status_code == 200
    assert response.json()["exito"] is True

@patch("requests.get")
def test_get_user_farms(mock_get):
    mock_get.return_value.status_code = 200
    mock_get.return_value.json.return_value = {
        "exito": True,
        "fincas": [
            {"id": 1, "id_owner": "12345678", "name": "Finca A"},
            {"id": 2, "id_owner": "12345678", "name": "Finca B"}
        ]
    }

    response = requests.get(f"{BASE_URL}/obtener_fincas_usuario?id_usuario=12345678")
    assert response.status_code == 200
    assert response.json()["exito"] is True

@patch("requests.post")
def test_add_farm(mock_post):
    mock_post.return_value.status_code = 200
    mock_post.return_value.json.return_value = {
        "exito": True,
        "mensaje": "Finca agregada exitosamente"
    }

    data = {
        "usuario": "12345678",
        "nombre": "Finca Prueba"
    }

    response = requests.post(f"{BASE_URL}/agregar_finca", json=data)
    assert response.status_code == 200
    assert response.json()["exito"] is True

@patch("requests.delete")
def test_delete_farm(mock_delete):
    mock_delete.return_value.status_code = 200
    mock_delete.return_value.json.return_value = {
        "exito": True,
        "mensaje": "Finca eliminada exitosamente"
    }

    response = requests.delete(f"{BASE_URL}/eliminar_finca", json={"index": 1})
    assert response.status_code == 200
    assert response.json()["exito"] is True

@patch("requests.get")
def test_get_cart(mock_get):
    mock_get.return_value.status_code = 200
    mock_get.return_value.json.return_value = [
        {"IDUsuario": "12345678", "IDProducto": "ABC123"}
    ]

    response = requests.get(f"{BASE_URL}/obtener-productos-carrito/12345678")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

@patch("requests.post")
def test_add_to_cart(mock_post):
    mock_post.return_value.status_code = 200
    mock_post.return_value.json.return_value = {
        "mensaje": "Producto agregado al carrito correctamente"
    }

    data = {
        "IDUsuario": "12345678",
        "IDProducto": "ABC123"
    }

    response = requests.post(f"{BASE_URL}/agregar-producto-carrito", json=data)
    assert response.status_code == 200
    assert response.json()["mensaje"] == "Producto agregado al carrito correctamente"

@patch("requests.delete")
def test_delete_from_cart(mock_delete):
    mock_delete.return_value.status_code = 200
    mock_delete.return_value.json.return_value = {
        "mensaje": "Producto eliminado del carrito correctamente"
    }

    response = requests.delete(f"{BASE_URL}/eliminar-producto-carrito/12345678/ABC123")
    assert response.status_code == 200
    assert response.json()["mensaje"] == "Producto eliminado del carrito correctamente"
