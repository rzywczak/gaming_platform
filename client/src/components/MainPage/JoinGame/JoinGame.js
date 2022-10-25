import React, { useEffect, useState } from "react";
import "./JoinGame.scss";
import { toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate, useParamsm, Link } from "react-router-dom";
import CreateGame from "../CreateGame/CreateGame";
import axiosAuth from "../../../services/axiosAuth";
import axios from "axios";

// const socket = io();

function JoinGame(props) {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const { gameType } = location.state || "wronga data";
  const [fromMainPage, setFromMainPage ] = useState(props.fromMainPage);

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
        navigate("/game-page");
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

  return (
    <>
      {isLoading && (
        <div>
          {fromMainPage===true ? (

            <div className="">
              <div className="">
              <h1>Dołącz do pokoju</h1>
                <form onSubmit={(e) => joingameSubmit(e)}>
                  <label> {username} </label>
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
            </div>
 
          ) : (
            <div className="centered-form">
            <div className="centered-form__box">

              <div className="rooms">
                <h2>{gameType[2]}</h2>
                <form onSubmit={(e) => joingameSubmit(e)}>
                  <label> {username} </label>
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
              <div className="create-room">
                <CreateGame gameType={gameType} username={username} />
              </div>
              <ToastContainer  position="bottom-right" theme="colored"/>
              <div>{/* <button onClick={logOutFunction}>logOut</button> */}</div>
            </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
export default JoinGame;
