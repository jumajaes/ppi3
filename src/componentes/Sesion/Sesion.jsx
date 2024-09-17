import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useData } from "../../contexto/variables.jsx";
import "./Sesion.css";

export const Sesion = () => {
  const { iniciarSesion, setUsuario, setBtIniciarSesion } = useData();
  const navigate = useNavigate();
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const manejarSubmit = async (e) => {
    e.preventDefault();
    if (correo === "") {
      window.alert("Campo correo es obligatorio");
    }  else {
      const result = await iniciarSesion(correo, contrasena);
      if (result.exito) {
        if (result.usuario) {
          setUsuario(result.usuario);
          setBtIniciarSesion("PERFIL")
          if (result.usuario.rol === 3) {
            navigate('/sesionvendedor');
          } else if (result.usuario.rol === 4 || result.usuario.rol === 1 || result.usuario.rol === 2 ) {
            navigate('/usuario');
          }
        }
      } else {
        window.alert(result.error);
      }
    }
  };

  const handleCorreoChange = (e) => {
    setCorreo(e.target.value);
  };

  const handleContrasenaChange = (e) => {
    setContrasena(e.target.value);
  };

  return (
    <div className="sesion">
      <hr width="90%" />
      <div className="text">
        INICIAR SESION
      </div>
      
      <form className="fomulariosesion" onSubmit={manejarSubmit}>
        <label className="labelsesion" id="username">Correo Electronico</label>
        <input
          autoComplete='username'
          type="text"
          name="Correo"
          className="btsesion"
          placeholder="Correo"
          value={correo}
          onChange={handleCorreoChange}
        />

        <label className="labelsesion" id="password">Contraseña</label>
        <input
          autoComplete='current-password'
          type="password"
          name="contraseña"
          className="btsesion"
          placeholder="Contraseña"
          value={contrasena}
          onChange={handleContrasenaChange}
        />

        {/* {<Link className='' to="/olvidopwd">¿Olvidó su contraseña?</Link>} */}

        <button className="btsesion" type="submit">
          INICIAR
        </button>
      </form>

      <h1 className='textsesion'>
          ↓ PARA REGISTRARSE ↓
        </h1>
        <Link className='btsesion' to="/registro">REGISTRARSE</Link>
        <hr width="90%" />
        
    </div>
  );
}

export default Sesion;
