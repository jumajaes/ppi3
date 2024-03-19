import data from "../../BD/DATA.json";
import React, { useState, useEffect } from "react";

import "./Homeppal.css"

export function Homeppal() {

  //Variables.

  console.log(data)

  const [productos, setProductos] = useState(data); // useState me permite actualizar estas variables sin desmontar y montar el componente,


  //promesa para obtener los datos.
  function resolver(){return new Promise((resolve, reject)=>{
    resolve(data);
   })
  }
  
    //setear la promesa 
  useEffect(() =>{ //useEfect me ayuda a que no se ejecute la funcion cada vez que se actualiza el componente si no solo cuando se monta.<<<<<<<<<

    

    resolver().then(
      
      (resolucion) => {

      setProductos(resolucion);
        
       }
      )
       
  },[productos, setProductos])
  

    


  return (
    <div className="Homeppal">

      { 
      productos.length > 0 && 
      
        productos.map(
          (producto)=>{
            return(
              
                <div>
                    <title>Listado de Productos</title>
                    <body>
                      <div class="product-card">
                          <img class="product-image" src={producto.image} alt={producto.name}></img>
                          <div className="informacion">
                          <h1 class="product-name">{producto.name}</h1>
                          <h2 class="product-categoria">Categoria: {producto.categoria} </h2>
                          <h2 class="product-descripcion">Descripcion:</h2>
                          <h2 class="product-descripcion">{producto.descripcion}</h2>
                          <p class="product-price">Precio Unidad: $ {producto.precioU}</p>
                          </div>
                          <button>Contactar  Vendedor</button>
                      </div>
                    
                    </body>
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
