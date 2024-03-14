import React from 'react'
import logo from "./logoBP.png"
import "./head.css"

export function Head() {

  return (
    <div >
    <nav className="head">
        
       <h1 className='titulo'>BioPrep</h1>
       <h1>
       <img className='imghead' src = {logo} alt = "a"></img> 
       </h1>
        <ul className= "menu">
          
           <div>
            <p></p>
            <li><button className='btNosotros'>Nosotros</button></li>
            <p></p>
            <li><button className='btVendedores'>Vendedor</button></li>
            </div>
        </ul>
    </nav>
    </div>
  );
}

export default Head;
