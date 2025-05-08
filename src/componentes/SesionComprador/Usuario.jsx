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
    console.log(result)
    if (result && result.exito) {
      setMostrarActualizarContrasena(false)
      console.log("Datos actualizados correctamente");
      setUsuario(datosActualizados)
      console.log(datosActualizados, "$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
    } else {
      console.error("Error al actualizar datos del usuario");
    }
  };

  return (
    <div className="usuario">
      <button className='btusuario' onClick={() => {
        setUsuario(null)
        setBtIniciarSesion("INICIAR")
        navigate('/')
      }}>
        CERRAR SESION
      </button>


      {datosUsuario.rol === "1" && <button className='btusuario' onClick={() => {
        (datosUsuario.rol === "1") ? navigate('/sesionvendedor') : alert("Deber ser un vendedor.")
      }}>
        MIS FINCAS
      </button>}
      <h2>Datos del Usuario</h2>
      <form className="usuario-form" onSubmit={handleSubmit} autoComplete="off">
        {datosUsuario && (
          <div className='datosdeusuario'>
            <div className='btusuario'>
              <label >Nombre:</label>
              <input type="text" id="nombre" name="nombre" value={datosUsuario.nombre} onChange={handleInputChange} autoComplete="off" />
            </div>
            <div className='btusuario'>
              <label htmlFor="apellido">Apellido:</label>
              <input type="text" id="apellido" name="apellido" value={datosUsuario.apellido} onChange={handleInputChange} autoComplete="off" />
            </div>
            <div className='btusuario'>
              <label htmlFor="edad">Edad:</label>
              <input type="text" id="edad" name="edad" value={datosUsuario.edad} onChange={handleInputChange} autoComplete="off" />
            </div>
            <div className='btusuario'>
              <label htmlFor="telefono">Teléfono:</label>
              <input type="text" id="telefono" name="telefono" value={datosUsuario.telefono} onChange={handleInputChange} autoComplete="off" />
            </div>
            <div className='btusuario'>
              <label htmlFor="email">Correo Electrónico:</label>
              <input type="text" id="email" name="email" value={datosUsuario.email} onChange={handleInputChange} autoComplete="off" />
            </div>
            <div className='btusuario'>
              <label htmlFor="direccion">Dirección:</label>
              <input type="text" id="direccion" name="direccion" value={datosUsuario.direccion} onChange={handleInputChange} autoComplete="off" />
            </div>


            <div className='btnsusuario'>

              <button type="button" className='btusuario' onClick={toggleActualizarContrasena}>
                {mostrarActualizarContrasena ? 'Cancelar' : 'Cambiar Contraseña'}
              </button>
            </div>

          </div>
        )}
        {mostrarActualizarContrasena && (
          <div className='actualizarcontrasenausuario' >
            <div className="form-group">
              <label htmlFor="contrasena-actual">Contraseña Actual:</label>
              <input
                type="password"
                id="contrasena-actual"
                name="contrasena-actual"
                value={contrasenaActual}
                onChange={handleContrasenaActualChange}
                autoComplete="off"
                required
                className='btusuario'
                placeholder='Contraseña Actual'
              />
            </div>
            <div >
              <label htmlFor="nueva-contrasena">Nueva Contraseña:</label>
              <input
                type="password"
                id="nueva-contrasena"
                name="nueva-contrasena"
                value={nuevaContrasena}
                className='btusuario'
                onChange={handlePasswordChange}
                autoComplete="off"
                required
                placeholder='Nueva Contraseña'
              />
            </div>
            <div >
              <label htmlFor="confirmar-contrasena">Confirmar Nueva Contraseña:</label>
              <input
                type="password"
                id="confirmar-contrasena"
                name="confirmar-contrasena"
                required
                value={confirmarContrasena}
                className='btusuario'
                onChange={handleConfirmarContrasenaChange}
                autoComplete="off"
                placeholder='Confirmar Contraseña'
              />
            </div>

          </div>
        )}
        <button type="submit" className="btusuario">Actualizar</button>

      </form>
    </div>
  );
};

export default Usuario;
