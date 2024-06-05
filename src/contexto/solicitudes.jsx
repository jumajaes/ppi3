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
  try {
    const response = await fetch(APIUrls.REGISTRAR_USUARIO_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoUsuario),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    throw error;
  }
};

const iniciarSesion = async (email, password) => {
  try {
    const response = await fetch(APIUrls.INICIAR_SESION, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

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


// Obtener productos del carrito para un usuario específico
// const obtenerProductosCarrito = async (idUsuario) => {
//   try {
//     const response = await fetch(`${APIUrls}/carrito/${idUsuario}`, {
//       method: 'GET',
//     });
//     const productosCarrito = await response.json();
//     return productosCarrito;
//   } catch (error) {
//     console.error('Error al obtener productos del carrito:', error);
//     return { exito: false, error: 'Error de red' };
//   }
// };


export { iniciarSesion, obtenerProductos, registrarUsuario, actualizarDatosUsuario};
