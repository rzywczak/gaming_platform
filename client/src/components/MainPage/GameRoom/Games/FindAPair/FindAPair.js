import React, { useState, useEffect} from 'react'
import "./FindAPair.scss"





function FindAPair(props) {

  // useEffect(() =>  {


  // },[props.cardArray])





  return (
    <>

      {props.isGameBoardHidden ? <div>{props.resultGame.message} <button onClick={() => props.playAgain()}>Zagraj poownie</button> </div> :

        <div className="findapair-items">
            <button className="findapair-item" onClick={(e) => props.findAPair(e,{name: props.cardArray[0].name, id: props.cardArray[0].id})} disabled={!props.cardArray[0].disable||props.otherPlayerTurn} >{props.cardArray[0].hidden && <img className="findapair-item__img" src={props.cardArray[0].img}  alt="X"></img>}</button>     
            <button className="findapair-item" onClick={(e) => props.findAPair(e,{name: props.cardArray[1].name, id: props.cardArray[1].id})} disabled={!props.cardArray[1].disable||props.otherPlayerTurn} >{props.cardArray[1].hidden && <img className="findapair-item__img" src={props.cardArray[1].img}  alt="X"></img>}</button>
            <button className="findapair-item" onClick={(e) => props.findAPair(e,{name: props.cardArray[2].name, id: props.cardArray[2].id})} disabled={!props.cardArray[2].disable||props.otherPlayerTurn} >{props.cardArray[2].hidden && <img className="findapair-item__img" src={props.cardArray[2].img}  alt="X"></img>}</button>
            <button className="findapair-item" onClick={(e) => props.findAPair(e,{name: props.cardArray[3].name, id: props.cardArray[3].id})} disabled={!props.cardArray[3].disable||props.otherPlayerTurn} >{props.cardArray[3].hidden && <img className="findapair-item__img" src={props.cardArray[3].img}  alt="X"></img>}</button>     
            <button className="findapair-item" onClick={(e) => props.findAPair(e,{name: props.cardArray[4].name, id: props.cardArray[4].id})} disabled={!props.cardArray[4].disable||props.otherPlayerTurn} >{props.cardArray[4].hidden && <img className="findapair-item__img" src={props.cardArray[4].img}  alt="X"></img>}</button>
            <button className="findapair-item" onClick={(e) => props.findAPair(e,{name: props.cardArray[5].name, id: props.cardArray[5].id})} disabled={!props.cardArray[5].disable||props.otherPlayerTurn} >{props.cardArray[5].hidden && <img className="findapair-item__img" src={props.cardArray[5].img}  alt="X"></img>}</button>     
            <button className="findapair-item" onClick={(e) => props.findAPair(e,{name: props.cardArray[6].name, id: props.cardArray[6].id})} disabled={!props.cardArray[6].disable||props.otherPlayerTurn} >{props.cardArray[6].hidden && <img className="findapair-item__img" src={props.cardArray[6].img}  alt="X"></img>}</button>     
            <button className="findapair-item" onClick={(e) => props.findAPair(e,{name: props.cardArray[7].name, id: props.cardArray[7].id})} disabled={!props.cardArray[7].disable||props.otherPlayerTurn} >{props.cardArray[7].hidden && <img className="findapair-item__img" src={props.cardArray[7].img}  alt="X"></img>}</button>
            <button className="findapair-item" onClick={(e) => props.findAPair(e,{name: props.cardArray[8].name, id: props.cardArray[8].id})} disabled={!props.cardArray[8].disable||props.otherPlayerTurn} >{props.cardArray[8].hidden && <img className="findapair-item__img" src={props.cardArray[8].img}  alt="X"></img>}</button>     
            <button className="findapair-item" onClick={(e) => props.findAPair(e,{name: props.cardArray[9].name, id: props.cardArray[9].id})} disabled={!props.cardArray[9].disable||props.otherPlayerTurn} >{props.cardArray[9].hidden && <img className="findapair-item__img" src={props.cardArray[9].img}  alt="X"></img>}</button>     
            <button className="findapair-item" onClick={(e) => props.findAPair(e,{name: props.cardArray[10].name, id: props.cardArray[10].id})} disabled={!props.cardArray[10].disable||props.otherPlayerTurn} >{props.cardArray[10].hidden &&<img className="findapair-item__img" src={props.cardArray[10].img}  alt="X"></img>}</button>
            <button className="findapair-item" onClick={(e) => props.findAPair(e,{name: props.cardArray[11].name, id: props.cardArray[11].id})} disabled={!props.cardArray[11].disable||props.otherPlayerTurn} >{props.cardArray[11].hidden &&<img className="findapair-item__img" src={props.cardArray[11].img}  alt="X"></img>}</button>     
            

        </div>
        }



    </>
  )
}

export default FindAPair