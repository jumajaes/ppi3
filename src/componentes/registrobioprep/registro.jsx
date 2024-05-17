import React from 'react';
import { Link } from "react-router-dom"
import "./Registro.css"
import registroimg from "./registro.png"

export function Registro() {
    return (

        <div>
            <img className='imgregistro' src={registroimg} alt="registro"></img>
            <div className="registration-container">
                <h2>Registro</h2>

                <div className="form-group">
                    <label id="cedula">Número de Cédula:</label>
                    <input type="text" id="cedula" name="cedula" required />
                </div>
                <div className="form-group">
                    <label id="nombre">Nombre:</label>
                    <input type="text" id="nombre" name="nombre" required />
                </div>
                <div className="form-group">
                    <label id="apellido">Apellido:</label>
                    <input type="text" id="apellido" name="apellido" required />
                </div>
                <div className="form-group">
                    <label id="whatsapp">Número de Contacto (WhatsApp):</label>
                    <input type="text" id="whatsapp" name="whatsapp" required />
                </div>
                <div className="form-group">
                    <label id="email">Correo Electrónico:</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                    <label id="password">Contraseña:</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <div className="form-group">
                    <label id="verify-password">Verifique su Contraseña:</label>
                    <input type="password" id="verify-password" name="verify-password" required />
                </div>

                <div className="form-group">
                    <label id="role">Rol:</label>
                    <div>
                        <input type="radio" id="vendedor" name="role" value="Vendedor" />
                        <label id="vendedor">Vendedor</label>
                    </div>
                    <div>
                        <input type="radio" id="comprador" name="role" value="Comprador" />
                        <label id="comprador">Comprador</label>
                    </div>
                </div>

                <Link className='btregistro' onClick={()=>{
                   window.alert("Listo, inicia de sesion con tu nueva cuenta.");
                }} to="/Sesion">REGISTRARSE</Link>

            </div>


        </div>
    );
}

export default Registro;