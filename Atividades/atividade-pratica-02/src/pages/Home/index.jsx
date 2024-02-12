import "./styles.scss";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="homeContainer">
      <h1>Bem vindo ao sistema de Doação de Sangue</h1>

      <div className="crudsContainer">
        <NavLink to="/">
          <h2 className="crudsItem">CRUD Estados</h2>
        </NavLink>
        <NavLink to="/">
          <h2 className="crudsItem">CRUD Cidades</h2>
        </NavLink>
        <NavLink to="/cadastro/local-coleta">
          <h2 className="crudsItem">CRUD Locais de coleta</h2>
        </NavLink>
        <NavLink to="/cadastro/tipo-sanguineo">
          <h2 className="crudsItem">CRUD Tipos Sanguineos</h2>
        </NavLink>
        <NavLink to="/cadastro/pessoa">
          <h2 className="crudsItem">CRUD Pessoas</h2>
        </NavLink>
        <NavLink to="/cadastro/doacao">
          <h2 className="crudsItem">CRUD Doações</h2>
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
