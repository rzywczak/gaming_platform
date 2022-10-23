import React,{ useEffect, useState} from "react";
import "./GameRoom.scss";
import GameMenu from "./GameMenu/GameMenu";
import io from "socket.io-client";
import { useNavigate, useLocation} from 'react-router-dom'
import axiosAuth from './../../../services/axiosAuth'
import FindAPair from './Games/FindAPair/FindAPair';
import Maze from './Games/Maze/Maze';
import PaperStoneScissors from './Games/PaperStoneScissors/PaperStoneScissors';
import Puns from './Games/Puns/Puns';
import TicTacToe from './Games/TicTacToe/TicTacToe';


const socket = io()

function GameRoom() {

  // config 
  const navigate = useNavigate()
  const { state } = useLocation()
  const { userName, roomName, gameType } = state || 'wrong data'
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false)
  const [users, setUsers] = useState([])
  const [disabled, setDisabled] = useState(false)
  const [howManyConnectedUsers, setHowManyConnectedUsers] = useState(0)
  const [gameName, setGameName] = useState(gameType[1])

// game 
  

 const [data] = useState({username: userName, roomName: roomName})

const addUser = (user) => {
  setUsers([...user])
  setDisabled(false);
}

  useEffect(() => {

    const addUser = (user) => {
      setUsers([...user])
    }
    const removeUser = (userToDelete) => {
      setUsers(users.filter(user => user !== userToDelete))
    }
  
    if(users.lenght===0){
      setHowManyConnectedUsers(0)
    }
    if(users.length===1){
      setHowManyConnectedUsers(1)
    }
    if(users.length===2){
      setHowManyConnectedUsers(2)
    }

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

 

  },[navigate, gameType, loggedIn, users, data ])
    


  //   }
  //   catch(e){
  //     console.log(e)
  //   } 

  

  const joinGame = async (e) => {
    e.preventDefault();
    if(!disabled){
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
      socket.on('join-info', (user,roomname) => {
         addUser(user)
         
      })
   
    }
    }
    catch(e){
      console.log(e)
      setDisabled(false);
    } 
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
 
  const whatGame = async (game) => {
    if(gameName === game){
      console.log(game)
    return true
    }
    else{
      return false
    }
  }
  

  const PaperStoneScissors = async (userChoice) => {
    console.log(userChoice)
    // oczekiwanie na innego gracz buttony disable or deleted
    // gdy gracz 2 wybierze w przeciągu ? 10 sekund ? to wysyla dane do servera i sprawdza kto wygrał
    // ten kto wygrał to dostaje informacje o zwycięstwie 


  }


  return (
    <div>
    {isLoading &&
    <div className="game-container">
    <GameMenu disconnectUser={disconnectUser} goToOtherRoom={goToOtherRoom}></GameMenu>
    <div className="position-game-area">
    <div className="game-container__room-info">
      <div className="game-container__room-info--users">
      {howManyConnectedUsers >= 1 && <label><h1>Typ gry:</h1><h2>{gameName}</h2><h1>Pokój:</h1><h2>{roomName}</h2><h1>Gracze:</h1><h2>{users.map(user => <div key={user}>{user}</div>)}</h2></label>}
      </div>
    </div>
      <div className="game-container__board">
          {howManyConnectedUsers === 0 && <button className="game-container__board--join-button" onClick={(e) => joinGame(e)} disabled={disabled}>Join Game</button>}
          {howManyConnectedUsers === 1 && <div className="game-container__board--waiting"><div className="game-container__board--waiting-info">Waiting for opponent...</div></div>}
          {howManyConnectedUsers === 2 && 
          
          <div className="game-container__board--started-game">

          
           {gameName === 'findAPair' && <FindAPair gameType={gameType[1]}></FindAPair> }
           {gameName === 'maze' && <Maze gameType={gameType[1]}>{console.log(whatGame('maze'))}</Maze> }
           {gameName ==='paperStoneScissors'&& <PaperStoneScissors gameOptions={PaperStoneScissors} gameType={gameType[1]}></PaperStoneScissors> }
           {gameName ==='puns' && <Puns gameType={gameType[1]}></Puns> }
           {gameName ==='ticTacToe' && <TicTacToe gameType={gameType[1]}></TicTacToe> }


         </div>
          
          }

          
      </div>
      </div>
      </div>
    }
    </div>
  );
}

export default GameRoom;
