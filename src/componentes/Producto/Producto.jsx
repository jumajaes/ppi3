import { useState } from 'react';
import "./producto.css"
import { useData } from '../../contexto/variables';

export const Producto = ({ producto, llavecarrito }) => {
    const {usuario, setResetCarrito} = useData()
 
    // const abrirWhatsApp = (tel, id, nombre, precio, categoria, descripcion, img) => {
    //     const mensaje = `Hola, me interesa este producto ID : ${id} NOMBRE: ${nombre},
    //      PRECIO: $${precio}, CATEGORIA: ${categoria}, DESCRIPCION: ${descripcion} ${img}`;
    //     const url = `https://wa.me/${tel}?text=${encodeURIComponent(mensaje)}`;
    //     window.open(url, '_blank');
    // };

    const eliminarProductoCarrito = async (id_usuario, id_producto)=> {
        const url = `/eliminar-producto-carrito/${id_usuario}/${id_producto}`;
        
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
    
            const data = await response.json();

            return data;
        } catch (error) {
            console.error('Error al eliminar el producto del carrito:', error);
            return { error: error.message };
        }
    }

    const agregarProductoCarrito = async (idUsuario, idProducto) => {
        try {
            const response = await fetch('/agregar-producto-carrito', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    IDUsuario: idUsuario,
                    IDProducto: idProducto
                })
            });
            
            if (!response.ok) {
                throw new Error('Error al agregar producto al carrito');
            }
            
            const data = await response.json();
            // console.log(data);
            return data;
        } catch (error) {
            console.error('Error al agregar producto:', error);
            return { error: error.message };
        }
    };

    const verMas_Ocultar = () => {
        cambiarEstado(!interrupTor)
    }

    const dell = ()=>{
        eliminarProductoCarrito(usuario.id,producto.id )
        setResetCarrito(true)
    }
        
    
    const [interrupTor, cambiarEstado] = useState(false)

    const añadirAlCarro = ()=>{  
        
        !llavecarrito ?
        usuario !== null | undefined && 
            agregarProductoCarrito(usuario.id,producto.id ).then(resultado => {
                if (resultado.error) {
                    console.error(resultado.error);
                } else {
                    alert(resultado.mensaje);
                
                }})

        :
            dell()
        
        
    }

    return (
        <div id={producto.id} className="fondoProducto">
          
                <div className="product-cardProducto">
                    <h1 className="product-nameProducto">{producto.nombre}</h1>
                    <img className="product-imageProducto" src={producto.img} alt={producto.nombre} width="190" height="440" ></img>
                    <div className="informacionProducto">
                        {//<h3 className="product-name">{producto.id}</h1>
                        }
                        <h2 className={interrupTor ? "product-categoriaProducto" : "ocultoProducto"}>Categoria: {producto.nombre_categoria} </h2>
                        <h2 className={interrupTor ? "product-descripcionProducto" : "ocultoProducto"}>Descripcion:</h2>
                        <h2 className={interrupTor ? "product-descripcionProducto" : "ocultoProducto"}>{producto.descripcion}</h2>
                        <p className="product-priceProducto">Precio Unidad: $ {producto.precio}</p>
                        <button  className="btContactoProducto" onClick={verMas_Ocultar}>{interrupTor ? 'OCULTAR' : 'VER MAS...'}</button>

                    </div>

                    {/* <button className="btContacto" onClick={() => true ? abrirWhatsApp(producto.tel, producto.id,
                        producto.nombre, producto.precio, producto.categoria, producto.descripcion, producto.img) : alert("Debe iniciar sesion")}
                    > Contactar al vendedor  </button> */}

                    <button className="btContactoProducto" onClick={añadirAlCarro}> {llavecarrito ? "eliminar del carrito":'Añadir al carrito'}</button>


                </div>
                <br></br> 
        </div>
    )
}
