import React, { useEffect, useState } from "react";
import "./JoinGame.scss";
import { toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate, useParamsm, Link } from "react-router-dom";
import CreateGame from "../CreateGame/CreateGame";
import axiosAuth from "../../../services/axiosAuth";
import axios from "axios";
import Header from "../HomePage/Header/Header"
// const socket = io();

function JoinGame(props) {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const { gameType } = location.state || "wronga data";
  const [fromMainPage, setFromMainPage ] = useState(props.fromMainPage);
  const [ createRoomButton, setCreateRoomButton ] = useState(true);
  const [ isDisabledCreateRoomButton, setIsDisabledCreateRoomButton ] = useState(true);
  // const [ isActiveButton, setIsActiveButton ] = useState(true);

  useEffect(() => {
    // console.log(user, room)
    
    if(fromMainPage){
      setIsLoading(true);

    }
    else{
    try {
      const authResult = axiosAuth();
      if (authResult.Authorization === null) {
        navigate("/login");
        return;
      }
      // console.log(gameType.gameType[1])
      if (gameType === undefined) {
        // console.log('gra jest undefinded')
        navigate("/");
        return;
      }
    } catch (error) {
      console.log(error);
    }

    // gameTypeSet()
    setIsLoading(true);
  }
  }, [navigate, gameType, fromMainPage]);

  // if(gameType===undefined){
  //   gameType = {1: "noSelectedRoom", 2: "noSelectedRoom"};
  // }

  const [values, setValues] = useState({ roomName: "", password: "" });
  const username = localStorage.getItem("username") || "please login";

  const joingameSubmit = async (e) => {
    e.preventDefault();

    const username = localStorage.getItem("username");
    const authResult = axiosAuth();

    if (authResult.Authorization !== null) {
      console.log(values);
      try {
        const { data } = await axios.post(
          `/api/rooms/join`,
          {
            ...values,
          },
          { withCredentials: true }
        ); 
        navigate("/game-room", {
          state: { userName: username, roomName: data.room.roomName, gameType: data.room.gameType },
        });
        //  console.log('joined Game')
        console.log(data);
      } catch (e) {
        if(e.response.status===400){
          toast.error('Nieprawidłowa nazwa pokoju lub hasło')
          }
          else{
          toast.error(e.message)
          }
      }
    }
  };

  const logout = async () => {
    try {
      await axios.get(`/api/users/logout`, { headers: axiosAuth() });
      localStorage.removeItem("token");
      localStorage.removeItem("username");
    } catch (e) {
      console.log(e);
    }
    navigate("/");

  };

  const optionSwitch = async (e) => {
    setIsDisabledCreateRoomButton(!isDisabledCreateRoomButton)
    setCreateRoomButton(!createRoomButton)
  }

  return (
    <>
      {isLoading && (
        <div>
          {fromMainPage===true ? (

           
              <div>
              <h1>Dołącz do pokoju</h1>
                <form onSubmit={(e) => joingameSubmit(e)}>
                  <label> Nazwa pokoju</label>
                  <input
                    type="text"
                    name="roomName"
                    placeholder="Podaj nazwe pokoju"
                    required
                    autoComplete="off"
                    onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                  ></input>
                  <label>Hasło</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Podaj hasło"
                    required
                    autoComplete="off"
                    onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                  ></input>
                  <button>Dołącz</button>
                </form>
              </div>
          
 
          ) : (
            <div className="join-content"> 
            <Header logged={true} logout={logout} userName={username}></Header>


        
            <div className="join-content">
           
        
            {!createRoomButton ?
              <div className="join-content__join">
           
           
                <form className="join-content__join--form" onSubmit={(e) => joingameSubmit(e)}>
                <h2> <div className="join-content__back">
            <Link className="join-content__back--button" to={{ pathname: "/" }}>
              Powrót
            </Link>
          </div>{gameType[2]}</h2>
            <div className="join-content__options">
            <button className={`join-content__options--button ${isDisabledCreateRoomButton}`} onClick={(e) => optionSwitch(e)} disabled={isDisabledCreateRoomButton}>Stwórz pokój</button>
            <button className={`join-content__options--button ${!isDisabledCreateRoomButton}`} onClick={(e) => optionSwitch(e)} disabled={!isDisabledCreateRoomButton}>Dołącz do pokoju</button>
          
            </div>
                <label> Nazwa pokoju</label>
                  <input
                   className="join-content__join--input" 
                    type="text"
                    name="roomName"
                    placeholder="Podaj nazwe pokoju"
                    required
                    autoComplete="off"
                    onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                  ></input>
                  <label>Hasło</label>
                  <input
                   className="join-content__join--input" 
                    type="password"
                    name="password"
                    placeholder="Podaj hasło"
                    required
                    autoComplete="off"
                    onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                  ></input>
                  <button  className="join-content__join--submit" >Dołącz</button>
                </form>
              
              </div>
              : (
                <CreateGame  gameType={gameType} username={username} isDisabledCreateRoomButton={isDisabledCreateRoomButton} optionSwitch={optionSwitch} />
              )
            }
            </div>
            <ToastContainer position="bottom-right" theme="colored"/>
            </div>
          )}
        </div>
      )}
    </>
  );
}
export default JoinGame;
