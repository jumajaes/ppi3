import React from "react";
import { useState } from "react";
import imgFinca from "./Finca/finca.png"
import "./SesionVendedor.css"
import { Link } from "react-router-dom";

export function SesionVendedor() {

    const [botones, setBotones] = useState([]);

    const agregarBoton = (nombre) => {
        setBotones([...botones, nombre]);
    };

    const eliminarBoton = (index) => {
        const newBotones = [...botones];
        newBotones.splice(index, 1);
        setBotones(newBotones);
    };

    return (
        <div className="btFinca">
            <h1>Agregar Finca</h1>
            <button onClick={() => {
                const nombre = prompt('Por favor ingresa el nombre de la finca');
                agregarBoton(nombre);
            }}>
                Agregar Finca
            </button>
            {botones.map((nombre, index) => (
                <div key={index} style={{ textAlign: 'center', margin: '10px' }}>
                    <div>{nombre}</div>
                    <Link className="btFinca" onClick={()=>{
                        
                    }} to="/finca">
                    
                    <img className="imgFinca" src={imgFinca} alt="imagen" /></Link>
                    <button onClick={() => eliminarBoton(index)} >x Eliminar Finca</button>
                </div>
            ))}

        </div>
    );
};

export default SesionVendedor;
