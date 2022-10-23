import React from 'react'

function PaperStoneScissors(props) {
  return (
    <div><h1>{props.gameType}</h1>

            <button className="tictactoe-item" onClick={() => props.gameOptions(1)}>Kamień</button>
            <button className="tictactoe-item" onClick={() => props.gameOptions(2)} >Papier</button>
            <button className="tictactoe-item" onClick={() => props.gameOptions(3)} >Nożyce</button>
          
          

    </div>
  )
}

export default PaperStoneScissors