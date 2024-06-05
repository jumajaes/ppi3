Conexion odbc ms server bd
--instala python ultima version
crea la carpeta donde quieres tener el proyecto
--pip install virtualenv
--python -m virtualenv .
--cd scripts
--activate.bat
--pip install setuptools
--pip install wheel
--pip install pyodbc
creas el archivo .py con odbc ej base : 
                            import pyodbc;

                        try:
                            conexion = pyodbc.connect('DRIVER={ODBC Driver 18 for SQL Server};SERVER=DESKTOP-6KPVJGE\\J;DATABASE=bioprep;UID=sa;PWD=1234;TrustServerCertificate=yes;')
                            cursor = conexion.cursor()
                            cursor.execute('SELECT * FROM usuarios')
                            row = cursor.fetchall()
                            print(row)
                        except Exception as ex:
                            print("Error durante la conexión: {}".format(ex))
                        finally:
                            conexion.close()  # Se cerró la conexión a la BD.
                            print("La conexión ha finalizado.")

                            
-- python src/Conexion.py
------------------
deactivate.bat

-----------------------------------------------
BACK 

flask --app src/Conexion.py run --debug  