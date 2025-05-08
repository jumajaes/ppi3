const BASE_URL = "https://silver-barnacle-rxq4pw7g9763xw4x-5000.app.github.dev";

async function getProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error("Error en getProducts");
  return res.json();
}

async function addProduct(product) {
  const res = await fetch(`${BASE_URL}/agregar_producto`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Error en addProduct");
  return res.json();
}

async function deleteProduct(id) {
  const res = await fetch(`${BASE_URL}/eliminar-producto/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error en deleteProduct");
  return res.json();
}

async function editProduct(id, product) {
  const res = await fetch(`${BASE_URL}/editar_producto/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Error en editProduct");
  return res.json();
}

async function registerUser(user) {
  const res = await fetch(`${BASE_URL}/registrar-usuario`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("Error en registerUser");
  return res.json();
}

async function sessionUser(credentials) {
  const res = await fetch(`${BASE_URL}/sesion`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) throw new Error("Error en sessionUser");
  return res.json();
}

async function getUserFarms(userId) {
  const res = await fetch(`${BASE_URL}/obtener_fincas_usuario?id_usuario=${userId}`);
  if (!res.ok) throw new Error("Error en getUserFarms");
  return res.json();
}

async function addFarm(data) {
  const res = await fetch(`${BASE_URL}/agregar_finca`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error en addFarm");
  return res.json();
}

async function deleteFarm(data) {
  const res = await fetch(`${BASE_URL}/eliminar_finca`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error en deleteFarm");
  return res.json();
}

async function getCart(userId) {
  const res = await fetch(`${BASE_URL}/obtener-productos-carrito/${userId}`);
  if (!res.ok) throw new Error("Error en getCart");
  return res.json();
}

async function addToCart(data) {
  const res = await fetch(`${BASE_URL}/agregar-producto-carrito`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error en addToCart");
  return res.json();
}

async function deleteFromCart(userId, productId) {
  const res = await fetch(`${BASE_URL}/eliminar-producto-carrito/${userId}/${productId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error en deleteFromCart");
  return res.json();
}

describe("Pruebas de peticiones API (simuladas)", () => {
  beforeEach(() => {
    global.fetch = jest.fn(); // Mockea fetch globalmente
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("getProducts devuelve la lista de productos", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          id: 1,
          name: "Producto A",
          price: 50.0,
          description: "Descripción del producto A",
          image: "imagen_producto_a.png",
          id_farm: 2,
          category: 1,
          contact: "3111234567",
          name_farm: "Finca A",
          name_category: "Categoría 1",
        },
      ],
    });

    const products = await getProducts();
    expect(products).toBeInstanceOf(Array);
    expect(products[0].name).toBe("Producto A");
  });

  test("addProduct retorna éxito al agregar un producto", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ isCorrect: true, message: "Producto agregado exitosamente" }),
    });

    const productData = {
      Nombre: "Producto Prueba",
      Precio: 1000,
      Descripcion: "Un producto de prueba",
      Imagen: "imagen_prueba.png",
      IDFinca: 1,
      Categoria: 1,
      contacto: "3111234567",
    };

    const result = await addProduct(productData);
    expect(result.isCorrect).toBe(true);
    expect(result.message).toBe("Producto agregado exitosamente");
  });

  test("deleteProduct retorna éxito al eliminar un producto", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ mensaje: "Producto eliminado correctamente" }),
    });

    const result = await deleteProduct(123);
    expect(result.mensaje).toBe("Producto eliminado correctamente");
  });

  test("editProduct retorna éxito al actualizar un producto", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ mensaje: "Producto actualizado correctamente" }),
    });

    const productData = {
      Nombre: "Producto Actualizado",
      Precio: 1500,
      Descripcion: "Producto actualizado",
      Categoria: 2,
      Imagen: "imagen_actualizada.png",
      IDFinca: 1,
    };

    const result = await editProduct(123, productData);
    expect(result.mensaje).toBe("Producto actualizado correctamente");
  });

  test("registerUser retorna éxito al registrar un usuario", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ mensaje: "Usuario registrado correctamente" }),
    });

    const userData = {
      cedula: "12345678",
      nombre: "Juan",
      apellido: "Pérez",
      telefono: "3111234567",
      email: "juan@example.com",
      rol: "cliente",
      edad: 30,
      direccion: "Calle Falsa 123",
      password: "password123",
    };

    const result = await registerUser(userData);
    expect(result.mensaje).toBe("Usuario registrado correctamente");
  });

  test("sessionUser retorna éxito al iniciar sesión", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        exito: true,
        mensaje: "Inicio de sesión exitoso",
        usuario: {
          cedula: "12345678",
          nombre: "Juan",
          apellido: "Pérez",
          telefono: "3111234567",
          email: "juan@example.com",
          rol: "cliente",
          edad: 30,
          direccion: "Calle Falsa 123",
          password: "hashedpassword123",
        },
      }),
    });

    const credentials = {
      email: "juan@example.com",
      password: "password123",
    };

    const result = await sessionUser(credentials);
    expect(result.exito).toBe(true);
    expect(result.mensaje).toBe("Inicio de sesión exitoso");
  });

  test("getUserFarms retorna la lista de fincas de un usuario", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () =>
        Promise.resolve({
          exito: true,
          fincas: [
            { id: 1, id_owner: "12345678", name: "Finca A" },
            { id: 2, id_owner: "12345678", name: "Finca B" },
          ],
        }),
    });

    const result = await getUserFarms("12345678");
    expect(result.exito).toBe(true);
    expect(result.fincas).toHaveLength(2);
  });

  test("addFarm retorna éxito al agregar una finca", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ exito: true, mensaje: "Finca agregada exitosamente" }),
    });

    const farmData = { usuario: "12345678", nombre: "Finca Prueba" };
    const result = await addFarm(farmData);
    expect(result.exito).toBe(true);
    expect(result.mensaje).toBe("Finca agregada exitosamente");
  });

  test("deleteFarm retorna éxito al eliminar una finca", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ exito: true, mensaje: "Finca eliminada exitosamente" }),
    });

    const result = await deleteFarm({ index: 1 });
    expect(result.exito).toBe(true);
    expect(result.mensaje).toBe("Finca eliminada exitosamente");
  });

  test("getCart retorna la lista de productos del carrito", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () =>
        Promise.resolve([{ IDUsuario: "12345678", IDProducto: "ABC123" }]),
    });

    const result = await getCart("12345678");
    expect(Array.isArray(result)).toBe(true);
    expect(result[0].IDProducto).toBe("ABC123");
  });

  test("addToCart retorna éxito al agregar un producto al carrito", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () =>
        Promise.resolve({ mensaje: "Producto agregado al carrito correctamente" }),
    });

    const cartData = { IDUsuario: "12345678", IDProducto: "ABC123" };
    const result = await addToCart(cartData);
    expect(result.mensaje).toBe("Producto agregado al carrito correctamente");
  });

  test("deleteFromCart retorna éxito al eliminar un producto del carrito", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () =>
        Promise.resolve({ mensaje: "Producto eliminado del carrito correctamente" }),
    });

    const result = await deleteFromCart("12345678", "ABC123");
    expect(result.mensaje).toBe("Producto eliminado del carrito correctamente");
  });
});
