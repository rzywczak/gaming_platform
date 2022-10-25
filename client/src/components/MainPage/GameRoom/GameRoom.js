import React,{ useEffect, useState} from "react";
import { toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
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

const whatGame = () => {
if(gameType === 'ticTacToe'){
    return { 1: 'ticTacToe', 2: 'Kółko i krzyżyk'}
}
if(gameType === 'paperStoneScissors'){
  return  { 1: 'paperStoneScissors', 2: 'Papier, kamień i nożyce'}
}
if(gameType === 'maze'){
  return  { 1:'maze', 2:'Rozwiąż labirynt'}
}
if(gameType === 'puns'){
  return {1: 'puns',2: 'Kalambury'}
}
if(gameType === 'ticTacToe'){
  return { 1: 'findAPair',2: 'Znajdź parę'}
}}


// paperStoneScissors

const [ isUserButtonHidden ,setIsUserButtonHidden ] = useState(false)
const [isUserButtonDisabled, setIsUserButtonDisabled] = useState(false)
const [resultGameOne, setResultGameOne] = useState([])
const [finishedGame, setFinishedGame] = useState(false)

// ticTacToe



//
const [gameName] = useState(whatGame())

 const [data] = useState({username: userName, roomname: roomName})

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
      setUsers([])
      addUser(info)
    })
  }
    if(!loggedIn){
    try{
      const authResult = axiosAuth();
      if (authResult.Authorization === null) { 
           navigate("/login");}    
      if(gameType === undefined){

        navigate("/game-page");
      }
    setLoggedIn(true)
    setIsLoading(true)
    }
    catch(error){
      console.log(error);
    }
  }

 

  },[navigate, gameType, loggedIn, users, data ])
    


  

  const joinGame = async (e) => {
    if(e){
    e.preventDefault();
    }
    if(!disabled){
      setDisabled(true);
    try{
      const authResult = axiosAuth();
        if (authResult.Authorization === null) {
          navigate("/login");
        }
        else{
      //  socket.on('checkIfUserConnected', (data) =>{}) // kiedys zrobic moze gdy user jest połączony i znowu się chce łączyć
       socket.emit('disconnectUser', data)
       socket.emit('join-game', data, (error) => {
        if(error){
          
          // console.log(error)
          toast.info(error)
          // e.target.value=(error)
          setDisabled(false);
        }
 
      })
      socket.on('join-info', (user) => {
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
    navigate("/game-page");

  }
  
  const goToOtherRoom = async () => {
    socket.emit('disconnectUser', data)
    // console.log(games.gameType)
    navigate("/join-game", { state: {gameType: gameName}})

  }
 
// paperStone Scissors
  const paperStoneScissors = async (userChoice) => {
    setIsUserButtonDisabled(true)
    socket.emit('paperStoneScissors', ({userChoice, userName, roomName}))
    socket.on('result', result => {
      setFinishedGame(!finishedGame)
      setIsUserButtonHidden(true)
      setIsUserButtonDisabled(false)
      socket.emit('disconnectUser', data)
      setResultGameOne(result)
    })
 
    // gdy gracz 2 wybierze w przeciągu ? 10 sekund ? to wysyla dane do servera i sprawdza kto wygrał
  }

const playAgain = async ()  => {

   setIsUserButtonHidden(!isUserButtonHidden)

  // await joinGame()
   setFinishedGame(!finishedGame)

}




  /// ticTacToe

const ticTacToe = async (userChoice) => {
  console.log(userChoice)
}


  return (
    <div>
    {isLoading &&
    <div className="game-container">
    <GameMenu disconnectUser={disconnectUser} goToOtherRoom={goToOtherRoom}></GameMenu>
    <ToastContainer  position="bottom-right" theme="colored"/>
    <div className="position-game-area">
    <div className="game-container__room-info">
      <div className="game-container__room-info--users">
      {howManyConnectedUsers >= 1 && <label><h1>Typ Gry:</h1><h2>{gameName[2]}</h2><h1>Pokój:</h1><h2>{roomName}</h2><h1>Gracze:</h1><h2>{users.map(user => <div key={user}>{user}</div>)}</h2></label>}
      </div>
    </div>
  
      <div className="game-container__board">
          {howManyConnectedUsers === 0 && <button className="game-container__board--join-button" onClick={(e) => joinGame(e)} disabled={disabled}>Join Game</button>}
          {(howManyConnectedUsers === 1 && !finishedGame) && <div className="game-container__board--waiting"><div className="game-container__board--waiting-info">Waiting for opponent...</div></div>}
          {(howManyConnectedUsers === 2 || finishedGame) && 
          
          <div className="game-container__board--started-game">
          
           {gameName[1] === 'findAPair' && <FindAPair gameType={gameName[1]}></FindAPair> }
           {gameName[1] === 'maze' && <Maze gameType={gameName[1]}></Maze> }
           {gameName[1] ==='paperStoneScissors'&& <PaperStoneScissors paperStoneScissors={paperStoneScissors} gameType={gameName[1]} disabled={isUserButtonDisabled} resultGame={resultGameOne} isUserButtonHidden={isUserButtonHidden} playAgain={playAgain}></PaperStoneScissors> }
           {gameName[1] ==='puns' && <Puns gameType={gameName[1]}></Puns> }
           {gameName[1] ==='ticTacToe' && <TicTacToe gameType={gameName[1]}></TicTacToe> }


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
