import React, { useEffect, useState } from "react";
import { useData } from '../../contexto/variables';
import { Producto } from "../Producto/Producto.jsx";
import './Carrito.css'

export const Carrito = () => {
    const { usuario, obtenerProductos, resetCarrito } = useData();
    const [productosCarrito, setProductosCarrito] = useState([]);
    const [productos, setProductos] = useState([]);

    const obtenerProductosCarrito = async (usuario) => {
        try {
            const response = await fetch(`/obtener-productos-carrito/${usuario.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error('Error al obtener productos del carrito');
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al obtener productos:', error);
            return [];
        }
    };
    
    useEffect(() => {
        obtenerProductos()
            .then((resolucion) => {
                console.log(resolucion)
                setProductos(resolucion)})
            .catch((error) => console.error('Error al obtener productos:', error));

        obtenerProductosCarrito(usuario)
            .then(productos => {
                if (productos.error) {
                    console.error(productos.error);
                } else {
                    setProductosCarrito(productos);
                }
            });

    }, [obtenerProductos, usuario, resetCarrito]);

    const productosFiltrados = productos.filter(producto => {
        return productosCarrito.some(elemento => producto.id === elemento.IDProducto);
    });

    console.log(productosFiltrados)

    const productosPorCategoria = productosFiltrados.reduce((acc, producto) => {
        console.log(producto)
        if (!acc[producto.nombre_categoria]) {
            acc[producto.nombre_categoria] = [];
        }
        acc[producto.nombre_categoria].push(producto);
        return acc;
    }, {});
    console.log(productosPorCategoria)

    return (
        <div className="carrito">
            <h1>Carrito</h1>
            {productosFiltrados.length === 0 && <p>NO TIENES PRODUCTOS EN EL CARRITO</p>}
            <div className="productoscarrito">
                {Object.keys(productosPorCategoria).map(categoria => (
                    <>
                    <h2>{categoria}</h2>
                    <div key={Date.now()} className="categoria">
                        
                        {productosPorCategoria[categoria].map(producto => (
                            <div className="productoscarritocatego">
                            <Producto key={producto.id} producto={producto} llavecarrito={true} />
                            
                            </div>
                        ))}
                        
                    </div>

                    </>
                ))}
                <hr width="90%"/>
            </div>
        </div>
    );
};

export default Carrito;
