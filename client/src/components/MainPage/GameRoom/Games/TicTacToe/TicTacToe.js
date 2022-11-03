import React, { useState, useEffect } from 'react'
import "./TicTacToe.scss"



function TicTacToe(props) {




  return (
    <>


   
      {props.isGameBoardHidden ? <div>{props.resultGame.message} <button onClick={() => props.playAgain()}>Zagraj poownie</button> </div> :

      <div className="tictactoe-items">
            <button className="tictactoe-item" onClick={(e) => props.ticTacToe(0,e)} disabled={props.disabledOption[0].disable||props.otherPlayerTurn}>{props.disabledOption[0].signType}</button> 
            <button className="tictactoe-item" onClick={(e) => props.ticTacToe(1,e)} disabled={props.disabledOption[1].disable||props.otherPlayerTurn}>{props.disabledOption[1].signType}</button>
            <button className="tictactoe-item" onClick={(e) => props.ticTacToe(2,e)} disabled={props.disabledOption[2].disable||props.otherPlayerTurn}>{props.disabledOption[2].signType}</button>
            <button className="tictactoe-item" onClick={(e) => props.ticTacToe(3,e)} disabled={props.disabledOption[3].disable||props.otherPlayerTurn}>{props.disabledOption[3].signType}</button> 
            <button className="tictactoe-item" onClick={(e) => props.ticTacToe(4,e)} disabled={props.disabledOption[4].disable||props.otherPlayerTurn}>{props.disabledOption[4].signType}</button>
            <button className="tictactoe-item" onClick={(e) => props.ticTacToe(5,e)} disabled={props.disabledOption[5].disable||props.otherPlayerTurn}>{props.disabledOption[5].signType}</button>
            <button className="tictactoe-item" onClick={(e) => props.ticTacToe(6,e)} disabled={props.disabledOption[6].disable||props.otherPlayerTurn}>{props.disabledOption[6].signType}</button> 
            <button className="tictactoe-item" onClick={(e) => props.ticTacToe(7,e)} disabled={props.disabledOption[7].disable||props.otherPlayerTurn}>{props.disabledOption[7].signType}</button>
            <button className="tictactoe-item" onClick={(e) => props.ticTacToe(8,e)} disabled={props.disabledOption[8].disable||props.otherPlayerTurn}>{props.disabledOption[8].signType}</button>
         
        </div>

      }
    </>
  )
}

export default TicTacToe