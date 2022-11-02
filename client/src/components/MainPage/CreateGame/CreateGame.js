import React, { useState, useEffect } from "react";
import { toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axiosAuth from "../../../services/axiosAuth"
import axios from 'axios'
import { useLocation, Link, useNavigate } from "react-router-dom";
import "./CreateGame.scss";


function CreateGame(props) {

const [isOpenCreateRoomForm, setIsOpenCreateRoomForm] = useState(false);
const [gameType, setGameType] = useState(props.gameType)
const [values, setValues] = useState({ roomName: "", password: "", gameType: gameType[1] });


const username = props.username;
const navigate = useNavigate();

useEffect(() => {

  const authResult = axiosAuth();
  if (authResult.Authorization === null) {
    navigate("/");
  }
  if (gameType === undefined) {
    // console.log('gra jest undefinded')
    navigate("/");
    return;
  }

}
, [navigate]);

  const createGame = async (e) => {
    e.preventDefault();
    // console.log('created Game'+gameType)

    const authResult = axiosAuth();

      if (authResult.Authorization !== null) {
        try {
            await axios.post(`http://localhost:5000/api/rooms`, 
            {
              ...values
            },
           { withCredentials: true }
           )
           e.target[0].value='';
           e.target[1].value='';
  
          toast.success('Pomyślnie stworzono pokój!')
          console.log(values)

          // console.log(data);
          }catch (e) {
          console.log(e);
          if(e.response.status===400){
            toast.error('Ta nazwa pokoju jest już w użyciu!')
            }
            else{
            toast.error(e.message)
            }
        }
      }

  }


  return (
    <div className="join-content__create-game">
    {/* {!createGameType ? checkIfNoSelectedGame() */}
    

          {/* <h2>{gameType[2]}</h2> */}
                       <h2> <div className="join-content__back">
            <Link className="join-content__back--button" to={{ pathname: "/" }}>
              Powrót
            </Link>
          </div>{gameType[2]}</h2>
            <div className="join-content__options">
            <button className={`join-content__options--button ${props.isDisabledCreateRoomButton}`} onClick={(e) => props.optionSwitch(e)} disabled={props.isDisabledCreateRoomButton}>Stwórz pokój</button>
            <button className={`join-content__options--button ${!props.isDisabledCreateRoomButton}`} onClick={(e) => props.optionSwitch(e)} disabled={!props.isDisabledCreateRoomButton}>Dołącz do pokoju</button>
            </div>

            <form className="join-content__create-game--form" onSubmit={(e) => createGame(e)}>
      
 

              <label>Nazwa pokoju</label>
              <input className="join-content__create-game--input"  type="text" name="roomName" placeholder="Podaj nazwe pokoju" required autoComplete="off"
                onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
              ></input> 
              <label>Hasło</label>
              <input className="join-content__create-game--input"  type="password" name="password" placeholder="Podaj hasło" required autoComplete="off"
                onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}

                ></input>
              <label>Typ gry:</label>
              <input  className="join-content__create-game--input"  type="text" name="gameType" placeholder={gameType[2]} required disabled
              ></input>
              <input type="submit" value="Stwórz" className="join-content__create-game--submit" ></input>
            </form>
            <ToastContainer  position="bottom-right" theme="colored"/>
       
        
      </div>

   
    // </div>
  );
}

export default CreateGame;
