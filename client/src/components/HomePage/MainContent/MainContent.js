import React from 'react'
import backgroundimage from "../../../img/two.png";
import "./MainContent.scss"
import { Link } from "react-router-dom"

function MainContent() {
  return (
    <div className="main-content">

    <div>
    <div className="main-content__background">   
    <div className="main-content__title">Platforma Rozrywkowa</div>
    <Link className="start-play" to={{ pathname: "/game-page" }}>Zacznij grać</Link>
    </div>
    </div>

    </div>
  )
}

export default MainContent