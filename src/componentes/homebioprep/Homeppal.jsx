import React, { useState, useEffect } from "react";
import "./Homeppal.css";
import { Producto } from "../Producto/Producto.jsx";
import { useData } from "../../contexto/variables.jsx";
import { useNavigate } from "react-router-dom";
import iconocarrito from './iconocarrito.jpg'

export const Homeppal = () => {
  const { obtenerProductos, usuario } = useData(); 
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [value, setValue] = useState(""); 
  const [categoria, setCategoria] = useState(""); 
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const x = () => {
    console.log(usuario)
    usuario === null && alert('Debes iniciar sesion')
    usuario !== null ? navigate('/carrito') : navigate('/')

  }
  useEffect(() => {
   
    obtenerProductos()
      .then((resolucion) => {
        setProductos(resolucion);
        setFilteredProducts(resolucion); 
      })
      .catch((error) => {
        console.error('Error al obtener productos:', error);
      });
  }, [obtenerProductos]); 

  useEffect(() => {
   
    const filtered = productos.filter((producto) => {
      const matchesSearch = producto.nombre.toLowerCase().includes(value.toLowerCase());
      const matchesCategory = categoria === "" || producto.categoria_id === parseInt(categoria);
      return matchesSearch && matchesCategory;
    });
    setFilteredProducts(filtered);
  }, [value, categoria, productos]);

  const filtrarNombre = (e) => {
    setValue(e.target.value);
  };

  const filtrarCategoria = (e) => {
    setCategoria(e.target.value); 
  };

  return (
    <div className="Homeppal">

      <div className="busquedaHomeppal">

      <button className="buttonsHomeppal" onClick={x}>
        VER CARRITO
        <img className='logocarrito' src={iconocarrito} alt="VER CARRITO"></img>
      </button>

        <div className="buscarNombreHomeppal">
          <input
            type="text"
            name="busqueda"
            className="buttonsHomeppal"
            placeholder="Ingrese nombre para buscar"
            value={value}
            onChange={filtrarNombre}
          />
        </div>



        <div>

          <select name="categorias" value={categoria} className="buttonsHomeppal" onChange={filtrarCategoria}>
            <option value="">Selecciona una categoria</option>
            <option value="1">Abono</option>
            <option value="2">Fertilizante</option>
            <option value="3">Fungicida</option>
            <option value="4">Plaguicida</option>
            <option value="5">Herbicida</option>
            <option value="6">Nutridor</option>
            <option value="7">Hidratante</option>
            <option value="8">Calcio</option>
          </select>

        </div>



      </div>


      <div className="gridpructo">
        {filteredProducts.length > 0 &&
          filteredProducts.map((producto) => (
            <Producto key={producto.id} producto={producto} llavecarrito={false}/>
          ))}
      </div>

    </div>
  );
}

export default Homeppal;
