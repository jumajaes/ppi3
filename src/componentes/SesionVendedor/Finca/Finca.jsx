import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useData } from '../../../contexto/variables';
import { Producto } from "../../Producto/Producto";
import "./Finca.css";

export function Finca() {
    const opcionesCategoria = [
        { id: "10", nombre: "Sin Categoria" },
        { id: "1", nombre: "Limpiador" },
        { id: "2", nombre: "Fertilizante" },
        { id: "3", nombre: "Fungicida" },
        { id: "4", nombre: "Plaguicida" },
        { id: "5", nombre: "Herbicida" },
        { id: "6", nombre: "Nutridor" },
        { id: "7", nombre: "Hidratante" },
        { id: "8", nombre: "Calcio" },
        { id: "9", nombre: "Abono" },
    ];

    const { idFinca } = useParams();
    const { obtenerProductos, usuario } = useData();

    const productoInicial = { id: '', Nombre: '', Descripcion: '', Precio: '', Categoria: opcionesCategoria[0].id, Imagen: '', IDFinca: idFinca, contacto: usuario.telefono };
    const [productos, setProductos] = useState([]);
    const [productoActual, setProductoActual] = useState(productoInicial);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [error, setError] = useState('');

    const handleCategoriaChange = (e) => {
        setProductoActual({ ...productoActual, Categoria: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png')) {
            if (file.size > 100000) {
                setError('El archivo es demasiado grande, debe ser menor a 5MB.');
                return;
            }
            const reader = new FileReader();
            reader.onload = (event) => {
                setProductoActual({ ...productoActual, Imagen: event.target.result });
            };
            reader.readAsDataURL(file);
        } else {
            setError('La imagen debe ser un archivo JPG, JPEG o PNG.');
        }
    };

    const validarProducto = () => {
        if (!productoActual.Nombre || !productoActual.Descripcion || !productoActual.Precio) return 'Todos los campos son obligatorios.';
        if (isNaN(productoActual.Precio) || parseInt(productoActual.Precio) <= 0) return 'El precio debe ser un número entero positivo.';
        if (productoActual.Categoria === "") return 'Debe seleccionar una categoría válida.';
        return null; // Cambié el retorno a `null` en lugar de `false`
    };

    const agregarProducto = async () => {
        const errorMsg = validarProducto();
        if (errorMsg) {
            setError(errorMsg);
            return;
        }

        try {
            const response = await fetch("https://silver-barnacle-rxq4pw7g9763xw4x-5000.app.github.dev/agregar_producto", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productoActual),
            });

            if (!response.ok) throw new Error(`Error al agregar producto: ${response.status}`);
            alert('Producto agregado correctamente.');

            obtenerProductos().then((resp) => {
                setProductos(resp.filter((producto) => producto.id_farm === idFinca));
                resetProducto();
            });

        } catch (error) {
            alert('Error al agregar producto:', error);
        }
    };

    const actualizarProducto = async () => {
        const errorMsg = validarProducto();
        if (errorMsg) {
            setError(errorMsg);
            return;
        }

        const categoria = opcionesCategoria.find((op) => op.nombre === productoActual.Categoria);
        const categoriaId = categoria ? categoria.id : '10';  // '10' es el valor por defecto si no se encuentra la categoría

        try {
            const response = await fetch(`https://silver-barnacle-rxq4pw7g9763xw4x-5000.app.github.dev/editar_producto/${productoActual.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...productoActual, Categoria: categoriaId }),
            });

            if (response.status !== 200) throw new Error(`Error al actualizar producto: ${response.status}`);
            alert('Producto actualizado correctamente.');

            obtenerProductos().then((resp) => {
                setProductos(resp.filter((producto) => producto.id_farm === idFinca));
                resetProducto();
            });

        } catch (error) {
            console.error('Error al actualizar producto:', error);
        }
    };

    const eliminarProducto = async (id) => {
        try {
            const response = await fetch(`https://silver-barnacle-rxq4pw7g9763xw4x-5000.app.github.dev/eliminar-producto/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error(`Error al eliminar producto: ${response.status}`);
            alert('Producto eliminado correctamente.');
            obtenerProductos().then((resp) => {
                setProductos(resp.filter((producto) => producto.id_farm === idFinca));
                resetProducto();
            });
        } catch (error) {
            console.error('Error al eliminar producto:', error);
        }
    };

    const editarProducto = (producto) => {
        const productoNormalizado = {
            id: producto.id || '',
            Nombre: producto.name || '',
            Descripcion: producto.description || '',
            Precio: producto.price || '',
            Categoria: producto.name_category || '',
            Imagen: producto.image || '',
            IDFinca: producto.id_farm
        };

        setProductoActual(productoNormalizado);
        setModoEdicion(true);
    };

    const resetProducto = () => {
        setModoEdicion(false);
        setProductoActual(productoInicial);
        setError('');
    };

    useEffect(() => {
        const cargarProductos = async () => {
            try {
                const resolucion = await obtenerProductos();
                setProductos(resolucion.filter((producto) => producto.id_farm === idFinca));
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        };

        cargarProductos();
    }, [idFinca]);

    return (
        <div>
            {error && <div>{error}</div>}
            {modoEdicion ? (
                <div>
                    <h1>Editar Producto</h1>
                    <input value={productoActual.Nombre} onChange={(e) => setProductoActual({ ...productoActual, Nombre: e.target.value })} placeholder="Nombre" />
                    <input value={productoActual.Descripcion} onChange={(e) => setProductoActual({ ...productoActual, Descripcion: e.target.value })} placeholder="Descripción" />
                    <input value={productoActual.Precio} onChange={(e) => setProductoActual({ ...productoActual, Precio: e.target.value })} placeholder="Precio" />
                    <select value={productoActual.Categoria} onChange={handleCategoriaChange}>
                        {opcionesCategoria.map((opcion, index) => (
                            <option key={index} value={opcion.id}>{opcion.nombre}</option>
                        ))}
                    </select>
                    <input type="file" onChange={handleImageChange} />
                    <button onClick={resetProducto}>Cancelar</button>
                    <button onClick={actualizarProducto}>Actualizar Producto</button>
                </div>
            ) : (
                <div>
                    <h1>Agregar Producto</h1>
                    <input value={productoActual.Nombre} onChange={(e) => setProductoActual({ ...productoActual, Nombre: e.target.value })} placeholder="Nombre" />
                    <input value={productoActual.Descripcion} onChange={(e) => setProductoActual({ ...productoActual, Descripcion: e.target.value })} placeholder="Descripción" />
                    <input value={productoActual.Precio} onChange={(e) => setProductoActual({ ...productoActual, Precio: e.target.value })} placeholder="Precio" />
                    <select value={productoActual.Categoria} onChange={handleCategoriaChange}>
                        {opcionesCategoria.map((opcion, index) => (
                            <option key={index} value={opcion.id}>{opcion.nombre}</option>
                        ))}
                    </select>
                    <input type="file" onChange={handleImageChange} />
                    <button onClick={agregarProducto}>Agregar Producto</button>
                </div>
            )}
            <div>
                {productos.length === 0 ? <h3>No hay productos disponibles.</h3> : (
                    productos.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())).map((producto) => (
                        <div key={producto.id}>
                            <Producto producto={producto} llavecarrito={false} />
                            <div style={{ margin: 8 }}>Acciones</div>
                            <div className='Acciones' data-label="Acciones">
                                <button onClick={() => editarProducto(producto)}>Editar</button>
                                <button onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Finca;
