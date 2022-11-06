import React from 'react'
import "./PaperStoneScissors.scss"

function PaperStoneScissors(props) {
  return (
    < >
    {/* <h1>{props.gameType}</h1> */}
    {/* {console.log(props.resultGame)} */}


    
      <div>
               {/* <h1> {props.resultGame[0]}</h1> */}
      
          {/* {props.resultGame.map((result) => <h1 key={result}>{result}</h1>)} */}
      </div>


      {props.isUserButtonHidden ? 
          <div className="paperstonescissors-info" >
          <h1> {props.resultGame.message}</h1>
          <button className="paperstonescissors-info__button" onClick={() => props.playAgain()}>Zagraj ponownie</button></div>
      :

        <div className="paperstonescissors">
            <button className="paperstonescissors__item" onClick={() => props.paperStoneScissors('bato')} disabled={props.disabled}>Kamień</button>
            <button className="paperstonescissors__item" onClick={() => props.paperStoneScissors('papel')} disabled={props.disabled} >Papier</button>
            <button className="paperstonescissors__item" onClick={() => props.paperStoneScissors('gunting')} disabled={props.disabled}>Nożyce</button> 
        </div>
      }
          

    </>
  )
}

export default PaperStoneScissors