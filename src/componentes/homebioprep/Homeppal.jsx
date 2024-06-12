import React, { useState, useEffect } from "react";
import "./Homeppal.css";
import { Producto } from "../Producto/Producto.jsx";
import { useData } from "../../contexto/variables.jsx";
import { useNavigate } from "react-router-dom";
import iconocarrito from './iconocarrito.jpg'

export const Homeppal = () => {
  const { obtenerProductos, usuario } = useData(); // Obtiene la función obtenerProductos del contexto
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]); // Inicializa el estado de productos como un array vacío
  const [value, setValue] = useState(""); // Inicializa el estado de value como una cadena vacía
  const [categoria, setCategoria] = useState(""); // Inicializa el estado de categoria como una cadena vacía
  const [filteredProducts, setFilteredProducts] = useState([]); // Inicializa el estado de productos filtrados
  const x = () => {
    console.log(usuario)
    usuario === null && alert('Debes iniciar sesion')
    usuario !== null ? navigate('/carrito') : navigate('/')

  }
  useEffect(() => {
    // Utiliza la función obtenerProductos para obtener los productos de la API
    obtenerProductos()
      .then((resolucion) => {
        setProductos(resolucion);
        setFilteredProducts(resolucion); // Inicializa los productos filtrados con todos los productos
      })
      .catch((error) => {
        console.error('Error al obtener productos:', error);
      });
  }, [obtenerProductos]); // El efecto se ejecutará solo una vez al montar el componente

  useEffect(() => {
    // Filtra los productos en base al valor de búsqueda y la categoría seleccionada
    const filtered = productos.filter((producto) => {
      const matchesSearch = producto.nombre.toLowerCase().includes(value.toLowerCase());
      const matchesCategory = categoria === "" || producto.categoria_id === parseInt(categoria);
      return matchesSearch && matchesCategory;
    });
    setFilteredProducts(filtered);
  }, [value, categoria, productos]);

  const filtrarNombre = (e) => {
    setValue(e.target.value); // Actualiza el estado value con el valor del input de búsqueda
  };

  const filtrarCategoria = (e) => {
    setCategoria(e.target.value); // Actualiza el estado categoria con el valor del select de categorías
  };

  return (
    <div className="Homeppal">

      
      VER CARRITO

      <button className="buttonsHomeppal" onClick={x}>
        <img className='logocarrito' src={iconocarrito} alt=""></img>
      </button>

      <hr className="hr" />
      <div className="busquedaHomeppal">


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
