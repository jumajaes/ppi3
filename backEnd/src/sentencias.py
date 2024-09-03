import pyodbc

def conectar():
    try:
        conexion = pyodbc.connect('DRIVER={ODBC Driver 18 for SQL Server};'
    'SERVER=localhost,1433;'
    'DATABASE=bioprep;'
    'UID=sa;'
    'PWD=YourStrong!Passw0rd;'
    'TrustServerCertificate=yes;'
)
        return conexion
    except pyodbc.Error as ex:
        print("Error de conexión:", ex)
        return None


def crear_usuario(cedula, nombre, apellido, telefono, email, rol, edad, direccion, password ):
    try:
        conexion = conectar()
        if conexion:
            cursor = conexion.cursor()
            cursor.execute(
                'INSERT INTO usuarios (cedula, nombre, apellido, telefono, email, rol, edad, direccion, password ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                (cedula, nombre, apellido, telefono, email, rol, edad, direccion, password )
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
        print(datos_usuario)
        conexion = conectar()

        cursor = conexion.cursor()
        if 'oldPassword' in datos_usuario:
            cursor.execute("""
                UPDATE usuarios 
                SET nombre = ?, apellido = ?, edad = ?, telefono = ?, email = ?, direccion = ?, password = ?
                WHERE id = ?;
            """, (datos_usuario['nombre'], datos_usuario['apellido'], datos_usuario['edad'], datos_usuario['telefono'], datos_usuario['email'], datos_usuario['direccion'], datos_usuario['password'], datos_usuario['id']))
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
            conexion.close()

def obtener_productos():
    json_productos = []
    try:
        conexion = conectar()
        cursor = conexion.cursor()
        cursor.execute('''
            SELECT p.producto_id, p.Nombre, p.Precio, p.Categoría, p.Descripción, p.Imagen, p.IDFinca
            FROM productos AS p
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
        
        cursor.execute("DELETE FROM productos WHERE id = ?", id)
        
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
        
        conexion = conectar()

        cursor = conexion.cursor()
        
        cursor.execute("UPDATE productos SET nombre = ?, precio = ?, categoria_id = ?, descripcion = ?, img = ? WHERE IDFinca = ? AND id = ?", 
        (producto['Nombre'], int(producto['Precio']), producto['Categoría'], producto['Descripción'], producto['Imagen'], producto['IDFinca'], producto_id))

        
        conexion.commit()
        cursor.close()
        
        return True, None
    except Exception as e:
        return False, str(e)


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
        usuario_row = cursor.fetchone()  

        if usuario_row:
           
            usuario = {
                'id': usuario_row[0],
                'cedula': usuario_row[1],
                'nombre': usuario_row[2],
                'apellido': usuario_row[3],
                'telefono': usuario_row[4],
                'email': usuario_row[5],
                'password': usuario_row[9],
                'rol': usuario_row[6],
                'edad': usuario_row[7],
                'direccion': usuario_row[8]
            }
            return usuario  

        else:
            return None 

    except Exception as ex:
        print("Error al obtener usuario por correo:", ex)
        return None

    finally:
        if 'conexion' in locals():
            conexion.close() 



def verificar_contrasena(password_bd, password_ingresada):
   
    return password_bd == password_ingresada

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
        """, (id_usuario))

        columnas = [columna[0] for columna in cursor.description]

        filas = cursor.fetchall()

        fincas = [dict(zip(columnas, fila)) for fila in filas]

        print(fincas)
        return {"exito": True, "fincas": fincas}
        
    except Exception as ex:
        print("Error al obtener las fincas del usuario:", ex)
        return {"exito": False, "error": "Error al obtener las fincas del usuario"}

    finally:
        if 'conexion' in locals():
            conexion.close()

def obtener_nombrefincas(id):
    try:
        
        conexion = conectar()

        cursor = conexion.cursor()
        cursor.execute("""
            SELECT * FROM Fincas
            WHERE ID = ?
        """, (id))
        
        filasx = cursor.fetchall()
        def tuple_to_list_of_lists(tup):
             return [list(tup[0])]
        
        filas = tuple_to_list_of_lists(filasx)
        
        dueño =  obtener_telefonodueño(filas[0][1])
        
        
        
        return {"exito": True, "tel": dueño['fincas'][0][4]}
        
    except Exception as ex:
        print("Error al obtener las fincas del usuario:", ex)
        return {"exito": False, "error": "Error al obtener las fincas del usuario"}

    finally:
        if 'conexion' in locals():
            conexion.close()
            
def obtener_telefonodueño(id):
    try:
        
        conexion = conectar()

        cursor = conexion.cursor()
        cursor.execute("""
            SELECT * FROM usuarios
            WHERE id = ?
        """, (id))
        
        filasx = cursor.fetchall()
        def tuple_to_list_of_lists(tup):
             return [list(tup[0])]
        
        filas = tuple_to_list_of_lists(filasx)
        
        return {"exito": True, "fincas": filas}
        
    except Exception as ex:
        print("Error al obtener las fincas del usuario:", ex)
        return {"exito": False, "error": "Error al obtener las fincas del usuario"}

    finally:
        if 'conexion' in locals():
            conexion.close()