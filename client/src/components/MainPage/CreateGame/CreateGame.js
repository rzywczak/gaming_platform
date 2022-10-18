import React, { useState } from "react";
import "./CreateGame.scss";
import { useLocation, Link, useNavigate } from "react-router-dom";

function CreateGame(props) {

const [isOpenCreateRoomForm, setIsOpenCreateRoomForm] = useState(false);
const gameType = props.gameType;
const username = props.username;
const navigate = useNavigate();





  const creategameSubmit = (e) => {
    e.preventDefault();
    console.log('created Game')
  }


  return (
    <div>
    {/* {!createGameType ? checkIfNoSelectedGame() */}
    
        <div>
          <h2>{gameType}</h2>
        
            <form onClick={(e) => creategameSubmit(e)}>
              <label>{username}</label>
              <label>Nazwa pokoju</label>
              <input type="text" name="room" placeholder="Podaj nazwe pokoju" required autoComplete="off"></input>
              <label>Hasło</label>
              <input type="password" name="room" placeholder="Podaj hasło" required autoComplete="off"></input>
              <label>Typ gry:</label>
              <input type="text" name="room" value={gameType} required disabled></input>
              <button>Stwórz</button>
            </form>
      
        </div>
      </div>

   
    // </div>
  );
}

export default CreateGame;
