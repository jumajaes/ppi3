import React, { useState, useEffect } from 'react';
import { useData } from "../../contexto/variables.jsx";
import "./Usuario.css";
import { useNavigate } from 'react-router-dom';


const Usuario = () => {
  const { usuario, actualizarDatosUsuario, setUsuario, setBtIniciarSesion } = useData();

  const [datosUsuario, setDatosUsuario] = useState(usuario);
  const [mostrarActualizarContrasena, setMostrarActualizarContrasena] = useState(false);
  const [contrasenaActual, setContrasenaActual] = useState('');
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setDatosUsuario(usuario);
  }, [usuario]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatosUsuario({ ...datosUsuario, [name]: value });
  };

  const handlePasswordChange = (e) => {
    setNuevaContrasena(e.target.value);
  };

  const handleContrasenaActualChange = (e) => {
    setContrasenaActual(e.target.value);
  };

  const handleConfirmarContrasenaChange = (e) => {
    setConfirmarContrasena(e.target.value);
  };

  const toggleActualizarContrasena = () => {
    setMostrarActualizarContrasena(!mostrarActualizarContrasena);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const datosActualizados = { ...datosUsuario };

    if (mostrarActualizarContrasena) {
      if (nuevaContrasena !== confirmarContrasena) {
        window.alert("Las nuevas contraseñas no coinciden");
        return;
      }
      datosActualizados.password = nuevaContrasena;
      datosActualizados.oldPassword = contrasenaActual;
      
    }

    const result = await actualizarDatosUsuario(datosActualizados);
    if (result) {
      setMostrarActualizarContrasena(!mostrarActualizarContrasena)
      console.log("Datos actualizados correctamente");
    } else {
      console.error("Error al actualizar datos del usuario");
    }
  };

  return (
    <div className="usuario-container">
      <button onClick={()=>{
        setUsuario(null)
        setBtIniciarSesion("INICIAR")
        navigate('/')
      }}>
              CERRAR SESION
            </button>
      <h2>Datos del Usuario</h2>
      <form className="usuario-form" onSubmit={handleSubmit} autoComplete="off">
        {datosUsuario && (
          <>
            <div className="form-group">
              <label htmlFor="nombre">Nombre:</label>
              <input type="text" id="nombre" name="nombre" value={datosUsuario.nombre} onChange={handleInputChange} autoComplete="off" />
            </div>
            <div className="form-group">
              <label htmlFor="apellido">Apellido:</label>
              <input type="text" id="apellido" name="apellido" value={datosUsuario.apellido} onChange={handleInputChange} autoComplete="off" />
            </div>
            <div className="form-group">
              <label htmlFor="edad">Edad:</label>
              <input type="text" id="edad" name="edad" value={datosUsuario.edad} onChange={handleInputChange} autoComplete="off" />
            </div>
            <div className="form-group">
              <label htmlFor="telefono">Teléfono:</label>
              <input type="text" id="telefono" name="telefono" value={datosUsuario.telefono} onChange={handleInputChange} autoComplete="off" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico:</label>
              <input type="email" id="email" name="email" value={datosUsuario.email} onChange={handleInputChange} autoComplete="off" />
            </div>
            <div className="form-group">
              <label htmlFor="direccion">Dirección:</label>
              <input type="text" id="direccion" name="direccion" value={datosUsuario.direccion} onChange={handleInputChange} autoComplete="off" />
            </div>
            <button type="button" className="btn-actualizar-contrasena" onClick={toggleActualizarContrasena}>
              {mostrarActualizarContrasena ? 'Cancelar' : 'Actualizar Contraseña'}
            </button>

            {mostrarActualizarContrasena && (
              <div className="actualizar-contrasena">
                <div className="form-group">
                  <label htmlFor="contrasena-actual">Contraseña Actual:</label>
                  <input
                    type="password"
                    id="contrasena-actual"
                    name="contrasena-actual"
                    value={contrasenaActual}
                    onChange={handleContrasenaActualChange}
                    autoComplete="off"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="nueva-contrasena">Nueva Contraseña:</label>
                  <input
                    type="password"
                    id="nueva-contrasena"
                    name="nueva-contrasena"
                    value={nuevaContrasena}
                    onChange={handlePasswordChange}
                    autoComplete="off"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmar-contrasena">Confirmar Nueva Contraseña:</label>
                  <input
                    type="password"
                    id="confirmar-contrasena"
                    name="confirmar-contrasena"
                    value={confirmarContrasena}
                    onChange={handleConfirmarContrasenaChange}
                    autoComplete="off"
                  />
                </div>
              </div>
            )}

          <button type="submit" style={{ display: mostrarActualizarContrasena ? 'flex' : 'none' }} className="btn-actualizar">Actualizar</button>
          </>
        )}
      </form>
    </div>
  );
};

export default Usuario;
