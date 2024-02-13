import "./Header.css";

import { Link, NavLink } from "react-router-dom";
import { BsCart, BsPerson } from "react-icons/bs";

export const Header = () => {
  return (
    <header className="container_header">
      <nav className="container_logo_pages">
        <div className="logo">
          <NavLink to="/">Greenmind</NavLink>
        </div>

        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/products">Products</NavLink>
          </li>
          <li>
            <NavLink to="/contacts">Contacts</NavLink>
          </li>
        </ul>
      </nav>

      <div className="container_profile_cart">
        <div className="cart_icon">
          <Link to="#">
            <BsCart />
          </Link>
        </div>
        <div className="person_icon">
          <NavLink to="/products/register">
            <BsPerson />
          </NavLink>
        </div>
      </div>
    </header>
  );
};
