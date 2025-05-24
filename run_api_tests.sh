#!/bin/bash

# GET /products
echo "Ejecutando GET /products"
curl -X GET http://127.0.0.1:5000/products 

# POST /agregar_producto
echo "Ejecutando POST /agregar_producto"
curl -X POST http://127.0.0.1:5000/agregar_producto \
     -H "Content-Type: application/json" \
     -d '{"Nombre": "Producto Prueba", "Precio": 1000, "Descripcion": "Un producto de prueba", "Imagen": "imagen_prueba.png", "IDFinca": "7D0E651C-CC21-4425-9D1A-4158E8297D06", "Categoria": 1, "contacto": "3111234567"}' && \

# DELETE /eliminar-producto/123
echo "Ejecutando DELETE /eliminar-producto/BED15AA5-48A0-4AF4-98D5-7012B375DF7B"
curl -X DELETE http://127.0.0.1:5000/eliminar-producto/BED15AA5-48A0-4AF4-98D5-7012B375DF7B && \

# PUT /editar_producto/123
echo "Ejecutando PUT /editar_producto/123"
curl -X PUT http://127.0.0.1:5000/editar_producto/123 \
     -H "Content-Type: application/json" \
     -d '{"Nombre": "Producto Actualizado", "Precio": 1500, "Descripcion": "Producto actualizado", "Categoria": 2, "Imagen": "imagen_actualizada.png", "IDFinca": 1}' && \

# POST /registrar-usuario
echo "Ejecutando POST /registrar-usuario"
curl -X POST http://127.0.0.1:5000/registrar-usuario \
     -H "Content-Type: application/json" \
     -d '{"cedula": "12345678", "nombre": "Juan", "apellido": "Pérez", "telefono": "3111234567", "email": "juan@example.com", "rol": "cliente", "edad": 30, "direccion": "Calle Falsa 123", "password": "password123"}' && \

# POST /sesion
echo "Ejecutando POST /sesion"
curl -X POST http://127.0.0.1:5000/sesion \
     -H "Content-Type: application/json" \
     -d '{"email": "juan@example.com", "password": "password123"}' && \

# GET /obtener_fincas_usuario?id_usuario=12345678
echo "Ejecutando GET /obtener_fincas_usuario?id_usuario=12345678"
curl -X GET "http://127.0.0.1:5000/obtener_fincas_usuario?id_usuario=12345678" && \

# POST /agregar_finca
echo "Ejecutando POST /agregar_finca"
curl -X POST http://127.0.0.1:5000/agregar_finca \
     -H "Content-Type: application/json" \
     -d '{"usuario": "12345678", "nombre": "Finca Prueba"}' && \

# DELETE /eliminar_finca
echo "Ejecutando DELETE /eliminar_finca"
curl -X DELETE http://127.0.0.1:5000/eliminar_finca \
     -H "Content-Type: application/json" \
     -d '{"index": 1}' && \

# GET /obtener-productos-carrito/12345678
echo "Ejecutando GET /obtener-productos-carrito/12345678"
curl -X GET http://127.0.0.1:5000/obtener-productos-carrito/12345678 && \

# POST /agregar-producto-carrito
echo "Ejecutando POST /agregar-producto-carrito"
curl -X POST http://127.0.0.1:5000/agregar-producto-carrito \
     -H "Content-Type: application/json" \
     -d '{"IDUsuario": "12345678", "IDProducto": "ABC123"}' && \

# DELETE /eliminar-producto-carrito/12345678/ABC123
echo "Ejecutando DELETE /eliminar-producto-carrito/12345678/ABC123"
curl -X DELETE http://127.0.0.1:5000/eliminar-producto-carrito/12345678/ABC123
