import React, { createContext, useContext, useState, useEffect } from 'react';
import { obtenerProductos, registrarUsuario, iniciarSesion, actualizarDatosUsuario } from './solicitudes';

// Creamos el contexto de datos
const DataContext = createContext();

// Hook personalizado para acceder al contexto de datos
export const useData = () => useContext(DataContext);

// Componente proveedor del contexto de datos
export const DataProvider = ({ children }) => {
  // Obtenemos el usuario guardado en sessionStorage al iniciar la aplicación
  const [usuario, setUsuario] = useState(JSON.parse(sessionStorage.getItem('usuario')) || null);
  const [BtIniciarSesion, setBtIniciarSesion] = useState("INICIAR");
  const [resetCarrito, setResetCarrito] = useState(false)

  // Actualizamos sessionStorage cada vez que cambia el usuario
  useEffect(() => {
    sessionStorage.setItem('usuario', JSON.stringify(usuario));
  }, [usuario]);

  return (
    <DataContext.Provider value={{
      resetCarrito, setResetCarrito,

      obtenerProductos,

      registrarUsuario, usuario,  setUsuario,
      actualizarDatosUsuario,

      iniciarSesion,

      setBtIniciarSesion,
      BtIniciarSesion,
      
    }}>
      {children}
    </DataContext.Provider>
  );
};
