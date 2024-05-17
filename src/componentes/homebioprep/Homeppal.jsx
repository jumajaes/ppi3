import data from "../../BD/DATA.json";
import React, { useState, useEffect } from "react";
import "./Homeppal.css"

export function Homeppal({ onSesion }) {

  //Variables.
  console.log(onSesion)
  const [productos, setProductos] = useState(data); // useState me permite actualizar estas variables sin desmontar y montar el componente,


  const abrirWhatsApp = (tel, id, nombre, precio, categoria, descripcion, img) => {
    const mensaje = `Hola, me interesa este producto ID : ${id} NOMBRE: ${nombre},
     PRECIO: $${precio}, CATEGORIA: ${categoria}, DESCRIPCION: ${descripcion} ${img}`;
    const url = `https://wa.me/${tel}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  //promesa para obtener los datos.
  function resolver() {
    return new Promise((resolve, reject) => {
      resolve(data);
    })
  }

  //setear la promesa 
  useEffect(() => { //useEfect me ayuda a que no se ejecute la funcion cada vez que se actualiza el componente si no solo cuando se monta.<<<<<<<<<
    resolver().then(
      (resolucion) => {
        setProductos(resolucion);
      }
    )

  }, [productos, setProductos])

  return (
    <div className="Homeppal">

      {
        productos.length > 0 &&

        productos.map(
          (producto) => {
            return (

              <div id={producto.id} className="fondo">
                <title>Listado de Productos</title>
                <div style={ {padding: '10%' }}>
                  <div className="product-card">
                    <img className="product-image" src={producto.image} alt={producto.name} width="190" height="440" ></img>
                    <div className="informacion">
                      <h1 className="product-name">{producto.id}</h1>
                      <h1 className="product-name">{producto.name}</h1>
                      <h2 className="product-categoria">Categoria: {producto.categoria} </h2>
                      <h2 className="product-descripcion">Descripcion:</h2>
                      <h2 className="product-descripcion">{producto.descripcion}</h2>
                      <p className="product-price">Precio Unidad: $ {producto.precioU}</p>

                    </div>

                    <button className="btContacto" onClick={() => onSesion ? abrirWhatsApp(producto.contacto, producto.id,
                      producto.name,producto.precioU,producto.categoria, producto.descripcion, producto.image):alert("Debe iniciar sesion")}
                    > Contactor al vendedor  </button>
                  </div>

                </div>
              </div>
            )
          }
        )


      }

    </div>
  );
}

export default Homeppal;
