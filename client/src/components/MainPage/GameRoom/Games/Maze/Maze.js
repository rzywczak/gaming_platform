import React from 'react'
import Board from "./Board"
import "./Maze.scss"


function Maze(props) {
  return (
    <>
    
     { !props.endRound ? 
     <Board props={props}></Board> 
     :
     <div>{props.winMessage}</div>
     }
    
    </>
  )
}

export default Maze


