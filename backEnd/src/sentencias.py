import pyodbc

def conectar():
    try:
        conexion = pyodbc.connect('DRIVER={ODBC Driver 18 for SQL Server};SERVER=DESKTOP-6KPVJGE\\J;DATABASE=bioprep;UID=sa;PWD=1234;TrustServerCertificate=yes;')
        return conexion
    except pyodbc.Error as ex:
        print("Error de conexión:", ex)
        return None


def crear_usuario(cedula, nombre, apellido, edad, email, telefono, direccion, rol, password):
    try:
        conexion = conectar()
        if conexion:
            cursor = conexion.cursor()
            cursor.execute(
                'INSERT INTO usuarios (cedula, nombre, apellido, edad, email, telefono, direccion, rol, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                (cedula, nombre, apellido, edad, email, telefono, direccion, rol, password)
            )
            conexion.commit()
            return True
    except pyodbc.Error as ex:
        print("Error al crear usuario:", ex)
        return False
    finally:
        if 'conexion' in locals() and conexion:
            conexion.close()
    return False

def actualizar_datos_usuario(datos_usuario):
    try:
        # Conexión a la base de datos
        conn = conectar()
        cursor = conn.cursor()

        # Actualizar los datos del usuario en la tabla correspondiente
        cursor.execute(f"UPDATE usuarios SET nombre = '{datos_usuario['nombre']}', "
         f"apellido = '{datos_usuario['apellido']}', "
         f"edad = {datos_usuario['edad']}, "
         f"telefono = {datos_usuario['telefono']}, "
         f"email = '{datos_usuario['email']}', "
         f"direccion = '{datos_usuario['direccion']}', "
         f"password = {datos_usuario['password']} "
         f"WHERE id = {datos_usuario['id']};")

        # Confirmar la transacción y cerrar la conexión
        conn.commit()
    
        conn.close()

        # Devolver un mensaje de éxito u otra respuesta deseada
        return {'mensaje': 'Los datos del usuario han sido actualizados correctamente'}
    except Exception as e:
        # Manejar cualquier excepción que pueda ocurrir durante el proceso de actualización
        return {'error': str(e)}


#____________________________________________________________________________

def obtener_productos():
    json_productos = []
    try:
        conexion = conectar()
        cursor = conexion.cursor()
        cursor.execute('''
            SELECT p.id, p.nombre, p.precio, p.categoria_id, p.descripcion, p.img, c.nombre AS nombre_categoria, IDFinca
            FROM productos AS p
            JOIN categorias AS c ON p.categoria_id = c.id;
        ''')
        rows = cursor.fetchall()
        
        for tup in rows:
            json_productos.append({
                "id": tup[0],
                "IDFinca": tup[7],
                "nombre": tup[1],
                "precio": float(tup[2]),
                "categoria_id": tup[3],
                "nombre_categoria": tup[6],  
                "descripcion": tup[4],
                "img": tup[5]
            })
            
    except Exception as ex:
        print("Error durante la conexión: {}".format(ex))
    finally:
        conexion.close()

    return json_productos


def agregar_producto(producto):
    try:
        conexion = conectar()
        print(producto)
        cursor = conexion.cursor()
        cursor.execute("""
            INSERT INTO productos (nombre, precio, categoria_id, descripcion, img, IDFinca)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (producto['Nombre'], producto['Precio'], int(producto['Categoría']), producto['Descripción'], producto['Imagen'], int(producto['IDFinca'])))

        conexion.commit()

        return {"exito": True, "mensaje": "Producto agregado exitosamente"}

    except Exception as ex:
        print("Error al agregar el producto:", ex)
        return {"exito": False, "error": "Error al agregar el producto"}

    finally:
        if 'conexion' in locals():
            conexion.close()
            
def eliminar_producto_por_id(id):
    try:
        conexion = conectar()

        cursor = conexion.cursor()
        
        # Ejecutar la sentencia SQL para eliminar el producto
        cursor.execute("DELETE FROM productos WHERE id = ?", id)
        
        # Confirmar la transacción y cerrar el cursor
        conexion.commit()
        cursor.close()
        
        return True, None
    except Exception as e:
        return False, str(e)
    
def actualizar_producto_por_id(producto_id, producto):
    print(producto)

    print(producto['Nombre'], producto['Precio'], producto['Categoría'], producto['Descripción'], producto['Imagen'], producto['IDFinca'], producto_id)
    try:
        
        conexion = conectar()

        cursor = conexion.cursor()
        
        # Ejecutar la sentencia SQL para eliminar el producto
        conexion = conectar()

        cursor = conexion.cursor()
        
        # Ejecutar la sentencia SQL para eliminar el producto
        cursor.execute("UPDATE productos SET nombre = ?, precio = ?, categoria_id = ?, descripcion = ?, img = ? WHERE IDFinca = ? AND id = ?", 
        (producto['Nombre'], int(producto['Precio']), producto['Categoría'], producto['Descripción'], producto['Imagen'], producto['IDFinca'], producto_id))

        # Confirmar la transacción y cerrar el cursor
        conexion.commit()
        cursor.close()
        
        return True, None
    except Exception as e:
        return False, str(e)
    
    
    
    
    
    
    
    
    
    
    
    
    
#----------------------------------------------------------------------------------
def verificar_existencia_correo(email):
    try:
        conexion = conectar()
        if conexion:
            cursor = conexion.cursor()
            cursor.execute('SELECT email FROM usuarios WHERE email = ?', (email))
            usuario = cursor.fetchone()
            return usuario is not None
    except pyodbc.Error as ex:
        print("Error al verificar existencia de correo:", ex)
        return False
    finally:
        if 'conexion' in locals() and conexion:
            conexion.close()
    return False

def verificar_contrasena_por_correo(email, password):
    try:
        conexion = conectar()
        if conexion:
            cursor = conexion.cursor()
            cursor.execute('SELECT passw FROM usuarios WHERE email = ?', (email))
            usuario = cursor.fetchone()
            if usuario and usuario[0] == password:
                return True
            else:
                return False
    except pyodbc.Error as ex:
        print("Error al verificar contraseña por correo:", ex)
        return False
    finally:
        if 'conexion' in locals() and conexion:
            conexion.close()
    return False

def verificar_existencia_cedula(cedula):
    try:
        conexion = conectar()
        if conexion:
            cursor = conexion.cursor()
            cursor.execute('SELECT COUNT(*) FROM usuarios WHERE cedula = ?', (cedula,))
            count = cursor.fetchone()[0]
            return count > 0
    except pyodbc.Error as ex:
        print("Error al verificar existencia de cédula:", ex)
        return False
    finally:
        if 'conexion' in locals() and conexion:
            conexion.close()
    return False

def verificar_existencia_telefono(telefono):
    try:
        conexion = conectar()
        if conexion:
            cursor = conexion.cursor()
            cursor.execute('SELECT COUNT(*) FROM usuarios WHERE telefono = ?', (telefono,))
            count = cursor.fetchone()[0]
            return count > 0
    except pyodbc.Error as ex:
        print("Error al verificar existencia de teléfono:", ex)
        return False
    finally:
        if 'conexion' in locals() and conexion:
            conexion.close()
    return False

def obtener_usuario_por_correo(email):
    try:
        conexion = conectar()

        cursor = conexion.cursor()
        cursor.execute("SELECT * FROM usuarios WHERE email = ?", (email,))
        usuario_row = cursor.fetchone()  # Obtenemos la primera fila del resultado

        if usuario_row:
            # Convertir la fila del usuario en un diccionario
            usuario = {
                'id': usuario_row[0],
                'cedula': usuario_row[1],
                'nombre': usuario_row[2],
                'apellido': usuario_row[3],
                'telefono': usuario_row[4],
                'email': usuario_row[5],
                'password': usuario_row[6],
                'rol': usuario_row[7],
                'edad': usuario_row[8],
                'direccion': usuario_row[9]
            }
            return usuario  # Devolvemos el usuario encontrado

        else:
            return None  # No se encontró ningún usuario con el correo electrónico dado

    except Exception as ex:
        print("Error al obtener usuario por correo:", ex)
        return None

    finally:
        if 'conexion' in locals():
            conexion.close()  # Cerramos la conexión



def verificar_contrasena(password_bd, password_ingresada):
   
    return password_bd == password_ingresada


def actualizar_datos_usuario(datos_usuario):
    try:
        conexion = conectar()

        cursor = conexion.cursor()
        if 'nueva_contrasena' in datos_usuario:
            cursor.execute("""
                UPDATE usuarios 
                SET nombre = ?, apellido = ?, edad = ?, telefono = ?, email = ?, direccion = ?, password = ?
                WHERE id = ?;
            """, (datos_usuario['nombre'], datos_usuario['apellido'], datos_usuario['edad'], datos_usuario['telefono'], datos_usuario['email'], datos_usuario['direccion'], datos_usuario['nueva_contrasena'], datos_usuario['id']))
        else:
            cursor.execute("""
                UPDATE usuarios 
                SET nombre = ?, apellido = ?, edad = ?, telefono = ?, email = ?, direccion = ?
                WHERE id = ?;
            """, (datos_usuario['nombre'], datos_usuario['apellido'], datos_usuario['edad'], datos_usuario['telefono'], datos_usuario['email'], datos_usuario['direccion'], datos_usuario['id']))

        conexion.commit()
        return {"exito": True, "mensaje": "Datos actualizados correctamente"}

    except Exception as ex:
        print("Error al actualizar datos del usuario:", ex)
        return {"exito": False, "error": "Error al actualizar datos del usuario"}

    finally:
        if 'conexion' in locals():
            conexion.close()
            
            
            
            
            
            
            
            
            
            
            
#____________________________________________________________
def agregar_finca(id_usuario, nombre_finca):
    try:
        conexion = conectar()
        print(id_usuario, nombre_finca)
        cursor = conexion.cursor()
        cursor.execute("""
            INSERT INTO Fincas (IDDueño, nombre)
            VALUES (?, ?)
        """, (id_usuario, nombre_finca))

        conexion.commit()

        return {"exito": True, "mensaje": "Finca agregada exitosamente"}

    except Exception as ex:
        print("Error al agregar la finca:", ex)
        return {"exito": False, "error": str(ex)}

    finally:
        if 'conexion' in locals():
            conexion.close()


def eliminar_finca(id_finca):
    try:
        conexion = conectar()

        cursor = conexion.cursor()
        cursor.execute("DELETE FROM Fincas WHERE ID = ?",id_finca)

        conexion.commit()

        return {"exito": True, "mensaje": "Finca eliminada exitosamente"}

    except Exception as ex:
        print("Error al eliminar la finca:", ex)
        return {"exito": False, "error": "Error al eliminar la finca"}

    finally:
        if 'conexion' in locals():
            conexion.close()


def obtener_fincas_usuario(id_usuario):
    try:
        conexion = conectar()

        cursor = conexion.cursor()
        cursor.execute("""
            SELECT * FROM Fincas
            WHERE IDDueño = ?
        """, (id_usuario,))

        # Obtiene los nombres de las columnas
        columnas = [columna[0] for columna in cursor.description]

        # Obtiene las filas como tuplas
        filas = cursor.fetchall()

        # Convierte cada fila en un objeto
        fincas = [dict(zip(columnas, fila)) for fila in filas]

        print(fincas)
        return {"exito": True, "fincas": fincas}
        
    except Exception as ex:
        print("Error al obtener las fincas del usuario:", ex)
        return {"exito": False, "error": "Error al obtener las fincas del usuario"}

    finally:
        if 'conexion' in locals():
            conexion.close()

