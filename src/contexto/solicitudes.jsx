import APIUrls from '../BD/urls.jsx';


const obtenerProductos = async () => {
  try {
    const response = await fetch(APIUrls.PRODUCTOS_URL)
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return [];
  }
};


const registrarUsuario = async (nuevoUsuario) => {
  console.log(nuevoUsuario)
  const response = await fetch('https://localhost:5000/registrar-usuario', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoUsuario),
  });

  if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

const iniciarSesion = async (email, password) => {
  try {
    const response = await fetch('https://3167jpp0-5000.use2.devtunnels.ms/iniciar-sesion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    console.log(response)
    if (response.ok) {
      const data = await response.json();
      return { exito: true, mensaje: data.mensaje, usuario: data.usuario };
    } else {
      const errorData = await response.json();
      return { exito: false, error: errorData.error };
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return { exito: false, error: 'Ha ocurrido un error al iniciar sesión. Por favor, inténtalo nuevamente.' };
  }
};

const actualizarDatosUsuario = async (datosUsuario) => {
  try {
    const response = await fetch(APIUrls.ACTUALIZAR_USUARIO, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosUsuario),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error actualizando datos del usuario:', error);
    return { exito: false, error: 'Error de red' };
  }
};


export { iniciarSesion, obtenerProductos, registrarUsuario, actualizarDatosUsuario};
