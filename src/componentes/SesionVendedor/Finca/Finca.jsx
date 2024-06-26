import React, { useState, useEffect } from 'react';
import "./Finca.css"
import { useParams } from 'react-router-dom';
import { useData } from '../../../contexto/variables';

export function Finca() {
    const opcionesCategoria = [
        { id: "", nombre: "Selecciona una categoría / Ninguna..." },
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
    const productoInicial = { id: '', Nombre: '', Descripción: '', Precio: '', Categoría: opcionesCategoria[0].id, Imagen: '', IDFinca: idFinca };
    var base64Data
    const [productos, setProductos] = useState([]);
    const [productoActual, setProductoActual] = useState(productoInicial);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        obtenerProductos().then((resolucion) => {
            setProductos(resolucion.filter((producto) => producto.IDFinca === parseInt(idFinca)));
        }).catch((error) => {
            console.error('Error al obtener productos:', error);
        });
    }, [idFinca, obtenerProductos]);

    const handleCategoriaChange = (e) => {
        setProductoActual({ ...productoActual, Categoría: e.target.value });
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
        if (!productoActual.Nombre || !productoActual.Descripción || !productoActual.Precio) {
            return 'Todos los campos son obligatorios.';
        }
        if (isNaN(productoActual.Precio) || parseInt(productoActual.Precio) <= 0) {
            return 'El precio debe ser un número entero positivo.';
        }
        if (productoActual.Categoría === "") {
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

        fetch(`https://3167jpp0-5000.use2.devtunnels.ms/agregar_producto`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productoActual)
        })
        .then(response => response.json())
        .then(data => {
            obtenerProductos().then((resolucion) => {
                setProductos(resolucion.filter((producto) => producto.IDFinca === parseInt(idFinca)));
            }).catch((error) => {
                console.error('Error al obtener productos:', error);
            });
            setProductoActual(productoInicial);
            setError('');});
    };

    const actualizarProducto = () => {
        const errorMsg = validarProducto();
        if (errorMsg) {
            setError(errorMsg);
            return;
        }
    
        if (!productoActual.Imagen) {
            const productoExistente = productos.find((p) => p.id === productoActual.id);
            if (productoExistente) {
                setProductoActual({ ...productoActual, Imagen: productoExistente.Imagen });
            }
        }
        console.log()
        fetch(`https://3167jpp0-5000.use2.devtunnels.ms/editar_producto/${productoActual.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productoActual)
        })
        .then(response => response.json())
        .then(data => {
            obtenerProductos().then((resolucion) => {
                setProductos(resolucion.filter((producto) => producto.IDFinca === parseInt(idFinca)));
            }).catch((error) => {
                console.error('Error al obtener productos:', error);
            });
            setProductoActual(productoInicial);
            setModoEdicion(false);
            setError(''); // Clear error after successful update
        });
    };

    const eliminarProducto = (id) => {
        fetch(`https://3167jpp0-5000.use2.devtunnels.ms/eliminar-producto/${id}`, {
            method: 'DELETE'
        })
        .then(() => {
            const nuevosProductos = productos.filter((producto) => producto.id !== id);
            setProductos(nuevosProductos);
            obtenerProductos();
        });
    };

    const editarProducto = (producto) => {
        const idFincaNumero = parseInt(producto.IDFinca);
        if (isNaN(idFincaNumero)) {
            console.error('IDFinca no es un número válido:', producto.IDFinca);
            return; 
        }
    
        const productoNormalizado = {
            id: producto.id || '',
            Nombre: producto.nombre || '',
            Descripción: producto.descripcion || '',
            Precio: producto.precio || '', 
            Categoría: producto.categoria_id || '',
            Imagen: producto.img || '', 
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
        <div className='Finca'>
        {error && <div className="error">{error}</div>}
        {modoEdicion ? (
            <>
                <div className="formFinca">
                    <label>{productoActual.id}</label>
                    <input value={productoActual.Nombre} onChange={(e) => setProductoActual({ ...productoActual, Nombre: e.target.value })} placeholder="Nombre" required />
                    <input value={productoActual.Descripción} onChange={(e) => setProductoActual({ ...productoActual, Descripción: e.target.value })} placeholder="Descripción" required />
                    <input value={productoActual.Precio} onChange={(e) => setProductoActual({ ...productoActual, Precio: e.target.value })} placeholder="Precio" />
                    <select className='btproductoFinca' value={productoActual.Categoría} onChange={handleCategoriaChange}>
                        {opcionesCategoria.map((opcion, index) => (
                            <option key={index} value={opcion.id}>{opcion.nombre}</option>
                        ))}
                    </select>
                    <input type="file" onChange={handleImageChange} />
                </div>
                <button  className='btproductoFinca' onClick={resetProducto}>Cancelar</button>
                <button  className='btproductoFinca'   onClick={actualizarProducto}>Actualizar producto</button>
            </>
        ) : (
            <>
                <div className="formFinca">
                    <input value={productoActual.Nombre} onChange={(e) => setProductoActual({ ...productoActual, Nombre: e.target.value })} placeholder="Nombre" required />
                    <input value={productoActual.Descripción} onChange={(e) => setProductoActual({ ...productoActual, Descripción: e.target.value })} placeholder="Descripción" required />
                    <input value={productoActual.Precio} onChange={(e) => setProductoActual({ ...productoActual, Precio: e.target.value })} placeholder="Precio" />
                    <select  className='btproductoFinca' value={productoActual.Categoría} onChange={handleCategoriaChange}>
                        {opcionesCategoria.map((opcion, index) => (
                            <option className='btproductoFinca' key={index} value={opcion.id}>{opcion.nombre}</option>
                        ))}
                    </select>
                    <input  className='btproductoFinca'  type="file" onChange={handleImageChange} />
                    <button  className='btproductoFinca' onClick={agregarProducto}>Agregar producto</button>
                </div>
               
            </>
        )}
        <div className='formFincagrid' >

            {productos.map((producto) => (
                
                    <div className='tablebodyFinca' key={producto.id}>
                         
                        
                        
                        
                        <div data-label="ID"> ID:</div>
                        <div  className='btproductoFinca' data-label="ID">{producto.id}</div>
                        <div   data-label="Nombre">Nombre:</div>

                        <div  className='btproductoFinca' data-label="Nombre"> {producto.nombre}</div>
                        <div   data-label="Descripción">Descripción:</div>
                        <div  className='btproductoFinca' data-label="Descripción">{producto.descripcion}</div>
                        <div   data-label="Precio">Precio:</div>
                        <div  className='btproductoFinca' data-label="Precio">Precio: {producto.precio}</div>
                        <div   data-label="Categoría">Categoría:</div>
                        <div  className='btproductoFinca' data-label="Categoría">Categoría: {opcionesCategoria.map(x => {
                            if (parseInt(x.id) === producto.categoria_id) {
                                return x.nombre;
                            }
                            return "";
                        })}</div>
                        <div  className='btproductoFinca' data-label="Imagen"><img className='celdaimg' src={producto.img} alt="Producto" style={{ width: '250px', height: '50px' }} /></div>
                        <div className=''>Acciones</div>
                        <div  className='Acciones' data-label="Acciones">
                    
                    <button className='btproductoFinca' onClick={() => editarProducto(producto)}>Editar</button>
                    <button className='btproductoFinca'   onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
               
                    </div>
                    <hr width="90%"/>
                     </div> 
                ))}           
        </div>
    </div>
    
);
}

export default Finca;
