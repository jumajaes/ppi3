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
  const onClickCar = () => {
    console.log(usuario)
    usuario === null && alert('Debes iniciar sesion')
    usuario !== null ? navigate('/carrito') : navigate('/')

  }
  useEffect(() => {

    obtenerProductos()
      .then((resp) => {
        console.log(resp)
        setProductos(resp);
        setFilteredProducts(resp);
      })
      .catch((error) => {
        console.error('Error al obtener productos:', error);
      });
  }, [obtenerProductos]);

  useEffect(() => {

    const filtered = productos.filter((producto) => {
      console.log(producto)
      console.log(categoria)
      const matchesSearch = producto.name_category.toLowerCase().includes(value.toLowerCase());
      const matchesCategory = categoria === "" || producto.category === parseInt(categoria);
      return matchesSearch && matchesCategory;
    });
    console.log(filtered)
    setFilteredProducts(filtered);
  }, [value, categoria, productos]);

  const filtrarNombre = (e) => {
    console.log(e)
    setValue(e.target.value);
  };

  const filtrarCategoria = (e) => {
    console.log(e)
    setCategoria(e.target.value);
  };

  return (
    <div className="Homeppal">

      <div className="carContainer">
        <button className="btCar" onClick={onClickCar}>
          VER CARRITO
          <img className='logocarrito' src={iconocarrito} alt="VER CARRITO"></img>
        </button>
      </div>

      <div className="searchContainer">
        <div className="search">
          <input
            type="text"
            name="busqueda"
            className="buttonsHomeppal"
            placeholder="Ingrese nombre para buscar"
            value={value}
            onChange={filtrarNombre}
          />
        </div>
      </div>

      <div className="filterContainer">
        <select name="categorias" value={categoria} className="buttonsHomeppal" onChange={filtrarCategoria}>
          <option value="10">Filtrar categorias / limpiar filtro</option>
          <option value="1">Limpiador</option>
          <option value="2">Fertilizante</option>
          <option value="3">Fungicida</option>
          <option value="4">Plaguicida</option>
          <option value="5">Herbicida</option>
          <option value="6">Nutridor</option>
          <option value="7">Hidratante</option>
          <option value="8">Calcio</option>
          <option value="9">Abono</option>
        </select>
      </div>

      <div className="gridproductos">
        {filteredProducts.length > 0 ?
          filteredProducts.map((producto) => (
            <Producto key={producto.id} producto={producto} llavecarrito={false} />
          )): "No hay productos disponibles."}
      </div>

    </div>
  );
}

export default Homeppal;
