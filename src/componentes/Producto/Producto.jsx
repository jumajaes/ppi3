import { useState } from 'react';
import "./producto.css"
import { useData } from '../../contexto/variables';

export const Producto = ({ producto, llavecarrito }) => {

    console.log(producto)
    const { usuario, setResetCarrito } = useData()
    const [tel, settel] = useState("")

    const abrirWhatsApp = (tel, id, nombre, precio, categoria, descripcion, img) => {
        
        const mensaje = `Hola, me interesa este producto ID : ${id} NOMBRE: ${nombre},
         PRECIO: $${precio}, CATEGORIA: ${categoria}, DESCRIPCION: ${descripcion} ${img}`;
        const url = `https://wa.me/${tel}?text=${encodeURIComponent(mensaje)}`;
        window.open(url, '_blank');
    };

    const nombrefinca = async (id)=>{
       
        const response = await fetch(`https://3167jpp0-5000.use2.devtunnels.ms/obtener_nombrefincas?id_usuario=${id}`)
        const data = await response.json();
    
        settel(data)
        true ? abrirWhatsApp(tel, producto.id,
            producto.nombre, producto.precio, producto.categoria, producto.descripcion, producto.img) : alert("Debe iniciar sesion")

        
    }

    const eliminarProductoCarrito = async (id_usuario, id_producto) => {
        const url = `https://3167jpp0-5000.use2.devtunnels.ms/eliminar-producto-carrito/${id_usuario}/${id_producto}`;

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
            const response = await fetch('https://3167jpp0-5000.use2.devtunnels.ms/agregar-producto-carrito', {
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

    const dell = () => {
        eliminarProductoCarrito(usuario.id, producto.id)
        setResetCarrito(true)
    }


    const [interrupTor, cambiarEstado] = useState(false)

    const añadirAlCarro = () => {
        usuario === null | undefined && alert("Debes iniciar sesion")
        !llavecarrito ?
            usuario !== null | undefined &&
            agregarProductoCarrito(usuario.id, producto.id).then(resultado => {
                if (resultado.error) {
                    console.error(resultado.error);
                } else {
                    alert(resultado.mensaje);

                }
            })

            :
            dell()


    }

    return (

        <div id={producto.id} className="fondoProducto">

            <div className="informacionProducto">
                <h1>{producto.nombre}</h1>
                <img className='imgproducto' src={producto.img} alt="" ></img>
                <h5 >#{producto.id}</h5>

                <h2 className={interrupTor ? "product-categoriaProducto" : "ocultoProducto"}>Categoria: {producto.nombre_categoria} </h2>
                <h2 className={interrupTor ? "product-descripcionProducto" : "ocultoProducto"}>Descripcion:</h2>
                <h2 className={interrupTor ? "product-descripcionProducto" : "ocultoProducto"}>{producto.descripcion}</h2>
                <p className="product-priceProducto">Precio Unidad: $ {producto.precio}</p>
                <button className="btproducto" onClick={verMas_Ocultar}>{interrupTor ? 'OCULTAR' : 'VER MAS...'}</button>
                <button className={llavecarrito ? "btproducto" : "btproducto ocultocontacto"} onClick={()=>{nombrefinca(producto.IDFinca)}}
                > Contactar al vendedor  </button>

                <button className="btproducto" onClick={añadirAlCarro}> {llavecarrito ? "eliminar del carrito" : 'Añadir al carrito'}</button>
            </div>
            


        </div>
    )
}
