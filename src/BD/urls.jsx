const API_URL = 'https://3167jpp0-5000.use2.devtunnels.ms';

const APIUrls = {
  USUARIOS_URL: `${API_URL}/usuarios`,
  ROLES_URL: `${API_URL}/roles`,
  PRODUCTOS_URL: `${API_URL}/productos`,
  FINCAS_URL: `${API_URL}/fincas`,
  CARRITO_URL: `${API_URL}/carrito`,
  REGISTRAR_USUARIO_URL : `${API_URL}/registrar-usuario`, 
  INICIAR_SESION : `${API_URL}/iniciar-sesion`, 
  ACTUALIZAR_USUARIO : `${API_URL}/actualizar-usuario`,
  AGREGAR_FINCA : `${API_URL}/agregar_finca`,
  FINCAS_USUARIO:`${API_URL}/obtener_fincas_usuario`,
  carritoPorUsuarioURL: (idUsuario) => `${API_URL}/carrito/${idUsuario}`
};

export default APIUrls;
