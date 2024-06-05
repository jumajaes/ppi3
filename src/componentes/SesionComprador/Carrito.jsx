import React, { useEffect, useState } from "react";
import { useData } from '../../contexto/variables';
import { Producto } from "../Producto/Producto.jsx";

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
        if (!acc[producto.nombre_categoria]) {
            acc[producto.nombre_categoria] = [];
        }
        acc[producto.nombre_categoria].push(producto);
        return acc;
    }, {});
    console.log(productosPorCategoria)

    return (
        <div className="btProducto">
            <h1>Carrito</h1>
            {productosFiltrados.length === 0 && <p>NO TIENES PRODUCTOS EN EL CARRITO</p>}
            <div className="cart-container">
                {Object.keys(productosPorCategoria).map(categoria => (
                    <div key={categoria} className="categoria">
                        <h2>{categoria}</h2>
                        {productosPorCategoria[categoria].map(producto => (
                            <Producto key={producto.id} producto={producto} llavecarrito={true} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carrito;

// import React, { useEffect, useState } from "react";
// import { useData } from '../../contexto/variables';
// import { Producto } from "../Producto/Producto.jsx";

// export const Carrito = () => {
    
//     const { usuario, obtenerProductos, resetCarrito  } = useData();
//     const [productosCarrito, setProductosCarrito] = useState([]);
//     const [produt, setproduc] = useState([]);

//     const obtenerProductosCarrito = async (usuario) => {
//         try {
//             const response = await fetch(`/obtener-productos-carrito/${usuario.id}`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });
            
//             if (!response.ok) {
//                 throw new Error('Error al obtener productos del carrito');
//             }
            
//             const data = await response.json();
//             return data;
//         } catch (error) {
//             console.error('Error al obtener productos:', error);
//             return [];
//         }
//     };
    
//     useEffect(() => {
//         obtenerProductos().then((resolucion) => {
//             setproduc(resolucion)
//         }).catch((error) => {
//             console.error('Error al obtener productos:', error);
//         });

//         obtenerProductosCarrito(usuario).then(productos => {
//             if (productos.error) {
//                 console.error(productos.error);
//             } else {
//                 setProductosCarrito(productos)
//             }
//         });

//     }, [obtenerProductos, usuario, resetCarrito])

//     const productosFiltrados = produt.filter(producto => {
//         return productosCarrito.some(elemento => {
//             return producto.id === elemento.IDProducto;
//         });
//     });

//     return (
//         <div className="btProducto">
//             <h1>Carrito</h1>
//             {productosFiltrados.length === 0 && <p>NO TIENES PRODUCTOS EN EL CARRITO</p>}
//             <div className="cart-container">
//                 {productosFiltrados.map((producto) => (
//                    <Producto key={producto.id} producto={producto} llavecarrito={true} /> 
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Carrito;
