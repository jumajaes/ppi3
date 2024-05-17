import React, { useState } from 'react';
import "./Finca.css"

export function Finca() {
    const [productos, setProductos] = useState([]);
    const [productoActual, setProductoActual] = useState({ id: '', nombre: '', descripcion: '', precio: '', categoria: '', imagen: null });

    const agregarProducto = () => {
        const agregarFx = () => {

            setProductos([...productos, productoActual]);
            setProductoActual({ id: '', nombre: '', descripcion: '', precio: '', categoria: '', imagen: null })
        }

        productos.length === 0 ? agregarFx() : productos.filter((producto) => producto.id === productoActual.id).length === 0 ? agregarFx() : alert("Este ID ya existe")

        

    };

    const actualizarProducto = (id) => {
        const nuevosProductos = productos.map((producto) =>
            producto.id === id ? productoActual : producto
        );
        setProductos(nuevosProductos);
        setProductoActual({ id: '', nombre: '', descripcion: '', precio: '', categoria: '', imagen: null });
    };

    const eliminarProducto = (id) => {
        const nuevosProductos = productos.filter((producto) => producto.id !== id);
        setProductos(nuevosProductos);
    };

    const handleImageChange = (e) => {
        setProductoActual({ ...productoActual, imagen: URL.createObjectURL(e.target.files[0]) });
    };

    return (
        <div className='AppF'>
            <input value={productoActual.id} onChange={(e) => setProductoActual({ ...productoActual, id: e.target.value })} placeholder="ID" required />
            <input value={productoActual.nombre} onChange={(e) => setProductoActual({ ...productoActual, nombre: e.target.value })} placeholder="Nombre" required />
            <input value={productoActual.descripcion} onChange={(e) => setProductoActual({ ...productoActual, descripcion: e.target.value })} placeholder="Descripción" required />
            <input value={productoActual.precio} onChange={(e) => setProductoActual({ ...productoActual, precio: e.target.value })} placeholder="Precio" />
            <input value={productoActual.categoria} onChange={(e) => setProductoActual({ ...productoActual, categoria: e.target.value })} placeholder="Categoría" />
            <input type="file" onChange={handleImageChange} />
            <button onClick={agregarProducto}>Agregar producto</button>
            <button onClick={() => actualizarProducto(productoActual.id)}>Actualizar producto</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Categoría</th>
                        <th>Imagen</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto) => (
                        <tr key={producto.id}>
                            <td>{producto.id}</td>
                            <td>{producto.nombre}</td>
                            <td>{producto.descripcion}</td>
                            <td>{producto.precio}</td>
                            <td>{producto.categoria}</td>
                            <td><img src={producto.imagen} alt="Producto" style={{ width: '50px', height: '50px' }} /></td>
                            <td>
                                <button onClick={() => setProductoActual(producto)}>Editar</button>
                                <button onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Finca;
