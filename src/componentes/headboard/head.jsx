import React, { useEffect } from 'react'
import logo from "./logoBP.png"
import logoXL from "./logoXL.png"
import {Link} from "react-router-dom"

import "./head.css"
import { useData } from '../../contexto/variables'



export function Head() {


  const {BtIniciarSesion, setBtIniciarSesion, usuario} = useData()
  useEffect(()=>{
    usuario !== null && setBtIniciarSesion('PERFIL')
  },[setBtIniciarSesion, usuario])


  return (

    
    <div className="head" >

      <Link to="/" className='imghead'><img className='imgh'  src = {logo} alt = "a"></img></Link>
      <Link className='XL' to="/"><img className='imgh' src={logoXL} alt="bioPrep"></img></Link>
      <ul className= "menu">
          <li><Link className='bt' to="/">Inicio</Link></li>
          <li><Link className='bt' to="/nosotros">Nosotros</Link></li>
          <li><Link className='bt' to={BtIniciarSesion==='PERFIL' ? "/usuario": "/sesion"}>{BtIniciarSesion}</Link></li>
          
      </ul>
  
    </div>
  );
}

export default Head;
