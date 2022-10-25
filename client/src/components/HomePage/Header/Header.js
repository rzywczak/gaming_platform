import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../img/logo.png";
import "./Header.scss";

function Header() {
  return (
    <header className="header">
      <Link to={{ pathname: "/" }}>
        <img className="header__logo" src={Logo} alt="Platforma Rozrywkowa"></img>
      </Link>
      <nav className="header__navbar">
        <ul className="header__navbar--ul">
          <li className="header__navbar--li">
            <Link to={{ pathname: "/game-page" }}>Jak Grać</Link>
          </li>
          <li className="header__navbar--li" >
            <Link className="start-play" to={{ pathname: "/game-page" }}>Zacznij grać</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
