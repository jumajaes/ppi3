import {Homeppal} from "./componentes/homebioprep/Homeppal.jsx";
import "./App.css";
import {Head} from "./componentes/headboard/head.jsx";
import {Nosotros} from "./componentes/nosotros/Nosotros"
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {

  return (


      <div>
        <BrowserRouter>
          <div className="App">
            <Head/>
          </div>
          <Routes>  
            <Route path="/" element = {<Homeppal></Homeppal>}/>
            <Route path="/nosotros" element={<Nosotros></Nosotros>}/>
          </Routes>
        </BrowserRouter> 
    </div>

  );
}

export default App;
