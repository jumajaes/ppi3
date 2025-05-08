import React, { createContext, useContext, useState, useEffect } from 'react';
import { obtenerProductos, registrarUsuario, iniciarSesion, actualizarDatosUsuario } from './solicitudes';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(JSON.parse(sessionStorage.getItem('usuario')) || null);
  const [BtIniciarSesion, setBtIniciarSesion] = useState("INICIAR");
  console.log(usuario)
  const [resetCarrito, setResetCarrito] = useState(false)

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
