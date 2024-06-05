import React from "react"
import "./Nosotros.css"
import { Link } from "react-router-dom";
import logo from "../headboard/logoBP.png"
import logoXL from "../headboard/logoXL.png"

export function Nosotros() {

  return (
    <div className="nosotros">



      <Link to="/"><img className="imgNosotros" src={logo} alt="logo" ></img></Link>
      <Link to="/"><img className="imgNosotros" src={logoXL} alt="bioPrep"></img></Link>
      <hr width="100%"/>
      
      <div className="parrafo">
        <h1 className="">Somos...</h1>
        <p>
          Una pagina Web dedicada a la gestión y promoción de productos biopreparados en el área metropolitana de Medellín.
        </p>
      </div>
    </div>
  );
}

export default Nosotros;
