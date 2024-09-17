-- Active: 1726379039128@@127.0.0.1@1433
create database bioprep;

USE bioprep;

-- Crear tabla roles
CREATE TABLE roles (
    rol_id INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(50)
);

-- Crear tabla usuarios con id_usuario como PK y cedula, email, telefono como UNIQUE
CREATE TABLE usuarios (
    id_usuario INT IDENTITY(1,1) PRIMARY KEY,
    cedula INT UNIQUE,
    nombre NVARCHAR(50),
    apellido NVARCHAR(50),
    telefono NVARCHAR(15) UNIQUE,
    email NVARCHAR(50) UNIQUE,
    rol INT,
    edad INT,
    direccion NVARCHAR(100),
    password NVARCHAR(50),
    CONSTRAINT FK_usuarios_roles FOREIGN KEY (rol) REFERENCES roles(rol_id)
);

-- Crear tabla fincas con id_usuario como clave foránea
CREATE TABLE fincas (
    id_finca INT IDENTITY(1,1) PRIMARY KEY,
    id_usuario INT,
    nombre_finca NVARCHAR(50),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

-- Crear tabla categorias
CREATE TABLE categorias (
    categoria_id INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(50)
);

-- Crear tabla productos con IDFinca y categoria_id como claves foráneas
CREATE TABLE productos (
    producto_id INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(50),
    precio DECIMAL(10, 2),
    descripcion NVARCHAR(255),
    imagen NVARCHAR(255),
    id_finca INT,
    categoria_id INT,
    FOREIGN KEY (id_finca) REFERENCES fincas(id_finca),
    FOREIGN KEY (categoria_id) REFERENCES categorias(categoria_id)
);

-- Insertar datos en la tabla usuarios
INSERT INTO usuarios (cedula, nombre, apellido, telefono, email, rol, edad, direccion, password) VALUES
(123456789, 'Juan', 'Pérez', '3001234567', 'juan.perez@example.com', 1, 30, 'Calle 123 #45-67', 'password123'),
(987654321, 'María', 'Gómez', '3009876543', 'maria.gomez@example.com', 2, 25, 'Carrera 45 #67-89', 'password456'),
(456789123, 'Carlos', 'Rodríguez', '3004567890', 'carlos.rodriguez@example.com', 3, 40, 'Avenida 10 #20-30', 'password789'),
(654321987, 'Ana', 'Martínez', '3006543210', 'ana.martinez@example.com', 4, 35, 'Transversal 5 #10-15', 'password012');

-- Insertar datos en la tabla fincas
INSERT INTO fincas (id_usuario, nombre_finca) VALUES
(5, 'Finca El Paraíso'),
(2, 'Finca La Esperanza'),
(3, 'Finca Los Pinos'),
(4, 'Finca Santa María');


-- Insertar datos en la tabla productos
INSERT INTO productos (nombre, precio, descripcion, imagen, id_finca, categoria_id) VALUES
('prod', 12, '121d', 'deswd', 3, 1),
('prod3', 15, '123d', 'deswd3', 3, 2),
('prod4', 18, '124d', 'deswd4', 4, 3),
('prod5', 20, '125d', 'deswd5', 5, 4),
('prod6', 22, '126d', 'deswd6', 5, 5),
('prod7', 25, '127d', 'deswd7', 5, 6),
('prod8', 28, '128d', 'deswd8', 4, 7),
('prod9', 30, '129d', 'deswd9', 3, 8),
('prod10', 32, '130d', 'deswd10', 6, 1),
('prod11', 35, '131d', 'deswd11', 6, 2),
('prod12', 38, '132d', 'deswd12', 6, 3),
('prod13', 40, '133d', 'deswd13', 3, 4),
('prod14', 42, '134d', 'deswd14', 3, 5),
('prod15', 45, '135d', 'deswd15', 3, 6),
('prod16', 48, '136d', 'deswd16', 5, 7),
('prod17', 50, '137d', 'deswd17', 4, 8),
('prod18', 52, '138d', 'deswd18', 6, 1),
('prod19', 55, '139d', 'deswd19', 3, 2),
('prod20', 58, '140d', 'deswd20', 5, 3),
('prod21', 60, '141d', 'deswd21', 4, 4);

-- Insertar datos en la tabla categorias
INSERT INTO categorias (nombre) VALUES
('Abono'),
('Fertilizante'),
('Fungicida'),
('Plaguicida'),
('Herbicida'),
('Nutridor'),
('Hidratante'),
('Calcio');

-- Insertar datos en la tabla roles
INSERT INTO roles (nombre) VALUES
('admin'),
('super admin'),
('vendedor'),
('comprador');

ALTER TABLE productos ALTER COLUMN imagen TEXT;

CREATE TABLE carrito (
    IDUsuario INT,
    IDProducto INT,
    FOREIGN KEY (IDUsuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (IDProducto) REFERENCES productos(producto_id)
);

