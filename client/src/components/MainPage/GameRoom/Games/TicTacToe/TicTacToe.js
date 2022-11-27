import React, { useState, useEffect } from 'react'
import "./TicTacToe.scss"



function TicTacToe(props) {

useEffect(() => {



},[])


  return (
    <>


   
      {props.isGameBoardHidden ? <div className="try-again"><h1>{props.resultGame.message}</h1> <button className="try-again__button" onClick={() => props.playAgain()}>Zagraj ponownie</button> </div> :
    
      <div className="tictactoe-items">
      {console.log(props.disabledOption[0].signType)}
            <button className="tictactoe-item" onClick={(e) => props.ticTacToe(0,e)} disabled={props.disabledOption[0].disable||props.otherPlayerTurn}><span>{props.disabledOption[0].signType}</span></button> 
            <button className="tictactoe-item" onClick={(e) => props.ticTacToe(1,e)} disabled={props.disabledOption[1].disable||props.otherPlayerTurn}><span>{props.disabledOption[1].signType}</span></button>
            <button className="tictactoe-item" onClick={(e) => props.ticTacToe(2,e)} disabled={props.disabledOption[2].disable||props.otherPlayerTurn}><span>{props.disabledOption[2].signType}</span></button>
            <button className="tictactoe-item" onClick={(e) => props.ticTacToe(3,e)} disabled={props.disabledOption[3].disable||props.otherPlayerTurn}><span>{props.disabledOption[3].signType}</span></button> 
            <button className="tictactoe-item" onClick={(e) => props.ticTacToe(4,e)} disabled={props.disabledOption[4].disable||props.otherPlayerTurn}><span>{props.disabledOption[4].signType}</span></button>
            <button className="tictactoe-item" onClick={(e) => props.ticTacToe(5,e)} disabled={props.disabledOption[5].disable||props.otherPlayerTurn}><span>{props.disabledOption[5].signType}</span></button>
            <button className="tictactoe-item" onClick={(e) => props.ticTacToe(6,e)} disabled={props.disabledOption[6].disable||props.otherPlayerTurn}><span>{props.disabledOption[6].signType}</span></button> 
            <button className="tictactoe-item" onClick={(e) => props.ticTacToe(7,e)} disabled={props.disabledOption[7].disable||props.otherPlayerTurn}><span>{props.disabledOption[7].signType}</span></button>
            <button className="tictactoe-item" onClick={(e) => props.ticTacToe(8,e)} disabled={props.disabledOption[8].disable||props.otherPlayerTurn}><span>{props.disabledOption[8].signType}</span></button>
         
      
</div>
      }
    </>
  )
}

export default TicTacToe