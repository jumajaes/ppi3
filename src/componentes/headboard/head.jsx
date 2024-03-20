import React from 'react'
import logo from "./logoBP.png"
import logoXL from "./logoXL.png"
import {Link} from "react-router-dom"

import "./head.css"

export function Head() {

  return (
    <div >
    <nav className="head">
        

      <Link to="/"><img className='imghead' src = {logo} alt = "a"></img></Link>
      <Link to="/"><img className='XL' src={logoXL} alt="bioPrep"></img></Link>
       
        
       
        <ul className= "menu">
          
          
            <li><Link className='bt' to="/">Inicio</Link></li>
            <p></p>
            <li><Link className='bt' to="/nosotros">Nosotros</Link></li>
            <p></p>
            <li><Link><button className='bt'>Vendedor</button></Link></li>
            <p></p>
          
        </ul>
    </nav>
    </div>
  );
}

export default Head;
