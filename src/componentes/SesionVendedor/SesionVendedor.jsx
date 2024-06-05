import React, { useState, useEffect } from "react";
import imgFinca from "./Finca/finca.png"
import "./SesionVendedor.css"
import { Link } from "react-router-dom";
import { useData } from "../../contexto/variables";

export function SesionVendedor() {

    const [botones, setBotones] = useState([]);
    const {usuario} = useData()
    console.log(usuario)

    const idUsuario = usuario.id; // Asegúrate de tener el ID del usuario aquí

    const obtenerFincas = () => {
        fetch(`http://localhost:5000/obtener_fincas_usuario?id_usuario=${idUsuario}`)
            .then(response => response.json())
            .then(data =>{ 
                console.log(data.fincas)
                setBotones(data.fincas)})
            .catch(error => console.error('Error:', error));
    }

    useEffect(obtenerFincas, [idUsuario]);

    const agregarBoton = (nombre) => {

        console.log(nombre, idUsuario)
        fetch('http://localhost:5000/agregar_finca', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ usuario: idUsuario, nombre }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.exito) {
                obtenerFincas();
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };


    const eliminarBoton = (index) => {
        console.log(index)
        fetch(`http://localhost:5000/eliminar_finca`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({index}),
        })
        .then(response => response.json())
        .then(data => {
            if (data.exito) {
                obtenerFincas();
            } else {
                console.error('Error:', data.error);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };
    

    return (
        <div className="btFinca">
            <h1>Fincas</h1>
            
            <button onClick={() => {
                const nombre = prompt('Por favor ingresa el nombre de la finca');
                (nombre !== null | nombre !== "") && agregarBoton(nombre)
                
            }}>
                Agregar Finca
            </button>
            {botones.map((e) => (
                <div key={e.ID} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <div>{e.nombre}</div>
                    <Link className="btFinca" onClick={()=>{
                        
                    }} to={`/finca/${e.ID}`}>
                    
                    <img className="imgFinca" src={imgFinca} alt="imagen" style={{ maxWidth: '300px', minHeight: '300px' }} /></Link>
                    <button onClick={() => eliminarBoton(e.ID)} >x Eliminar Finca</button>
                </div>
            ))}

        </div>
    );
};

export default SesionVendedor;
