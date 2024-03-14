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
              
                <div className="productos"> 
                <img className="img" src = {producto.image} alt = {producto.name}/>
               
                <h4>CODIGO: {producto.id}</h4>
                <h4>NOMBRE: {producto.name}</h4>
                
                <h2>CATEGORIA: {producto.categoria}</h2>
                <h2>CONTACTO DEL VENDEDOR: {producto.contacto}</h2>
                <p>PRECIO UNITARIO: {producto.precioU}</p>
                <h2>DESCRIPCION: {producto.descripcion}</h2>
                
                
              </div>
            )
          }       
        )
        

      }

    </div>
  );
}

export default Homeppal;
