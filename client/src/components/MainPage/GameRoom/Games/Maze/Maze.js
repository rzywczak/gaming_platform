import React from 'react'
import Board from "./Board"
import "./Maze.scss"


function Maze(props) {
  return (
    <>
    
     { !props.endRound ? 
     <Board props={props}></Board> 
     :
  
     <div className="try-again">{props.winMessage} <button className="try-again__button"
       onClick={() => props.playAgain()}
       >
       Zagraj poownie</button> </div> 
     
     }
    
    </>
  )
}

export default Maze


