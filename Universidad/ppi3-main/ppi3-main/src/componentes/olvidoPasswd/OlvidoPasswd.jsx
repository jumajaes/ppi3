import React from 'react';
import { Link } from "react-router-dom"
import "./OlvidoPasswd.css"
import OpwdImg from "./OpwdImg.png"

export function OlvidoPasswd() {
    return (

        <div className='olvidopass'>
            <img className='imgopwd' src={OpwdImg} alt="opwd"></img>
            <div class="container">
                
                <h2 className='from-group'h2>Recuperar Contraseña.</h2>

                <div className="idm-group">
                    <label id="correo">Correo Electronico</label>
                    <input type="text" id="correo" name="correo" required />
                </div>
                <div className="idm-group">
                    <label id="cedula">Numero de Cedula</label>
                    <input type="text" id="cedula" name="cedula" required />
                </div>
                
                

                <div className="idm-group">
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
                   window.alert("¡Hola En un plazo maximo de 48 horas te enviaremos a tu correo una nueva "+
                   "contraseña, vuelve al inicio de sesion...");
                }} to="/Sesion" >Recuperar Contraseña.</Link>
               
                

            </div>


        </div>
    );
}

export default OlvidoPasswd;