import React, { useEffect, useState } from "react";
import "./JoinGame.scss";
import { useLocation, useNavigate, useParamsm, Link} from "react-router-dom";
import CreateGame from "../CreateGame/CreateGame";
import axiosAuth from "../../../services/axiosAuth"
import axios from 'axios'
import io from "socket.io-client";

// const socket = io();

function JoinGame() {


  
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    // console.log(user, room)

    try{
      const authResult = axiosAuth();
        if (authResult.Authorization !== null) {
          
        }
        else{
          navigate("/login");
      }
    }
    catch(e){
      // console.log(e)
    } 
  },[navigate])

  let { gameType } = location.state || {1: "noSelectedRoom", 2: "noSelectedRoom"};
  if(gameType===undefined){
    gameType = {1: "noSelectedRoom", 2: "noSelectedRoom"};
  }
  const [ selectedGame, setSelectedGame] = useState()
  const [values, setValues] = useState({ roomName: "", password: "" });

  const username =  localStorage.getItem("username") || 'please login';
  




  
  const joingameSubmit = async (e) => {
    e.preventDefault();

  const username =  localStorage.getItem("username");
    const authResult = axiosAuth();

      if (authResult.Authorization !== null) {
        console.log(values)
        try {
            const {data} = await axios.post(`http://localhost:5000/api/rooms/join`, 
            {
              ...values,
            },
           { withCredentials: true }
           )
           navigate('/game-room', { state: { userName: username, roomName: data.room.roomName}})
           console.log('joined Game')
          // console.log(data);
          }catch (e) {
          console.log(e);
        }
      }

 
  }
  


  


  return (
    // <div className="join-game">
    <div className="centered-form">
      <div className="centered-form__box">
        <div className="rooms">
          <h2>{gameType[2]}</h2>
          <form onSubmit={(e) => joingameSubmit(e)}>
            <label> {username} </label>
            <input type="text" name="roomName" placeholder="Podaj nazwe pokoju" required autoComplete="off"
                onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
              ></input>
              <label>Hasło</label>
              <input type="password" name="password" placeholder="Podaj hasło" required autoComplete="off"
                onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}

                ></input>
            <button>Dołącz</button>
          </form>
        </div>
        <div className="create-room">
          <CreateGame gameType={gameType} username={username}  />
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

