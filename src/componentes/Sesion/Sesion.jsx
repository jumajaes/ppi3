import React, { useEffect } from 'react';
import { Link } from "react-router-dom"
import "./Sesion.css"
import { useState } from "react";


export function Sesion() {

  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [validar, setValidar] = useState("");
  const [ruta, setRuta] = useState("")

  useEffect(()=>{
    setRuta(validar)
  },[validar, ruta])
  

  const manejarClick = () => {

    if(correo === "") {
      window.alert("Campo correo es obligatorio");
    } else if(contrasena === "") {
      window.alert("Campo contraseña es obligatorio");
    } else if(correo === "biocomprador" && contrasena ==="bio") {
      setValidar("/sesioncomprador");
    } else if(correo === "biovendedor" && contrasena ==="bio") {
      setValidar("/sesionvendedor");
    } else {
      window.alert("Usuario no existe ¡REGISTRATE!");
      setValidar("/registro");
    }

    setRuta(validar)
    //setRuta(validar)
  };

  const handleCorreoChange = (e) => {
    setCorreo(e.target.value);
  };

  const handleContrasenaChange = (e) => {
    setContrasena(e.target.value);
  };



  return (
    <div className="inner-container">
      <div className="header">
        INICIAR SESION
      </div>
      <div className="box">

        <div className="input-group">
          <label id="username">Correo Electronico</label>
          <input
            type="text"
            name="Correo"
            className="login-input"
            placeholder="Correo"
            value={correo}
            onChange={handleCorreoChange} />
        </div>

        <div className="input-group">
          <label id="password">Contraseña</label>
          <input
            type="contraseña"
            name="contraseña"
            className="login-input"
            placeholder="Contraseña"
            value={contrasena}
            onChange={handleContrasenaChange} />
        </div>

        <div className="OlvidoContrasena">
          <Link className='btOlvidoContrasena' to="/olvidopwd">¿Olvidó su contraseña?</Link>
        </div>

        <Link className="btIniciar"
          onClick={manejarClick}
          to={ruta}
        >
          INICIAR
        </Link>

        <div className="header">
          <div>
            ↓ Si no tienes una cuenta. ↓
          </div>

          <Link className='registro' to="/registro">REGISTRARSE</Link>

        </div>
      </div>





    </div>
  );
}

export default Sesion;