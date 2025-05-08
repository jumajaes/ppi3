Conexion odbc ms server bd
--instala python ultima version
crea la carpeta donde quieres tener el proyecto
--pip install virtualenv (es un entorno virtual)
--python -m virtualenv .
--cd scripts
--activate ((en bash y en la ultimaversion que utilicé de python me aprece deprecado recomienda usar 'conda activate'))
(si falle reinstala los archivos de venv ...  
../ppi3 (main) $ python -m venv /workspaces/ppi3/backEnd
../ppi3 (main) $ source /workspaces/ppi3/backEnd/Scripts/activate)(bash)
--pip install setuptools
--pip install wheel
--pip install pyodbc
--pip install Flask

-- install docker desktop
-- comfigura el archivo docker-compose.yml 
    ejemplo: funcional 
    ------------------------------
    (
        services:
  sqlserver:
    image: mcr.microsoft.com/mssql/server
    container_name: sqlserver
    environment:
      - SA_PASSWORD=YourStrong!Passw0rd
      - ACCEPT_EULA=Y
    ports:
      - "1433:1433"
    volumes:
      - sqlserverdata:/var/opt/mssql
    user: root
    command: >
      /bin/bash -c "
      apt-get update &&
      apt-get install -y gnupg curl apt-transport-https &&
      curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - &&
      curl https://packages.microsoft.com/config/ubuntu/20.04/prod.list > /etc/apt/sources.list.d/mssql-release.list &&
      apt-get update &&
      ACCEPT_EULA=Y apt-get install -y msodbcsql17 mssql-tools &&
      echo 'export PATH=$PATH:/opt/mssql-tools/bin' >> ~/.bashrc &&
      chown -R mssql:mssql /var/opt/mssql &&
      su mssql -c '/opt/mssql/bin/sqlservr'
      "
volumes:
  sqlserverdata:

    )
en la carpeta src/bd/... 
-- en la ruta del .yml ejecuta un cmd descarga sql server
docker pull mcr.microsoft.com/mssql/server" (docker desktop debe estar corriendo) 
(si es desde codespace  
--docker exec -it sqlserver /bin/bash
--/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P 'pass en el .yml'

)
------- conecta la bd a un gestor de bd (Host 127.0.0.1, port 1433)
"SELECT name FROM sys.databases;"
"CREATE DATABASE bioprep;"
"use bioprep GO;"
"CREATE TABLE crear_usuarios (cedula INT PRIMARY KEY, nombre NVARCHAR(50), apellido NVARCHAR(50), telefono NVARCHAR(15), email NVARCHAR(50), rol NVARCHAR(20), edad INT, direccion NVARCHAR(100), password NVARCHAR(50));"
"CREATE TABLE agregar_fincas (id_finca INT PRIMARY KEY, id_usuario INT, nombre_finca NVARCHAR(50), FOREIGN KEY (id_usuario) REFERENCES crear_usuarios(cedula));" 
"CREATE TABLE producto (producto_id INT PRIMARY KEY, Nombre NVARCHAR(50), Precio DECIMAL(10, 2), Categoría NVARCHAR(50), Descripción NVARCHAR(255), Imagen NVARCHAR(255), IDFinca INT, FOREIGN KEY (IDFinca) REFERENCES agregar_fincas(id_finca));"


creas el archivo .py con odbc ej base : 
#from flask import Flask, jsonify, request 
#import json
#from flask_cors import CORS
#import pyodbc
#import sentencias


#app = Flask('__name__')
#CORS(app, resources={r"/*": {"origins": "*"}})
# def get_db_connection():
#     try:
#         conn = pyodbc.connect(
#     'DRIVER={ODBC Driver 18 for SQL Server};'
#     'SERVER=127.0.0.1,1433;'
#     'DATABASE=bioprep;'
#     'UID=sa;'
#     'PWD=YourStrong!Passw0rd;'
#     'TrustServerCertificate=yes;'
# )

#         return conn
#     except pyodbc.Error as e:
#         print("Error durante la conexión:", e)
#         return None

# @app.route('/productos')
# def productos():
#     conn = get_db_connection()
#     if conn is None:
#         return jsonify({"error": "Error al conectar con la base de datos"}), 500

#     try:
#         cursor = conn.cursor()
#         cursor.execute('SELECT * FROM producto;')
#         results = cursor.fetchall()
#         cursor.close()
#         conn.close()
#         print(results)
#         return jsonify(results)
#     except pyodbc.Error as e:
#         print("Error durante la consulta:", e)
#         return jsonify({"error": "Error durante la consulta"}), 500

# if __name__ == '__main__':
#     app.run(debug=True)

cd src                      
python Conexion.py
------------------
cd scripts
deactivate (en bash y en la ultimaversion que utilicé de python me aprece deprecado recomienda usar conda deactivate)

-----------------------------------------------
