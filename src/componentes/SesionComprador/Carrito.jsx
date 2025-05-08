import React, { useEffect, useState } from "react";
import { useData } from "../../contexto/variables";
import { Producto } from "../Producto/Producto.jsx";
import "./Carrito.css";

export const Carrito = () => {
    const { usuario, obtenerProductos } = useData();
    const [productosCarrito, setProductosCarrito] = useState([]);
    const [productos, setProductos] = useState([]);
    const [productosAMostrar, setProductosAMostrar] = useState([]);

    const obtenerProductosCarrito = async (usuario) => {
        try {
            const response = await fetch(
                `https://silver-barnacle-rxq4pw7g9763xw4x-5000.app.github.dev/obtener-productos-carrito/${usuario.cedula}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Error al obtener productos del carrito");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error al obtener productos del carrito:", error);
            return [];
        }
    };

    useEffect(() => {
        obtenerProductos()
            .then((resolucion) => {
                setProductos(resolucion);
            })
            .catch((error) => console.error("Error al obtener productos:", error));

        obtenerProductosCarrito(usuario)
            .then((carrito) => {
                const productosCarritoUnicos = carrito.filter(
                    (item, index, self) =>
                        index === self.findIndex(
                            (t) => t.IDProducto === item.IDProducto && t.IDUsuario === item.IDUsuario
                        )
                );
                setProductosCarrito(productosCarritoUnicos);
            })
            .catch((error) => console.error("Error al obtener productos del carrito:", error));
    }, [usuario, obtenerProductos]);

    useEffect(() => {
        const productosEnCarrito = productosCarrito
            .map((elemento) => {
                return productos.find((producto) => producto.id === elemento.IDProducto);
            })
            .filter((producto) => producto);
        setProductosAMostrar(productosEnCarrito);
    }, [productosCarrito, productos]);

    return (
        <div className="carrito">
            <h1>Carrito</h1>
            {productosAMostrar.length === 0 && <p>NO TIENES PRODUCTOS EN EL CARRITO</p>}
            <div className="productoscarrito">
                {productosAMostrar.map((producto) => (
                    <div key={producto.id} className="productoscarritocatego">
                        <Producto producto={producto} llavecarrito={true} />
                    </div>
                ))}
                <hr width="90%" />
            </div>
        </div>
    );
};

export default Carrito;