import React from "react";
import "./GameMenu.scss";
import icon from '../../../../img/logo.png'

function GameMenu(props) {
  return (
    <nav className="game-container-nav">
      <div className="game-container-nav__title"><img src={icon} alt="Platforma Rozrywkowa"></img></div>
      <div className="game-container-nav__menu">
        <ul>
          <li>
            <div className="game-container-nav__menu--options" onClick={props.disconnectUser}>
              Wybierz inną grę
            </div>
          </li>
          <li>
            <div className="game-container-nav__menu--options" onClick={props.goToOtherRoom}>
              Dołącz do innego pokoju
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default GameMenu;
