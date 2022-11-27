import React from "react";
import "./GameMenu.scss";
import icon from '../../../../img/logo.png'
import { Link} from "react-router-dom"



function GameMenu(props) {

  const username = localStorage.getItem("username");

  return (
    <nav className="game-container-nav">
      <div className="game-container-nav__title"><Link to={{ pathname: "/" }}><img onClick={props.disconnectUser} src={icon} alt="Platforma Rozrywkowa"></img></Link></div>
      <div className="game-container-nav__menu">
        <ul>
        <div className="game-container-nav__menu--list-elements">
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
        
          </div>
             <div className="game-container-nav__menu--logout">{username}
             
             <button className="header__navbar--logout-button" onClick={props.logout}>
              Wyloguj się
            </button>
           </div>
            

        </ul>
        <div >
         
          </div>
      </div>
    </nav>
  );
}

export default GameMenu;
