import React from "react";
// import backgroundimage from "../../../../img/two.png";
import "./MainContent.scss";
import { Link } from "react-router-dom";
import JoinGame from "../../JoinGame/JoinGame";
function MainContent(props) {
  return (
    <>
      {props.logged ? (
        <div className="main-content">
          {/* <JoinGame fromMainPage={true} /> */}
          <div className="main-content__game-panel">
            <h1 className="main-content__game-panel--title">Wybierz grę</h1>

            <Link
              className="main-content__game-panel--game-type"
              to={{ pathname: "/join-game" }}
              state={{ gameType: props.games.ticTacToe }}
            >
              {props.games.ticTacToe[2]}
            </Link>

            <Link
              className="main-content__game-panel--game-type"
              to={{ pathname: "/join-game" }}
              state={{ gameType: props.games.paperStoneScissors }}
            >
              {props.games.paperStoneScissors[2]}
            </Link>

            <Link
              className="main-content__game-panel--game-type"
              to={{ pathname: "/join-game" }}
              state={{ gameType: props.games.findAPair }}
            >
              {props.games.findAPair[2]}
            </Link>

            <Link
              className="main-content__game-panel--game-type"
              to={{ pathname: "/join-game" }}
              state={{ gameType: props.games.puns }}
            >
              {props.games.puns[2]}
            </Link>
            <Link
              className="main-content__game-panel--game-type"
              to={{ pathname: "/join-game" }}
              state={{ gameType: props.games.maze }}
            >
              {props.games.maze[2]}
            </Link>
          </div>
        </div>
      ) : (
        <div className="main-content">
          <span className="main-content__title">Platforma Rozrywkowa</span>
          <Link className="start-play" to={{ pathname: "/login" }}>
            Zacznij grać
          </Link>
        </div>
      )}
    </>
  );
}

export default MainContent;
