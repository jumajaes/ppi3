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
    } else if (contrasena === "") {
      window.alert("Campo contraseña es obligatorio");
    } else {
      const result = await iniciarSesion(correo, contrasena);
      if (result.exito) {
        if (result.usuario) {
          setUsuario(result.usuario);
          setBtIniciarSesion("PERFIL")
          if (result.usuario.rol === 'Vendedor') {
            navigate('/sesionvendedor');
          } else if (result.usuario.rol === 'Comprador') {
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
    <div className="inner-container">
      <div className="text">
        INICIAR SESION
      </div>
      <form className="box" onSubmit={manejarSubmit}>
        <label id="username">Correo Electronico</label>
        <input
          autoComplete='username'
          type="text"
          name="Correo"
          className="login-input"
          placeholder="Correo"
          value={correo}
          onChange={handleCorreoChange}
        />

        <label id="password">Contraseña</label>
        <input
          autoComplete='current-password'
          type="password"
          name="contraseña"
          className="login-input"
          placeholder="Contraseña"
          value={contrasena}
          onChange={handleContrasenaChange}
        />

        <Link className='' to="/olvidopwd">¿Olvidó su contraseña?</Link>

        <button className="Btsesion" type="submit">
          INICIAR
        </button>

        <h1 className='text'>
          ↓ Si no tienes una cuenta. ↓
        </h1>
        <Link className='Btsesion' to="/registro">REGISTRARSE</Link>
      </form>
    </div>
  );
}

export default Sesion;

// import React, { useState } from 'react';
// import { Link, useNavigate } from "react-router-dom";
// import { useData } from "../../contexto/variables.jsx";
// import "./Sesion.css";

// export const Sesion = ()=> {
//   const { iniciarSesion, setUsuario } = useData();
//   const navigate = useNavigate();
//   const [correo, setCorreo] = useState('');
//   const [contrasena, setContrasena] = useState('');


//   const manejarClick = async () => {
//     if (correo === "") {
//       window.alert("Campo correo es obligatorio");
//     } else if (contrasena === "") {
//       window.alert("Campo contraseña es obligatorio");
//     } else {
//       const result = await iniciarSesion(correo, contrasena);
//       if (result.exito) {
//         if (result.usuario) {
//           // Si el usuario está autenticado y tiene un rol de vendedor, lo redirigimos a la sesión de vendedor
//           if (result.usuario.rol === 'Vendedor') {
//             navigate('/sesionvendedor');
//           }
//           // Si el usuario está autenticado y tiene un rol de comprador, lo redirigimos a la página de sesión personalizada
//           else if (result.usuario.rol === 'Comprador') {
//             navigate('/usuario');
//           }
//         }
//         setUsuario(result.usuario)
//         window.alert(result.usuario);
//       } else {
//         window.alert(result.error);
//       }
//     }
//   };

//   const handleCorreoChange = (e) => {
//     setCorreo(e.target.value);
//   };

//   const handleContrasenaChange = (e) => {
//     setContrasena(e.target.value);
//   };

//   return (
//     <div className="inner-container">
//       <div className="text">
//         INICIAR SESION
//       </div>
//       <div className="box">
//         <label id="username">Correo Electronico</label>
//         <input
//           type="text"
//           name="Correo"
//           className="login-input"
//           placeholder="Correo"
//           value={correo}
//           onChange={handleCorreoChange} />

//         <label id="password">Contraseña</label>
//         <input
//           autoComplete='current-password'
          
//           name="contraseña"
//           className="login-input"
//           placeholder="Contraseña"
//           value={contrasena}
//           onChange={handleContrasenaChange} />

//         <Link className='' to="/olvidopwd">¿Olvidó su contraseña?</Link>

//         <button className="Btsesion" onClick={manejarClick}>
//           INICIAR
//         </button>

//         <h1 className='text'>
//           ↓ Si no tienes una cuenta. ↓
//         </h1>
//         <Link className='Btsesion' to="/registro">REGISTRARSE</Link>
//       </div>
//     </div>
//   );
// }

// export default Sesion;
