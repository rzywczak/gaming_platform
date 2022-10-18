import React, { useEffect, useState } from "react";
import "./JoinGame.scss";
import { useLocation, useNavigate, useParamsm, Link} from "react-router-dom";
import CreateGame from "../CreateGame/CreateGame";
import axios from 'axios'
import io from "socket.io-client";

// const socket = io();

function JoinGame() {
  const location = useLocation();
  const navigate = useNavigate();

  const { gameType, logOutFunction, username } = location.state || "noSelectedRoom";

  const [ selectedGame, setSelectedGame] = useState()

  useEffect(() => {
   
  
}
  
  )
  
  const joingameSubmit = (e) => {
    e.preventDefault();
    console.log('joined Game')

    navigate('/game-room')
  }
  


  


  return (
    // <div className="join-game">

    <div className="centered-form">
      <div className="centered-form__box">
        <div className="rooms">
          <h2>{gameType}</h2>
          <form onSubmit={(e) => joingameSubmit(e)}>
            <label> {username} </label>
            <label>Nazwa pokoju</label>
            <input type="text" name="room" placeholder="Podaj nazwe pokoju" required autoComplete="off"></input>
            <label>Hasło</label>
            <input type="password" name="room" placeholder="Podaj hasło" required autoComplete="off"></input>
            <button>Dołącz</button>
          </form>
        </div>
        <div className="create-room">
          <CreateGame gameType={gameType} username={username} />
        </div>

        <div>
            {/* <button onClick={logOutFunction}>logOut</button> */}
            </div>
        </div>

        {/* wyświetlanie dostępnnych pokoji */}
      </div>
   
  );
}
export default JoinGame;
