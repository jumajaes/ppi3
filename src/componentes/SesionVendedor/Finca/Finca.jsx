import React, { useState, useEffect } from 'react';
import "./Finca.css"
import { useParams } from 'react-router-dom';
import { useData } from '../../../contexto/variables';
import { Producto } from "../../Producto/Producto";

export function Finca() {
    const opcionesCategoria = [
        { id: "", nombre: "Selecciona categoría / Ninguna" },
        { id: "1", nombre: "Abono" },
        { id: "2", nombre: "Fertilizante" },
        { id: "3", nombre: "Fungicida" },
        { id: "4", nombre: "Plaguicida" },
        { id: "5", nombre: "Herbicida" },
        { id: "6", nombre: "Nutridor" },
        { id: "7", nombre: "Hidratante" },
        { id: "8", nombre: "Calcio" }
    ];

    const { idFinca } = useParams();
    const { obtenerProductos } = useData();

    // Estado inicial del producto
    const productoInicial = { id: '', Nombre: '', Descripcion: '', Precio: '', Categoria: opcionesCategoria[0].id, Imagen: '', IDFinca: idFinca };
    var base64Data
    const [productos, setProductos] = useState([]);
    const [productoActual, setProductoActual] = useState(productoInicial);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        obtenerProductos().then((resolucion) => {
            setProductos(resolucion.filter((producto) => producto.id_finca === parseInt(idFinca)));
        }).catch((error) => {
            console.error('Error al obtener productos:', error);
        });
    }, [idFinca, obtenerProductos]);

    const handleCategoriaChange = (e) => {
        setProductoActual({ ...productoActual, Categoria: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        if (file && (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png')) {
            reader.onload = function (event) {
                base64Data = event.target.result;
                setProductoActual({ ...productoActual, Imagen: base64Data });
            };
            reader.readAsDataURL(file);
        } else {
            setError('La imagen debe ser un archivo JPG, JPEG o PNG.');
        }
    };

    const validarProducto = () => {
        if (!productoActual.Nombre || !productoActual.Descripcion || !productoActual.Precio) {
            return 'Todos los campos son obligatorios.';
        }
        if (isNaN(productoActual.Precio) || parseInt(productoActual.Precio) <= 0) {
            return 'El precio debe ser un número entero positivo.';
        }
        if (productoActual.Categoria === "") {
            return 'Debe seleccionar una categoría válida.';
        }
        return '';
    };

    const agregarProducto = () => {
        const errorMsg = validarProducto();
        if (errorMsg) {
            setError(errorMsg);
            return;
        }

        fetch(`http://localhost:5000/agregar_producto`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productoActual)
        })
            .then(response => response.json())
            .then(data => {
                obtenerProductos().then((resolucion) => {
                    setProductos(resolucion.filter((producto) => producto.id_finca === parseInt(idFinca)));
                }).catch((error) => {
                    console.error('Error al obtener productos:', error);
                });
                setProductoActual(productoInicial);
                setError('');
            });
    };

    const actualizarProducto = () => {
        console.log(productoActual.id, "&&&&&&&&&&&&&&&&&&")
        const errorMsg = validarProducto();
        if (errorMsg) {
            setError(errorMsg);
            return;
        }

        if (!productoActual.Imagen) {
            const productoExistente = productos.find((producto) => producto.producto_id === productoActual.id);
            if (productoExistente) {
                setProductoActual({ ...productoActual, Imagen: productoExistente.Imagen });
            }
        }
        fetch(`http://localhost:5000/editar_producto/${productoActual.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productoActual)
        })
            .then(response => response.json())
            .then(data => {
                obtenerProductos().then((resolucion) => {
                    setProductos(resolucion.filter((producto) => producto.id_finca === parseInt(idFinca)));
                }).catch((error) => {
                    console.error('Error al obtener productos:', error);
                });
                setProductoActual(productoInicial);
                setModoEdicion(false);
                setError(''); // Clear error after successful update
            });
    };

    const eliminarProducto = (id) => {
        fetch(`http://localhost:5000/eliminar-producto/${id}`, {
            method: 'DELETE'
        })
            .then(() => {
                const nuevosProductos = productos.filter((producto) => producto.id !== id);
                setProductos(nuevosProductos);
                obtenerProductos();
            });
    };

    const editarProducto = (producto) => {
        const idFincaNumero = parseInt(producto.id_finca);
        if (isNaN(idFincaNumero)) {
            console.error('IDFinca no es un número válido:', producto.id_finca);
            return;
        }

        const productoNormalizado = {
            id: producto.producto_id || '',
            Nombre: producto.nombre || '',
            Descripcion: producto.descripcion || '',
            Precio: producto.precio || '',
            Categoria: producto.categoria_id || '',
            Imagen: producto.iamgen || '',
            IDFinca: idFincaNumero
        };

        setProductoActual(productoNormalizado);
        setModoEdicion(true);
    };

    const resetProducto = () => {
        setModoEdicion(false);
        setProductoActual(productoInicial);
        setError('');
    };

    return (
        <div >
            {error && <div>{error}</div>}
            {modoEdicion ? (
                <div >
                    <h1>ID: {productoActual.id}</h1>
                    <div >
                        <h6>Nombre:</h6>
                        <input value={productoActual.Nombre} onChange={(e) => setProductoActual({ ...productoActual, Nombre: e.target.value })} placeholder="Nombre" required />
                        <h6>Descripción:</h6>
                        <input value={productoActual.Descripcion} onChange={(e) => setProductoActual({ ...productoActual, Descripcion: e.target.value })} placeholder="Descripción" required />
                        <h6>Precio:</h6>
                        <input value={productoActual.Precio} onChange={(e) => setProductoActual({ ...productoActual, Precio: e.target.value })} placeholder="Precio" required />
                    </div>
                    <h6>Categoria:</h6>
                    <select  value={productoActual.Categoria} onChange={handleCategoriaChange}>
                        {opcionesCategoria.map((opcion, index) => (
                            <option key={index} value={opcion.id}>{opcion.nombre}</option>
                        ))}
                    </select>
                    <input  type="file" onChange={handleImageChange} />
                    <button  onClick={resetProducto}>Cancelar</button>
                    <button  onClick={actualizarProducto}>Actualizar producto</button>
                </div>

            ) : (
                <>
                    <div >
                        <h1>Agregar producto:</h1>
                        <div >
                            <input value={productoActual.Nombre} onChange={(e) => setProductoActual({ ...productoActual, Nombre: e.target.value })} placeholder="Nombre" required />
                            <input value={productoActual.Descripcion} onChange={(e) => setProductoActual({ ...productoActual, Descripcion: e.target.value })} placeholder="Descripción" required />
                            <input value={productoActual.Precio} onChange={(e) => setProductoActual({ ...productoActual, Precio: e.target.value })} placeholder="Precio" />
                        </div>
                        <div style={{ display: "flex", justifyContent: "center", flexDirection:"column" }}>
                        <select  value={productoActual.Categoria} onChange={handleCategoriaChange}>
                            {opcionesCategoria.map((opcion, index) => (
                                <option  key={index} value={opcion.id}>{opcion.nombre}</option>
                            ))}
                        </select>
                        <input  type="file" onChange={handleImageChange} />
                        <button  onClick={agregarProducto}>Agregar producto</button>
                        </div >
                    </div>
                    <hr width="100%" style={{ margin: 20 }} />
                </>
            )}
            <div >
                {productos.length === 0 && <h3>Agrega productos para vender.</h3>}
                {productos.map((producto) => {
                    return (
                        <div key={producto.producto_id}>
                            <Producto producto={producto} llavecarrito={false} />
                            <div style={{ margin: 8 }}>Acciones</div>
                            <div className='Acciones' data-label="Acciones">
                                <button onClick={() => editarProducto(producto)}>Editar</button>
                                <button onClick={() => eliminarProducto(producto.producto_id)}>Eliminar</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>

    );
}

export default Finca;
