import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Header from "./components/Header";
import LocalColeta from "./pages/LocalColeta";
import TipoSanguineo from "./pages/TipoSanguineo";

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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
