import { useState } from 'react';
import "./producto.css"
import { useData } from '../../contexto/variables';

export const Producto = ({ producto, llavecarrito }) => {

    const { usuario, setResetCarrito } = useData()
    const abrirWhatsApp = (tel, id, nombre, precio, categoria, descripcion) => {
        console.log(tel)
        const mensaje = `Hola, me interesa el producto ${nombre}, ID : ${id},
         PRECIO: $${precio}, CATEGORIA: ${categoria}, DESCRIPCION: ${descripcion}`;
        //const url = `https://wa.me/${tel}?text=${encodeURIComponent(mensaje)}`; 
        const url = ` https://api.whatsapp.com/send/?phone=${tel}&text=${encodeURIComponent(mensaje)}&type=phone_number&app_absent=0`;
        // https://api.whatsapp.com/send/?phone=3105722207&text=hi&type=phone_number&app_absent=0
        window.open(url, '_blank');
    };

    const nombrefinca = async (id) => {

        const response = await fetch(`https://silver-barnacle-rxq4pw7g9763xw4x-5000.app.github.dev/getFarmsUser/?id=${id}`)
        const data = await response.json();
        console.log(data)
        console.log(data)
        usuario ? abrirWhatsApp(data, producto.id,
            producto.name, producto.price, producto.category, producto.description) : alert("Debe iniciar sesion")
    }

    //
    // // {
    // //     "id": "D6819037-F723-4ACE-9174-DDF7B28DA8A4",
    // //     "name": "0 beatles",
    // //     "price": 70,
    // //     "description": "Farm always cleam",
    // //     "image": "data:image/jpeg;base64,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",
    // //     "id_farm": "B127F6FD-4ED5-4794-AB84-B894D17A6D22",
    // //     "category": 1,
    // //     "contact": "3105722207",
    // //     "name_farm": "abonera",
    // //     "name_category": "cleaner"
    // // }
    //

    const eliminarProductoCarrito = async (id_usuario, id_producto) => {
        const url = `https://silver-barnacle-rxq4pw7g9763xw4x-5000.app.github.dev/eliminar-producto-carrito/${id_usuario}/${id_producto}`;

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
            const response = await fetch('https://silver-barnacle-rxq4pw7g9763xw4x-5000.app.github.dev/agregar-producto-carrito', {
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
            return data;
        } catch (error) {
            console.error('Error al agregar producto:', error);
            return { error: error.message };
        }
    };

    const verMas_Ocultar = () => {
        cambiarEstado(!interrupTor)
    }

    const dell = async () => {
        await eliminarProductoCarrito(usuario.cedula, producto.id)
        setResetCarrito(true)
        window.location.reload();
    }


    const [interrupTor, cambiarEstado] = useState(false)

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const añadirAlCarro = () => {
        usuario === null | undefined && alert("Debes iniciar sesion")
        !llavecarrito ?
            usuario !== null | undefined &&
            agregarProductoCarrito(usuario.cedula, producto.id).then(resultado => {
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
                <h1>{capitalize(producto.name)}</h1>
                <img className='imgproducto' src={producto.image} alt="?" ></img>
                <h5>#{producto.id}</h5>
                <h2 className="product-categoriaProducto">{capitalize(producto.name_category)} </h2>
                <h2 className={interrupTor ? "product-descripcionProducto" : "ocultoProducto"}>{capitalize(producto.description)}</h2>
                <p className={interrupTor ? "product-priceProducto" : "ocultoProducto"}>Precio Unidad: $ {producto.price}</p>
                <button className="btproducto" onClick={verMas_Ocultar}>{interrupTor ? 'OCULTAR' : 'VER MAS...'}</button>
                <button className="btproducto" onClick={() => { nombrefinca(producto.id_farm) }}
                > Contactar al vendedor  </button>

                <button className="btproducto" onClick={añadirAlCarro}> {llavecarrito ? "eliminar del carrito" : 'Añadir al carrito'}</button>
            </div>



        </div>
    )
}
