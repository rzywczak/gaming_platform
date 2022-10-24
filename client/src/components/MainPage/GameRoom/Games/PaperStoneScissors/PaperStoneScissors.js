import React from 'react'

function PaperStoneScissors(props) {
  return (
    <div>
    {/* <h1>{props.gameType}</h1> */}
    {/* {console.log(props.resultGame)} */}


    
      <div>
               {/* <h1> {props.resultGame[0]}</h1> */}
       <h1> {props.resultGame.message}</h1>
          {/* {props.resultGame.map((result) => <h1 key={result}>{result}</h1>)} */}
      </div>
    

            <button className="tictactoe-item" onClick={() => props.paperStoneScissors('bato')} disabled={props.disabled}>Kamień</button>
            <button className="tictactoe-item" onClick={() => props.paperStoneScissors('papel')} disabled={props.disabled} >Papier</button>
            <button className="tictactoe-item" onClick={() => props.paperStoneScissors('gunting')} disabled={props.disabled}>Nożyce</button> 
          
          

    </div>
  )
}

export default PaperStoneScissors