import {Homeppal} from "./componentes/homebioprep/Homeppal.jsx";
import "./App.css";
import {Head} from "./componentes/headboard/head.jsx";
import {Nosotros} from "./componentes/nosotros/Nosotros"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Sesion} from "./componentes/Sesion/Sesion.jsx";
import {Registro} from "./componentes/registrobioprep/Registro"
import { OlvidoPasswd } from "./componentes/olvidoPasswd/OlvidoPasswd.jsx";
//import SesionComprador from "./componentes/SesionComprador/SesionComprador.jsx";
import SesionVendedor from "./componentes/SesionVendedor/SesionVendedor.jsx";
import Finca from "./componentes/SesionVendedor/Finca/Finca.jsx";

function App() {

  return (
      <div>
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
            <Route path="/finca" element={<Finca></Finca>}/>
            <Route path="/sesioncomprador" element={<Homeppal onSesion={true}></Homeppal>}/>
            </Routes> 
        </BrowserRouter> 
    </div>

  );
}

export default App;
