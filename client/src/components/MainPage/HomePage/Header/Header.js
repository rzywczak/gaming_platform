import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../../img/logo.png";
import "./Header.scss";

function Header(props) {
  return (
    <header className="header">
      <Link to={{ pathname: "/" }}>
        <img className="header__logo" src={Logo} alt="Platforma Rozrywkowa"></img>
      </Link>
      {props.logged ? (
        <nav className="header__navbar">
          <ul className="header__navbar--ul">
            {/* <li className="header__navbar--li" >
            <Link className="start-play" to={{ pathname: "/login" }}>Zacznij grać</Link>
          </li> */}
          </ul>

          <div className="header__navbar--logout">
            <div>Użytkownik {props.userName}</div>
            <button className="header__navbar--logout-button" onClick={props.logout}>
              Wyloguj się
            </button>
          </div>
        </nav>
      ) : (
        <nav className="header__navbar">
          <ul className="header__navbar--ul">
            <li className="header__navbar--li">
              <Link to={{ pathname: "/" }}>Jak Grać</Link>
            </li>
            <li className="header__navbar--li">
              <Link className="start-play" to={{ pathname: "/login" }}>
                Zacznij grać
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;
