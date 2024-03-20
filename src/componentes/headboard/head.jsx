import React from 'react'
import logo from "./logoBP.png"
import logoXL from "./logoXL.png"

import "./head.css"

export function Head() {

  return (
    <div >
    <nav className="head">
        

      <img className='imghead' src = {logo} alt = "a"></img>
      
             <img className='XL' src={logoXL} alt="bioPrep"></img>
       
        
       
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
