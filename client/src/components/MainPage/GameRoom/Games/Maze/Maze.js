import React from 'react'
import Board from "./Board"
import "./Maze.scss"




function Maze(props) {
  return (
    <>
    
     { !props.endRound ? 
     <Board props={props}></Board> 
     :
  
     <div className="try-again"><h1>{props.winMessage} </h1>
      <h3>Za chwilę będzie możliwość ponownego rozegrania...</h3>
     {/* <button className="try-again__button"
       onClick={() => props.playAgain()}
       >
       Zagraj ponownie</button> */}
        </div> 
     
     }
    
    </>
  )
}

export default Maze


