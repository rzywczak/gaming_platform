import React, { useState, useEffect } from "react";
import axiosAuth from "../../../services/axiosAuth"
import axios from 'axios'
import { useLocation, Link, useNavigate } from "react-router-dom";
import "./CreateGame.scss";


function CreateGame(props) {

const [isOpenCreateRoomForm, setIsOpenCreateRoomForm] = useState(false);
const [gameType, setGameType] = useState(props.gameType)
const [values, setValues] = useState({ roomName: "", password: "", gameType: gameType[1] });


const username = props.username;
const navigate = useNavigate();

useEffect(() => {

  const authResult = axiosAuth();
  if (authResult.Authorization === null) {
    navigate("/");
  }

}
, [navigate]);

  const createGame = async (e) => {
    e.preventDefault();
    // console.log('created Game'+gameType)

    const authResult = axiosAuth();


      if (authResult.Authorization !== null) {
        console.log(values)
        try {
            await axios.post(`http://localhost:5000/api/rooms`, 
            {
              ...values
            },
           { withCredentials: true }
           )
          
          // console.log(data);
          }catch (e) {
          console.log(e);
        }
      }

  }


  return (
    <div>
    {/* {!createGameType ? checkIfNoSelectedGame() */}
    
        <div>
          <h2>{gameType[2]}</h2>
        
            <form onSubmit={(e) => createGame(e)}>
              <label>{username}</label>
              <label>Nazwa pokoju</label>
              <input type="text" name="roomName" placeholder="Podaj nazwe pokoju" required autoComplete="off"
                onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
              ></input>
              <label>Hasło</label>
              <input type="password" name="password" placeholder="Podaj hasło" required autoComplete="off"
                onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}

                ></input>
              <label>Typ gry:</label>
              <input type="text" name="gameType" placeholder={gameType[2]} required disabled
              ></input>
              <button>Stwórz</button>
            </form>
      
        </div>
      </div>

   
    // </div>
  );
}

export default CreateGame;
