import pyodbc
import hashlib
#Conexion----------------------------------------------------------------------------------------------------------------------------

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

#Usuarios----------------------------------------------------------------------------------------------------------------------------

def crear_usuario(cedula, nombre, apellido, telefono, email, rol, edad, direccion, password ):
    try:
        print(rol)
        conexion = conectar()
        if conexion:
            cursor = conexion.cursor()
            cursor.execute(
                'INSERT INTO users (id, name, last_name, phone, email, rol, age, address, password ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                (cedula, nombre, apellido, telefono, email, rol, edad, direccion,hashlib.sha256(password.encode('utf-8')).hexdigest()  )
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
        print(datos_usuario , "&&")
        conexion = conectar()

        cursor = conexion.cursor()
        if 'oldPassword' in datos_usuario:
            cursor.execute("""
                UPDATE users 
                SET name = ?, last_name = ?, age = ?, phone = ?, email = ?, address = ?, password = ?
                WHERE id = ?;
            """, (datos_usuario['nombre'], datos_usuario['apellido'], datos_usuario['edad'], datos_usuario['telefono'], datos_usuario['email'], datos_usuario['direccion'], hashlib.sha256(datos_usuario['password'].encode('utf-8')).hexdigest(), datos_usuario['cedula']))
        else:
            cursor.execute("""
                UPDATE users 
                SET name = ?, last_name = ?, age = ?, phone = ?, email = ?, address = ?
                WHERE id = ?;
            """, (datos_usuario['nombre'], datos_usuario['apellido'], datos_usuario['edad'], datos_usuario['telefono'], datos_usuario['email'], datos_usuario['direccion'], datos_usuario['cedula']))

        conexion.commit()
        return {"exito": True, "mensaje": "Datos actualizados correctamente"}

    except Exception as ex:
        print("Error al actualizar datos del usuario:", ex)
        return {"exito": False, "error": "Error al actualizar datos del usuario"}

    finally:
            conexion.close()

def verificar_existencia_correo(email):
    try:
        conexion = conectar()
        if conexion:
            cursor = conexion.cursor()
            cursor.execute('SELECT email FROM users WHERE email = ?', (email))
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
            cursor.execute('SELECT COUNT(*) FROM users WHERE id = ?', (cedula,))
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
            cursor.execute('SELECT COUNT(*) FROM users WHERE phone = ?', (telefono,))
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
        cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
        usuario_row = cursor.fetchone()  

        if usuario_row:
           
            usuario = {
                'cedula': usuario_row[0],
                'nombre': usuario_row[1],
                'apellido': usuario_row[2],
                'telefono': usuario_row[3],
                'email': usuario_row[4],
                'rol': usuario_row[5],
                'edad': usuario_row[6],
                'direccion': usuario_row[7],
                'password': usuario_row[8],
            }
            print(usuario_row[0])
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
    print(hashlib.sha256(password_ingresada.encode('utf-8')).hexdigest())
    print(password_bd)
   
    return password_bd == hashlib.sha256(password_ingresada.encode('utf-8')).hexdigest()

#Productos----------------------------------------------------------------------------------------------------------------------------

def obtener_productos():
    json_productos = []
    try:
        conexion = conectar()
        cursor = conexion.cursor()
        cursor.execute('''
            SELECT p.*, f.name as farm_name, c.category AS categoy_name
            FROM products AS p
            JOIN farms AS f ON p.id_farm = f.id
            JOIN categories AS c ON p.category = c.id
        ''')
        rows = cursor.fetchall()
        print("....")
        for tup in rows:
            print(tup[7])
            json_productos.append({
                "id": tup[0],
                "name": tup[1],
                "price": float(tup[2]),
                "description": tup[3],
                "image": tup[4],
                "id_farm": tup[6],
                "category": tup[5],
                "contact": tup[7],
                "name_farm": tup[8],
                "name_category": tup[9]
            })
            
    except Exception as ex:
        print("Error durante la conexión: {}".format(ex))
   
    print(json_productos)
    return json_productos

def agregar_producto(producto):
    print(producto)
    try:
        conexion = conectar()
        print(producto)
        cursor = conexion.cursor()
        cursor.execute("""
            INSERT INTO products (name, price, description, image, id_farm, category, contact)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (producto['Nombre'], producto['Precio'], producto['Descripcion'], producto['Imagen'], producto['IDFinca'], producto['Categoria'], producto['contacto'] )
        )

        conexion.commit()

        return {"isCorrect": True, "message": "Producto agregado exitosamente"}

    except Exception as ex:
        print("Error al agregar el producto:", ex)
        return {"isCorrect": False, "error": "Error al agregar el producto"}

    finally:
        if 'conexion' in locals():
            conexion.close()
            
def eliminar_producto_por_id(id):
    try:
        conexion = conectar()

        cursor = conexion.cursor()
        
        cursor.execute("DELETE FROM products WHERE id = ?", id)
        
        conexion.commit()
        cursor.close()
        
        return True, None
    except Exception as e:
        return False, str(e)
    
def actualizar_producto_por_id(producto_id, producto):
    print(producto)
    print(producto_id)
    try:
        
        conexion = conectar()

        cursor = conexion.cursor()
        
        conexion = conectar()

        cursor = conexion.cursor()
        
        cursor.execute("UPDATE products SET name = ?, price = ?, description = ?, category = ?, image = ? WHERE id_farm = ? AND id = ?",
            (
                producto['Nombre'],
                int(producto['Precio']),
                producto['Descripcion'],
                producto['Categoria'],
                producto['Imagen'],
                producto['IDFinca'],
                producto_id
            )
        )
        
        conexion.commit()
        cursor.close()
        
        return True, None
    except Exception as e:
        return False, str(e)

#Fincas----------------------------------------------------------------------------------------------------------------------------

def agregar_finca(id_usuario, nombre_finca):
    try:
        conexion = conectar()
        print(id_usuario, nombre_finca)
        cursor = conexion.cursor()
        cursor.execute("""
            INSERT INTO farms (id_owner, name)
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
        cursor.execute("DELETE FROM farms WHERE id = ?",id_finca)

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
            SELECT * FROM farms
            WHERE id_owner = ?
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
            SELECT * FROM farms
            WHERE id = ?
        """, (id))
        
        filasx = cursor.fetchall()
        def tuple_to_list_of_lists(tup):
             return [list(tup[0])]
        
        filas = tuple_to_list_of_lists(filasx)
        
        dueño =  obtener_telefonodueno(filas[0][3])
                
        return {"exito": True, "tel": dueño['fincas'][0][3]}
        
    except Exception as ex:
        print("Error al obtener las fincas del usuario:", ex)
        return {"exito": False, "error": "Error al obtener las fincas del usuario"}

    finally:
        if 'conexion' in locals():
            conexion.close()
            
def obtener_telefonodueno(id):
    try:
        conexion = conectar()

        cursor = conexion.cursor()
        cursor.execute("""
            SELECT * FROM users
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