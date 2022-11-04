import React from 'react'
import Board from "./Board"
import { FunctionalIFrameComponent } from './functional'
import "./Puns.scss"

function Puns(props) {
  return (
    <>

 <FunctionalIFrameComponent className="iframe" title="functional-iframe" scrolling="no">
 <Board socket={props.socket} ></Board>
        </FunctionalIFrameComponent>
    

  </>

  
  )
}

export default Puns