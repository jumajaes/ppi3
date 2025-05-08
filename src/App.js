import { Homeppal } from "./componentes/homebioprep/Homeppal.jsx";
import { Head } from "./componentes/headboard/head.jsx";
import { Nosotros } from "./componentes/nosotros/Nosotros";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Sesion } from "./componentes/Sesion/Sesion.jsx";
import { Registro } from "./componentes/registrobioprep/registro.jsx";
import { OlvidoPasswd } from "./componentes/olvidoPasswd/OlvidoPasswd.jsx";
import SesionVendedor from "./componentes/SesionVendedor/SesionVendedor.jsx";
import Finca from "./componentes/SesionVendedor/Finca/Finca.jsx";

import { DataProvider } from './contexto/variables.jsx';
import Usuario from "./componentes/SesionComprador/Usuario.jsx";
import Carrito from "./componentes/SesionComprador/Carrito.jsx";
import Guard from "./contexto/Guard.jsx";

function App() {

  return (
    <DataProvider>
      <BrowserRouter>
        <div className="App">
          <Head />
        </div>
        <Routes>
          <Route path="/" element={<Homeppal onSesion={false} />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/sesion" element={<Sesion />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/olvidopwd" element={<OlvidoPasswd />} />

          {/* Rutas protegidas */}
          <Route path="/sesionvendedor" element={
            <Guard>
              <SesionVendedor />
            </Guard>
          } />
          <Route path="/finca/:idFinca" element={
            <Guard>
              <Finca />
            </Guard>
          } />
          <Route path="/usuario" element={
            <Guard>
              <Usuario />
            </Guard>
          } />
          <Route path="/carrito" element={
            <Guard>
              <Carrito />
            </Guard>
          } />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
