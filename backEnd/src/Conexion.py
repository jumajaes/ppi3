from flask import Flask, request, jsonify 
import json
import sentencias
from flask_cors import CORS
import pyodbc


app = Flask('__name__')
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/productos')
def productos():
    return json.dumps(sentencias.obtener_productos(), indent=4)

@app.route('/agregar_producto', methods=['POST'])
def agregar_producto_endpoint():
    producto = request.json
    resultado = sentencias.agregar_producto(producto)
    return jsonify(resultado)

@app.route('/eliminar-producto/<int:id>', methods=['DELETE'])
def eliminar_producto_endpoint(id):
    success, error = sentencias.eliminar_producto_por_id(id)
    if success:
        return jsonify({"mensaje": f"Producto con ID {id} eliminado correctamente"}), 200
    else:
        return jsonify({"error": f"No se pudo eliminar el producto: {error}"}), 500
    
@app.route('/editar_producto/<int:producto_id>', methods=['PUT'])
def editar_producto_endpoint(producto_id):
    producto = request.get_json()
    print(producto)
    success, error = sentencias.actualizar_producto_por_id(producto_id, producto)
    if success:
        return jsonify({"mensaje": f"Producto con ID {producto_id} actualizado correctamente"}), 200
    else:
        return jsonify({"error": f"No se pudo actualizar el producto: {error}"}), 500

#---------------------------------------------------------------------------
@app.route('/registrar-usuario', methods=['POST'])
def registrar_usuario():
    datos_usuario = request.json
    
    # Verificar si la cédula ya existe en la base de datos
    if sentencias.verificar_existencia_cedula(datos_usuario['cedula']):
        return jsonify({"error": "La cédula ya está registrada, Solicita recuperar contraseña"}), 400
    
    # Verificar si el correo electrónico ya existe en la base de datos
    if sentencias.verificar_existencia_correo(datos_usuario['email']):
        return jsonify({"error": "El correo electrónico ya está registrado. Solicita recuperar contraseña"}), 400
    
    # Verificar si el teléfono ya existe en la base de datos
    if sentencias.verificar_existencia_telefono(datos_usuario['telefono']):
        return jsonify({"error": "El teléfono ya está registrado, Solicita recuperar contraseña"}), 400
    
    try:
        exito = sentencias.crear_usuario(
            datos_usuario['cedula'],
            datos_usuario['nombre'],
            datos_usuario['apellido'],
            datos_usuario['edad'],
            datos_usuario['email'],
            datos_usuario['telefono'],
            datos_usuario['direccion'],
            datos_usuario['rol'],
            datos_usuario['password']  # Aquí se asegura de pasar 'password' correctamente
        )
        if exito:
            return jsonify({"mensaje": "Usuario registrado correctamente"}), 200
        else:
            return jsonify({"error": "Error al registrar el usuario"}), 500
    except Exception as ex:
        print("Error al registrar usuario:", ex)
        return jsonify({"error": "Ha ocurrido un error al registrar el usuario. Por favor, inténtalo nuevamente."}), 500
#---------------------------------------------------------------------------

@app.route('/iniciar-sesion', methods=['POST'])
def iniciar_sesion():
    datos_login = request.json
    
    email = datos_login.get('email')
    password = datos_login.get('password')
    
    
    if email:
        if sentencias.verificar_existencia_correo(email):
            usuario = sentencias.obtener_usuario_por_correo(email)
            print(email,password, usuario['password'])
            if usuario and sentencias.verificar_contrasena(usuario['password'], password):
                return jsonify({"exito": True, "mensaje": "Inicio de sesión exitoso", "usuario": usuario}), 200
            else:
                return jsonify({"exito": False, "error": "Contraseña incorrecta"}), 400
        else:
            return jsonify({"exito": False, "error": "Correo electrónico no encontrado"}), 400
    else:
        return jsonify({"exito": False, "error": "Debe proporcionar un correo electrónico"}), 400

@app.route('/actualizar-usuario', methods=['POST'])
def actualizar_usuario():
    datos_usuario = request.json
    print(datos_usuario)
    resultado = sentencias.actualizar_datos_usuario(datos_usuario)
    #print(resultado)
    return jsonify(resultado)
#---------------------------------------------------------------------------

@app.route('/obtener_fincas_usuario', methods=['GET'])
def obtener_fincas_usuario():
    id_usuario_str = request.args.get('id_usuario')
    if id_usuario_str is None:
        return {"exito": False, "error": "Falta el ID del usuario"}
    try:
        id_usuario = int(id_usuario_str)
    except ValueError:
        return {"exito": False, "error": "El ID del usuario debe ser un número entero"}

    resultado = sentencias.obtener_fincas_usuario(id_usuario)
    print(resultado)
    return jsonify(resultado)


@app.route('/agregar_finca', methods=['POST'])
def agregar_finca():
    data = request.get_json()

    id_usuario = data.get('usuario')
    nombre_finca = data.get('nombre')
    
    resultado = sentencias.agregar_finca(id_usuario, nombre_finca)
    print(resultado)
    return jsonify(resultado)

@app.route('/eliminar_finca', methods=['DELETE'])
def eliminar_finca():
    id_finca = request.json.get('index')
    print(id_finca)
    if not id_finca:
        return {"exito": False, "error": "Falta el ID de la finca"}

    resultado = sentencias.eliminar_finca(id_finca)

    return jsonify(resultado)


#_______________________________________________----------------

def conectar():
    try:
        conexion = pyodbc.connect('DRIVER={ODBC Driver 18 for SQL Server};SERVER=DESKTOP-6KPVJGE\\J;DATABASE=bioprep;UID=sa;PWD=1234;TrustServerCertificate=yes;')
        return conexion
    except pyodbc.Error as ex:
        print("Error de conexión:", ex)
        return None

# Ruta para obtener todos los productos de un usuario específico en el carrito
@app.route('/obtener-productos-carrito/<int:id_usuario>', methods=['GET'])
def obtener_productos_carrito(id_usuario):
    try:
        conexion = conectar()
        if conexion:
            cursor = conexion.cursor()
            # Consultar la base de datos para obtener los productos en el carrito del usuario
            cursor.execute("SELECT * FROM Carrito WHERE IDUsuario=?", (id_usuario,))
            productos_carrito = cursor.fetchall()
            # Convertir los resultados a un formato serializable
            productos_carrito = [dict(zip([column[0] for column in cursor.description], row)) for row in productos_carrito]
            # Cerrar la conexión y devolver los productos como respuesta en formato JSON
            conexion.close()
            return jsonify(productos_carrito)
        else:
            return jsonify({"error": "Error de conexión a la base de datos"})
    except Exception as e:
        return jsonify({"error": str(e)})

# Ruta para agregar un producto al carrito de un usuario
@app.route('/agregar-producto-carrito', methods=['POST'])
def agregar_producto_carrito():
    try:
        # Obtener los datos del producto a agregar desde la solicitud POST
        datos_producto = request.json
        id_usuario = datos_producto['IDUsuario']
        id_producto = datos_producto['IDProducto']

        conexion = conectar()
        if conexion:
            cursor = conexion.cursor()
            # Insertar el producto en el carrito del usuario en la base de datos
            cursor.execute("INSERT INTO Carrito (IDUsuario, IDProducto) VALUES (?, ?)", (id_usuario, id_producto))
            conexion.commit()
            # Cerrar la conexión y devolver la confirmación de agregación
            conexion.close()
            return jsonify({"mensaje": "Producto agregado al carrito correctamente"})
        else:
            return jsonify({"error": "Error de conexión a la base de datos"})
    except Exception as e:
        return jsonify({"error": str(e)})

# Ruta para eliminar un producto del carrito de un usuario
@app.route('/eliminar-producto-carrito/<int:id_usuario>/<int:id_producto>', methods=['DELETE'])
def eliminar_producto_carrito(id_usuario, id_producto):
    try:
        conexion = conectar()
        if conexion:
            cursor = conexion.cursor()
            # Eliminar el producto del carrito del usuario en la base de datos
            cursor.execute("DELETE FROM Carrito WHERE IDUsuario=? AND IDProducto=?", (id_usuario, id_producto))
            conexion.commit()
            # Cerrar la conexión y devolver la confirmación de eliminación
            conexion.close()
            return jsonify({"mensaje": "Producto eliminado del carrito correctamente"})
        else:
            return jsonify({"error": "Error de conexión a la base de datos"})
    except Exception as e:
        return jsonify({"error": str(e)})

#--------------------------------------------------------------
if __name__ == '__main__':
    app.run(debug=True)
