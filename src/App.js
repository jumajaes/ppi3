import {Homeppal} from "./componentes/homebioprep/Homeppal.jsx";

import {Head} from "./componentes/headboard/head.jsx";
import {Nosotros} from "./componentes/nosotros/Nosotros"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Sesion} from "./componentes/Sesion/Sesion.jsx";
import {Registro} from "./componentes/registrobioprep/Registro"
import { OlvidoPasswd } from "./componentes/olvidoPasswd/OlvidoPasswd.jsx";
import SesionVendedor from "./componentes/SesionVendedor/SesionVendedor.jsx";
import Finca from "./componentes/SesionVendedor/Finca/Finca.jsx";

import { DataProvider } from './contexto/variables.jsx'
import Usuario from "./componentes/SesionComprador/Usuario.jsx";
import Carrito from "./componentes/SesionComprador/Carrito.jsx";

function App() {

  return (
      <DataProvider>
        <BrowserRouter>
          <div className="App">
            <Head/>
          </div>
          <Routes>  
            <Route path="/" element = {<Homeppal onSesion={false} ></Homeppal>}/>
            <Route path="/nosotros" element={<Nosotros></Nosotros>}/>
            <Route path="/sesion" element={<Sesion></Sesion>}/>
            <Route path="/registro" element={<Registro></Registro>}/>
            <Route path="/olvidopwd" element={<OlvidoPasswd></OlvidoPasswd>}/>
            <Route path="/sesionvendedor" element={<SesionVendedor></SesionVendedor>}/>
            <Route path="/finca/:idFinca" element={<Finca></Finca>}/>
            <Route path="/usuario" element={<Usuario/>}/>
            <Route path="/carrito" element={<Carrito></Carrito>}/>
            </Routes>  
        </BrowserRouter> 
    </DataProvider>

  );
}

export default App;
