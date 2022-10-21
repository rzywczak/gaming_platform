import React,{ useEffect} from "react";
import "./GameRoom.scss";
import io from "socket.io-client";
import { useNavigate, useLocation} from 'react-router-dom'
import axiosAuth from './../../../services/axiosAuth'



function GameRoom() {


  const navigate = useNavigate()
  const { state } = useLocation()

  // const [user, setUser] = useState(userName)
  // const [room, setRoom] = useState(roomName)


  useEffect(() => {
    // console.log(user, room)

    try{
      const authResult = axiosAuth();
        if (authResult.Authorization !== null) {
          
        }
        else{
          navigate("/login");
      }
      const { userName, roomName } = state
      const socket = io();
      const data = {
        username: userName,
        roomname: roomName
      }

      socket.emit('join-game', data)
      console.log("test połączenia")
    }
    catch(e){
      console.log(e)
    } 



  },[navigate, state])
  



  return (
    <div>
      <div className="centered-form">
        <div className="centered-form__box">

          <label></label>
          <button></button>

        </div>
      </div>
    </div>
  );
}

export default GameRoom;
