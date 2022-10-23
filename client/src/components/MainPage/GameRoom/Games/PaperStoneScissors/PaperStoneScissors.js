import React from 'react'

function PaperStoneScissors(props) {
  return (
    <div>
    {/* <h1>{props.gameType}</h1> */}

            <button className="tictactoe-item" onClick={() => props.paperStoneScissors(1)}>Kamień</button>
            <button className="tictactoe-item" onClick={() => props.paperStoneScissors(2)} >Papier</button>
            <button className="tictactoe-item" onClick={() => props.paperStoneScissors(3)} >Nożyce</button> 
          
          

    </div>
  )
}

export default PaperStoneScissors