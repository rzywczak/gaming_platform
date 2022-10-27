import React from 'react'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import MainPage from '../components/MainPage/MainPage'
import JoinGame from '../components/MainPage/JoinGame/JoinGame'
import GameRoom from '../components/MainPage/GameRoom/GameRoom'
import Register from '../components/Register/Register'
import Login from '../components/Login/Login'
// import CreateGame from '../components/MainPage/CreateGame/CreateGame'

function Nav() {

  return (

    <BrowserRouter>
    <Routes>
      
      <Route path="/" element={<MainPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/join-game" element={<JoinGame/>}></Route>
      {/* <Route path="/create-game" element={<CreateGame/>}></Route> */}
      <Route path="/game-room" element={<GameRoom/>}></Route>
    </Routes>
  </BrowserRouter>

  )
}

export default Nav