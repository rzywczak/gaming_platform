import React,{ useState, useEffect} from 'react'
import Board from "./Board"
import { FunctionalIFrameComponent } from './functional'
import "./Puns.scss"

function Puns(props) {


  const [values, setValues] = useState({ userName: props.userName, userAnswer: "", chosenWord: "" });
  const [disabled, setDisabled] = useState(false)
  const [ message , setMessage] = useState([])

  useEffect(() =>{

    setMessage(props.usersTypes)
    console.log(message)
   if(props.drawUser===props.userName){
    setDisabled(true)
   }
   if(props.drawUser!==props.userName){
    setDisabled(false)
   }

  },[props])


  return (
    <>

  {  props.finishedTurn ?
    <>
    { props.otherPlayerTurn === false ?
    <div  className="puns-chosen-word" > 
    <form className="puns-chosen-word__form" onSubmit={(e) => props.puns(e,values)}>
    Wpisz słowo
      <input className="puns-chosen-word__form--input" type="text" name="chosenWord" onChange={e => setValues( {...values, chosenWord: e.target.value })} required    autoComplete="off"></input>
      <button className="puns-chosen-word__form--button">Wpisz</button>
      </form>
      </div>
    :
    <div className="puns-chosen-word">
    <form className="puns-chosen-word__form">
    Gracz rysujący wybiera słowo...
    </form>
    </div>
    
    }
    </>
   :
   <>
 <FunctionalIFrameComponent className="puns__iframe" title="functional-iframe" scrolling="no">
 <Board socket={props.socket} userName={props.userName} chosenWord={props.chosenWord} drawUser={props.drawUser}></Board>
  </FunctionalIFrameComponent>
    
    <div className="puns-data">
      <div className="puns-data__info">
        <div className="puns-data__info-draw">
         {props.otherPlayerTurn === false ? <div>Odpowiedź: {props.chosenWord} </div> 
         :
         <div>  Teraz rysuje: {props.drawUser} </div> 
         }
         
        </div>
        <div className="puns-data__info-players-type">
     
            <div>
         
            { (props.usersTypes[1]!==null&& props.usersTypes[1] !== undefined) &&
          <h6>{message.map( item => <div key={item.id}><b>{item.userName}</b><span>{item.userAnswer}</span></div>)}</h6>
            }
          </div>
          
        </div>  
      </div>
      { !disabled &&
      <form className="puns-data__form" onSubmit={(e) => props.puns(e,{ userName: props.userName, userAnswer: e.target[0].value, chosenWord: ""})}>
      <input className="puns-data__form--input" type="text" name="userAnswer"  disabled={disabled} required autoComplete="off"></input>
      <button className="puns-data__form--button" disabled={disabled} >Sprawdź</button>
      </form>
      }
    </div>
    </>
  }

  </>

  
  )
}

export default Puns