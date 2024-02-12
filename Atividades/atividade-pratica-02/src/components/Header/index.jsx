import "./styles.scss";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="container_header">
      <nav className="container_navigation">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/cadastro/local-coleta">Local de coleta</NavLink>
          </li>
          <li>
            <NavLink to="/cadastro/tipo-sanguineo">Tipo sanguineo</NavLink>
          </li>
          <li>
            <NavLink to="/cadastro/doacao">Doação</NavLink>
          </li>
          <li>
            <NavLink to="/cadastro/pessoa">Pessoas</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
