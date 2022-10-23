import React,{ useEffect, useState} from "react";
import "./GameRoom.scss";
import GameMenu from "./GameMenu/GameMenu";
import io from "socket.io-client";
import { useNavigate, useLocation} from 'react-router-dom'
import axiosAuth from './../../../services/axiosAuth'

const socket = io()

function GameRoom() {

  
  
  const navigate = useNavigate()
  const { state } = useLocation()
  const { userName, roomName, gameType } = state || 'wrong data'
  const [loadSocket, setLoadSocket ] = useState(true)
  const [isLoading, setIsLoading] = useState(false);

  const [users, setUsers] = useState([])
  const [disabled, setDisabled] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [updateUsers, setUpdateUsers] = useState(false)
  // const [room, setRoom] = useState(roomName)
  // const [socket, setSocket] = useState(io())


  // if(isLoading) {
  //   if(loadSocket){
  //   setSocket()
  //   setLoadSocket(false)
  //   }
  // }
 


  useEffect(() => {

    socket.on('message', (message) => {
      if(message){
        removeUser(message)
      }
    })

    if(users.length===0){
    socket.emit('disconnectUser', data)
    socket.on('disconnect-info', (info) => {
      console.log(info)
      setUsers([])
      addUser(info)
      // console.log(users.length)
    })
  }
    if(!loggedIn){
    try{
      const authResult = axiosAuth();
      if (authResult.Authorization === null) { 
           navigate("/login");}    
      if(gameType === undefined){
        navigate("/");
      }
    setLoggedIn(true)
    setIsLoading(true)
    }
    catch(error){
      console.log(error);
    }
  }

 

  },[navigate, gameType, loggedIn, users.length])
    


  //   }
  //   catch(e){
  //     console.log(e)
  //   } 

  
  const data = {
    username: userName,
    roomname: roomName
}

  const joinGame = async (e) => {
    e.preventDefault();
    setDisabled(true);

    try{
      const authResult = axiosAuth();
        if (authResult.Authorization === null) {
          navigate("/login");
        }
        else{

       socket.emit('disconnectUser', data)

       socket.emit('join-game', data, (error) => {
        if(error){
          console.log(error)
        }
 
      })
      socket.on('join-info', (info) => {
        console.log(info)
        addUser(info)
        // console.log(users.length)
      })



      setDisabled(false);
    }
    }
    catch(e){
      console.log(e)
      setDisabled(false);
    } 

  }

  const disconnectUser = async () => {
    socket.emit('disconnectUser', data)
    navigate("/");

  }
  
  const goToOtherRoom = async () => {
    socket.emit('disconnectUser', data)
    navigate("/join-game", { state: {gameType : gameType}})

  }
 
  
  const addUser = (user) => {
    setUsers([...user])
  }
  const removeUser = (userToDelete) => {
    
    setUsers(users.filter(user => user !== userToDelete))
  }

  return (
    <div>
    {isLoading &&
    <div className="game-container">
    <GameMenu disconnectUser={disconnectUser} goToOtherRoom={goToOtherRoom}></GameMenu>
      <div className="game-container__board">
        <div className="game-container__bord--join"> 
          {users.length >= 1 ? <label>Obecnie gra tu <h3>{users.map(user => `${user} `)}</h3></label> : <button onClick={joinGame} disabled={disabled}>Join Game</button>}
        </div>
      </div>
      </div>
    }
    </div>
  );
}

export default GameRoom;
