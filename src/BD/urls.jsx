//const API_URL = 'http://localhost:5000';
const API_URL = 'https://silver-barnacle-rxq4pw7g9763xw4x-5000.app.github.dev';


const APIUrls = {
  USUARIOS_URL: `${API_URL}/usuarios`,
  ROLES_URL: `${API_URL}/roles`,
  PRODUCTS_URL: `${API_URL}/products`,
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
