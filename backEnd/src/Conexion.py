from flask import Flask, jsonify, request
import json
from flask_cors import CORS
import pyodbc
import sentencias

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route("/products")
def productos():
    return json.dumps(sentencias.obtener_productos(), indent=4)


@app.route("/agregar_producto", methods=["POST"])
def add_product():
    response = sentencias.agregar_producto(request.json)
    if response["isCorrect"]:
        return jsonify(response), 200
    else:
        return jsonify(response), 400


@app.route("/eliminar-producto/<string:id>", methods=["DELETE"])
def eliminar_producto_endpoint(id):
    success, error = sentencias.eliminar_producto_por_id(id)
    if success:
        return (
            jsonify({"mensaje": f"Producto con ID {id} eliminado correctamente"}),
            200,
        )
    else:
        return jsonify({"error": f"No se pudo eliminar el producto: {error}"}), 400


@app.route("/editar_producto/<string:producto_id>", methods=["PUT"])
def editar_producto_endpoint(producto_id):
    producto = request.get_json()
    success, error = sentencias.actualizar_producto_por_id(producto_id, producto)
    if success:
        return (
            jsonify(
                {"mensaje": f"Producto con ID {producto_id} actualizado correctamente"}
            ),
            200,
        )
    else:
        return (
            jsonify(
                {"error": f"No se pudo actualizar el producto: {producto_id} / {error}"}
            ),
            500,
        )


@app.route("/registrar-usuario", methods=["POST"])
def registrar_usuario():
    datos_usuario = request.json

    if sentencias.verificar_existencia_cedula(datos_usuario["cedula"]):
        return (
            jsonify(
                {"error": "La cédula ya está registrada, Solicita recuperar contraseña"}
            ),
            400,
        )

    if sentencias.verificar_existencia_correo(datos_usuario["email"]):
        return (
            jsonify(
                {
                    "error": "El correo electrónico ya está registrado. Solicita recuperar contraseña"
                }
            ),
            400,
        )

    if sentencias.verificar_existencia_telefono(datos_usuario["telefono"]):
        return (
            jsonify(
                {
                    "error": "El teléfono ya está registrado, Solicita recuperar contraseña"
                }
            ),
            400,
        )

    try:
        print(datos_usuario)

        exito = sentencias.crear_usuario(
            datos_usuario["cedula"],
            datos_usuario["nombre"],
            datos_usuario["apellido"],
            datos_usuario["telefono"],
            datos_usuario["email"],
            datos_usuario["rol"],
            datos_usuario["edad"],
            datos_usuario["direccion"],
            datos_usuario["password"],
        )
        if exito:
            return jsonify({"mensaje": "Usuario registrado correctamente"}), 200
        else:
            return jsonify({"error": "Error al registrar el usuario"}), 500
    except Exception as ex:
        print("Error al registrar usuario:", ex)
        return (
            jsonify(
                {
                    "error": "Ha ocurrido un error al registrar el usuario. Por favor, inténtalo nuevamente."
                }
            ),
            500,
        )


@app.route("/sesion", methods=["POST"])
def iniciar_sesion():
    datos_login = request.json

    email = datos_login.get("email")
    password = datos_login.get("password")

    print(datos_login)
    if email:
        if sentencias.verificar_existencia_correo(email):
            usuario = sentencias.obtener_usuario_por_correo(email)
            print(usuario)
            if usuario and sentencias.verificar_contrasena(
                usuario["password"], password
            ):
                return (
                    jsonify(
                        {
                            "exito": True,
                            "mensaje": "Inicio de sesión exitoso",
                            "usuario": usuario,
                        }
                    ),
                    200,
                )
            else:
                return jsonify({"exito": False, "error": "Contraseña incorrecta"}), 400
        else:
            return (
                jsonify({"exito": False, "error": "Correo electrónico no encontrado"}),
                400,
            )
    else:
        return (
            jsonify(
                {"exito": False, "error": "Debe proporcionar un correo electrónico"}
            ),
            400,
        )


@app.route("/actualizar-usuario", methods=["POST"])
def actualizar_usuario():
    datos_usuario = request.json
    print(datos_usuario)
    resultado = sentencias.actualizar_datos_usuario(datos_usuario)

    return jsonify(resultado)


@app.route("/obtener_fincas_usuario", methods=["GET"])
def obtener_fincas_usuario():
    id_usuario_str = request.args.get("id_usuario")
    if id_usuario_str is None:
        return {"exito": False, "error": "Falta el ID del usuario"}
    try:
        print(id_usuario_str)
        id_usuario = id_usuario_str
    except ValueError:
        return {"exito": False, "error": ""}
    print(id_usuario)
    resultado = sentencias.obtener_fincas_usuario(id_usuario)
    print(resultado)
    return jsonify(resultado)


@app.route("/getFarmsUser/", methods=["GET"])
def obtener_nombrefincas():
    idfarm = request.args.get("id")
    resultado = sentencias.obtener_nombrefincas(idfarm)
    resultado["tel"]
    return resultado["tel"]


@app.route("/agregar_finca", methods=["POST"])
def agregar_finca():
    data = request.get_json()

    id_usuario = data.get("usuario")
    nombre_finca = data.get("nombre")

    resultado = sentencias.agregar_finca(id_usuario, nombre_finca)
    print(resultado)
    return jsonify(resultado)


@app.route("/eliminar_finca", methods=["DELETE"])
def eliminar_finca():
    id_finca = request.json.get("index")
    print(id_finca)
    if not id_finca:
        return {"exito": False, "error": "Falta el ID de la finca"}

    resultado = sentencias.eliminar_finca(id_finca)

    return jsonify(resultado)


# Carrito---------------------------------------------------------------------------------------------------------------------------------


def conectar():
    try:
        conexion = pyodbc.connect(
            "DRIVER={ODBC Driver 18 for SQL Server};"
            "SERVER=localhost,1433;"
            "DATABASE=bioprep;"
            "UID=sa;"
            "PWD=YourStrong!Passw0rd;"
            "TrustServerCertificate=yes;"
        )
        return conexion
    except pyodbc.Error as ex:
        print("Error de conexión:", ex)
        return None


@app.route("/obtener-productos-carrito/<int:id_usuario>", methods=["GET"])
def obtener_productos_carrito(id_usuario):
    try:
        conexion = conectar()
        if conexion:
            cursor = conexion.cursor()

            cursor.execute("SELECT * FROM car WHERE IDUsuario=?", (id_usuario))
            productos_carrito = cursor.fetchall()

            productos_carrito = [
                dict(zip([column[0] for column in cursor.description], row))
                for row in productos_carrito
            ]

            conexion.close()
            return jsonify(productos_carrito)
        else:
            return jsonify({"error": "Error de conexión a la base de datos"})
    except Exception as e:
        return jsonify({"error": str(e)})


@app.route("/agregar-producto-carrito", methods=["POST"])
def agregar_producto_carrito():
    try:
        datos_producto = request.json
        id_usuario = datos_producto["IDUsuario"]
        id_producto = datos_producto["IDProducto"]

        conexion = conectar()
        if conexion:
            cursor = conexion.cursor()
            cursor.execute(
                "INSERT INTO car (IDUsuario, IDProducto) VALUES (?, ?)",
                (id_usuario, id_producto),
            )
            conexion.commit()
            conexion.close()
            return jsonify({"mensaje": "Producto agregado al carrito correctamente"})
        else:
            return jsonify({"error": "Error de conexión a la base de datos"})
    except Exception as e:
        return jsonify({"error": str(e)})


@app.route(
    "/eliminar-producto-carrito/<int:id_usuario>/<string:id_producto>",
    methods=["DELETE"],
)
def eliminar_producto_carrito(id_usuario, id_producto):
    print(id_usuario, id_producto, "Datos recibidos para eliminar producto")
    try:
        conexion = conectar()
        if conexion:
            cursor = conexion.cursor()
            print(
                "DELETE FROM car WHERE IDUsuario=? AND IDProducto=?",
                id_usuario,
                id_producto,
            )
            cursor.execute(
                "DELETE FROM car WHERE IDUsuario=? AND IDProducto=?",
                (id_usuario, id_producto),
            )
            conexion.commit()
            conexion.close()
            return jsonify({"mensaje": "Producto eliminado del carrito correctamente"})
        else:
            return jsonify({"error": "Error de conexión a la base de datos"})
    except Exception as e:
        print("Error al eliminar producto:", str(e))
        return jsonify({"error": "Error al eliminar el producto", "detalles": str(e)})


if __name__ == "__main__":
    app.run(debug=True)
