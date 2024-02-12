import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Header from "./components/Header";
import LocalColeta from "./pages/LocalColeta";
import TipoSanguineo from "./pages/TipoSanguineo";
import Pessoa from "./pages/Pessoa";
import Doacao from "./pages/Doacao";
import Estado from "./pages/Estados";
import Cidade from "./pages/Cidade";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro/local-coleta" element={<LocalColeta />} />
          <Route path="/cadastro/tipo-sanguineo" element={<TipoSanguineo />} />
          <Route path="/cadastro/pessoa" element={<Pessoa />} />
          <Route path="/cadastro/doacao" element={<Doacao />} />
          <Route path="/cadastro/estado" element={<Estado />} />
          <Route path="/cadastro/cidade" element={<Cidade />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
