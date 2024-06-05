import React, { useState } from 'react';
import "./Registro.css";
import registroimg from "./registro.png";
import { useData } from "../../contexto/variables.jsx";

export const Registro = () => {
    const { registrarUsuario } = useData();

    const [cedula, setCedula] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [rol, setRol] = useState("");
    const [edad, setEdad] = useState("");
    const [direccion, setDireccion] = useState("");

    const handleRegistro = async () => {


        if (password !== verifyPassword) {
            window.alert("Las contraseñas no coinciden.");
            return;
        }
        const nuevoUsuario = {
            cedula,
            nombre,
            apellido,
            telefono,
            email,
            password,
            rol,
            edad: parseInt(edad),
            direccion
        };
        console.log(nuevoUsuario)
        try {
           

            const result = await registrarUsuario(nuevoUsuario);

            if (result && result.mensaje) {
                window.alert("Usuario registrado con éxito.");
            } else {
                window.alert((result && result.error) || "Ha ocurrido un error al registrar el usuario. Por favor, inténtalo nuevamente.");
            }
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            window.alert("Ha ocurrido un error al registrar el usuario. Por favor, inténtalo nuevamente.");
        }

        setCedula("");
        setNombre("");
        setApellido("");
        setTelefono("");
        setEmail("");
        setPassword("");
        setVerifyPassword("");
        setRol("");
        setEdad("");
        setDireccion("");

    };
    
    return (
        <div className="container-registro">
            <img className='imgregistro' src={registroimg} alt="registro"></img>
            <div className="registration-container">
                <form className="registration-container form-group">
                    <h2>Registro</h2>

                    <label htmlFor="cedula">Cédula:</label>
                    <input type="text" id="cedula" name="cedula" required value={cedula} onChange={(e) => setCedula(e.target.value)} />

                    <label htmlFor="nombre">Nombre:</label>
                    <input type="text" id="nombre" name="nombre" required value={nombre} onChange={(e) => setNombre(e.target.value)} />

                    <label htmlFor="apellido">Apellido:</label>
                    <input type="text" id="apellido" name="apellido" required value={apellido} onChange={(e) => setApellido(e.target.value)} />

                    <label htmlFor="telefono">Teléfono:</label>
                    <input type="text" id="telefono" name="telefono" required value={telefono} onChange={(e) => setTelefono(e.target.value)} />

                    <label htmlFor="email">Correo Electrónico:</label>
                    <input type="email" id="email" name="email" required autoComplete='email' value={email} onChange={(e) => setEmail(e.target.value)} />

                    <label htmlFor="password">Contraseña:</label>
                    <input type="password" id="password" name="password" autoComplete="new-password" required value={password} onChange={(e) => setPassword(e.target.value)} />

                    <label htmlFor="verify-password">Verifique su Contraseña:</label>
                    <input type="password" id="verify-password" autoComplete="new-password" name="verify-password" required value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} />

                    <label htmlFor="rol">Rol:</label>
                    <select id="rol" name="rol" required value={rol} onChange={(e) => setRol(e.target.value)}>
                        <option value="">Seleccione un rol</option>
                        <option value="Vendedor">Vendedor</option>
                        <option value="Comprador">Comprador</option>
                    </select>

                    <label htmlFor="edad">Edad:</label>
                    <input type="number" id="edad" name="edad" required value={edad} onChange={(e) => setEdad(e.target.value)} />

                    <label htmlFor="direccion">Dirección:</label>
                    <input type="text" id="direccion" name="direccion" required value={direccion} onChange={(e) => setDireccion(e.target.value)} />
                </form>
                <button className='btregi' onClick={handleRegistro}>REGISTRARSE</button>
            </div>
        </div>
    );
}

export default Registro;
