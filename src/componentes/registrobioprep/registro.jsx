import React, { useState } from 'react';
import "./Registro.css";
import { useData } from "../../contexto/variables.jsx";
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();

    const handleRegistro = async () => {

        const nuevoUsuario = {
            cedula,
            nombre,
            apellido,
            telefono,
            email,
            edad: parseInt(edad),
            direccion,
            rol,
            password


        };

        registrarUsuario(nuevoUsuario)
            .then(data => {
                console.log(data);
                navigate('/Sesion')
            })
            .catch(error => {console.log(error)});

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
        <div className="registro">
            <div >
                <form className="registrpform">
                    <h2>Registro</h2>

                    <label htmlFor="cedula">Cédula:</label>
                    <input className='inputregi' type="text" id="cedula" name="cedula" required value={cedula} onChange={(e) => setCedula(e.target.value)} />

                    <label htmlFor="nombre">Nombre:</label>
                    <input className='inputregi' type="text" id="nombre" name="nombre" required value={nombre} onChange={(e) => setNombre(e.target.value)} />

                    <label htmlFor="apellido">Apellido:</label>
                    <input className='inputregi' type="text" id="apellido" name="apellido" required value={apellido} onChange={(e) => setApellido(e.target.value)} />

                    <label htmlFor="telefono">Teléfono:</label>
                    <input className='inputregi' type="text" id="telefono" name="telefono" required value={telefono} onChange={(e) => setTelefono(e.target.value)} />

                    <label htmlFor="email">Correo Electrónico:</label>
                    <input className='inputregi' type="email" id="email" name="email" required autoComplete='email' value={email} onChange={(e) => setEmail(e.target.value)} />

                    <label htmlFor="password">Contraseña:</label>
                    <input className='inputregi' type="password" id="password" name="password" autoComplete="new-password" required value={password} onChange={(e) => setPassword(e.target.value)} />

                    <label htmlFor="verify-password">Verifique su Contraseña:</label>
                    <input placeholder='' className='inputregi' type="password" id="verify-password" autoComplete="new-password" name="verify-password" required value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} />

                    <label htmlFor="rol">Rol:</label>
                    <select className='inputregi' id="rol" name="rol" required value={rol} onChange={(e) => setRol(e.target.value)}>
                        <option value="">Seleccione un rol</option>
                        <option value="1">Vendedor</option>
                        <option value="2">Comprador</option>
                    </select>

                    <label htmlFor="edad">Edad:</label>
                    <input className='inputregi' type="number" id="edad" name="edad" required value={edad} onChange={(e) => setEdad(e.target.value)} />

                    <label htmlFor="direccion">Dirección:</label>
                    <input className='inputregi' type="text" id="direccion" name="direccion" required value={direccion} onChange={(e) => setDireccion(e.target.value)} />
                    <button className='inputregi' onClick={handleRegistro}>REGISTRARSE</button>
                </form>

            </div>
        </div>
    );
}

export default Registro;
