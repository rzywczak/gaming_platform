import React from "react";
import "./GameMenu.scss";
import icon from '../../../../img/logo.png'
import { Link} from "react-router-dom"

function GameMenu(props) {
  return (
    <nav className="game-container-nav">
      <div className="game-container-nav__title"><Link to={{ pathname: "/" }}><img src={icon} alt="Platforma Rozrywkowa"></img></Link></div>
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
