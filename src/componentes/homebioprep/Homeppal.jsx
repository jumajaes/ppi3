import React, { useState, useEffect } from "react";
import "./Homeppal.css";
import { Producto } from "../Producto/Producto.jsx";
import { useData } from "../../contexto/variables.jsx";
import { useNavigate } from "react-router-dom";

export const Homeppal = () => {
  const { obtenerProductos, usuario } = useData(); // Obtiene la función obtenerProductos del contexto
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]); // Inicializa el estado de productos como un array vacío
  const [value, setValue] = useState(""); // Inicializa el estado de value como una cadena vacía
  const [categoria, setCategoria] = useState(""); // Inicializa el estado de categoria como una cadena vacía
  const [filteredProducts, setFilteredProducts] = useState([]); // Inicializa el estado de productos filtrados
  const x = ()=>{
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
    <div className="ppal">

      <div className="input-group-busquedaHomeppal">
        <label id="busqueda">Buscar producto</label>
        <input
          type="text"
          name="busqueda"
          className="busquedaHomeppal"
          placeholder="Ingrese nombre"
          value={value}
          onChange={filtrarNombre}
        />
      </div>

      <button onClick={x}>
             VER CARRITO
            </button>

      <label className="input-group-busquedaHomeppal">
        Filtrar categoría:
        <select name="categorias" value={categoria} onChange={filtrarCategoria}>
          <option value="">Selecciona una categoria / Ninguna...</option>
          <option value="1">Abono</option>
          <option value="2">Fertilizante</option>
          <option value="3">Fungicida</option>
          <option value="4">Plaguicida</option>
          <option value="5">Herbicida</option>
          <option value="6">Nutridor</option>
          <option value="7">Hidratante</option>
          <option value="8">Calcio</option>
        </select>
      </label>

      <div className="Homeppal">
        {filteredProducts.length > 0 &&
          filteredProducts.map((producto) => (
            <Producto key={producto.id} producto={producto} />
          ))}
      </div>
    </div>
  );
}

export default Homeppal;
