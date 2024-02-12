import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Header from "./components/Header";
import LocalColeta from "./pages/LocalColeta";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro/local-coleta" element={<LocalColeta />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
