import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./GameRoom.scss";
import GameMenu from "./GameMenu/GameMenu";
import io from "socket.io-client";
import { useNavigate, useLocation } from "react-router-dom";
import axiosAuth from "./../../../services/axiosAuth";
import FindAPair from "./Games/FindAPair/FindAPair";
import Maze from "./Games/Maze/Maze";
import PaperStoneScissors from "./Games/PaperStoneScissors/PaperStoneScissors";
import Puns from "./Games/Puns/Puns";
import TicTacToe from "./Games/TicTacToe/TicTacToe";

const socket = io();

function GameRoom() {
  // config
  const navigate = useNavigate();
  const { state } = useLocation();
  const { userName, roomName, gameType } = state || "wrong data";
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [howManyConnectedUsers, setHowManyConnectedUsers] = useState(0);

  const whatGame = () => {
    if (gameType === "ticTacToe") {
      return { 1: "ticTacToe", 2: "Kółko i krzyżyk" };
    }
    if (gameType === "paperStoneScissors") {
      return { 1: "paperStoneScissors", 2: "Papier, kamień i nożyce" };
    }
    if (gameType === "maze") {
      return { 1: "maze", 2: "Rozwiąż labirynt" };
    }
    if (gameType === "puns") {
      return { 1: "puns", 2: "Kalambury" };
    }
    if (gameType === "findAPair") {
      return { 1: "findAPair", 2: "Znajdź parę" };
    }
  };

  // paperStoneScissors

  const [disabled, setDisabled] = useState(false);
  const [isUserButtonHidden, setIsUserButtonHidden] = useState(false);
  const [isUserButtonDisabled, setIsUserButtonDisabled] = useState(false);
  const [resultGameOne, setResultGameOne] = useState([]);
  const [finishedGame, setFinishedGame] = useState(false);

  // ticTacToe

  const optionsTTT = [
    { id: 0, disable: false, signType: "" },
    { id: 1, disable: false, signType: "" },
    { id: 2, disable: false, signType: "" },
    { id: 3, disable: false, signType: "" },
    { id: 4, disable: false, signType: "" },
    { id: 5, disable: false, signType: "" },
    { id: 6, disable: false, signType: "" },
    { id: 7, disable: false, signType: "" },
    { id: 8, disable: false, signType: "" },
  ];

  const [disabledOption, setDisabledOption] = useState(optionsTTT);

  const [otherPlayerTurn, setOtherPlayerTurn] = useState(true);
  const [isGameBoardHidden, setIsGameBoardHidden] = useState(false);

  //

  const [gameName] = useState(whatGame());

  const [data] = useState({ username: userName, roomname: roomName });

  const addUser = (user) => {
    setUsers([...user]);
    setDisabled(false);
  };

  useEffect(() => {
    const addUser = (user) => {
      setUsers([...user]);
    };

    const removeUser = (userToDelete) => {
      setUsers(users.filter((user) => user !== userToDelete));
    };

    if (users.lenght === 0) {
      setHowManyConnectedUsers(0);
    }
    if (users.length === 1) {
      setHowManyConnectedUsers(1);

    // TicTacToe who's first settings for now here
   console.log(users)
     if(users[0]===userName){
    setOtherPlayerTurn(false)
    }
    //

    }
    if (users.length === 2) {
      setHowManyConnectedUsers(2);

    }

    socket.on("message", (message) => {
      if (message) {
        removeUser(message);
      }
    });

    socket.on("disconnect-info", (info) => {
      if (info) {
        setUsers([]);
        addUser(info);
        // console.log(info)
      }
    });

    if (users.length === 0) {
      socket.emit("disconnectUser", data);
      socket.on("disconnect-info", (info) => {
        setUsers([]);
        // console.log('połączeni użytkownicy to'+info)
        addUser(info);
      });
    }
    if (!loggedIn) {
      try {
        const authResult = axiosAuth();
        if (authResult.Authorization === null) {
          navigate("/");
        }
        if (gameType === undefined) {
          navigate("/");
        }
        setLoggedIn(true);
        setIsLoading(true);
      } catch (error) {
        console.log(error);
      }
    }
  }, [navigate, gameType, loggedIn, users, data]);

  const joinGame = async (e) => {
    if (e) {
      e.preventDefault();
    }
    if (!disabled) {
      setDisabled(true);
      try {
        const authResult = axiosAuth();
        if (authResult.Authorization === null) {
          navigate("/");
        } else {
          //  socket.on('checkIfUserConnected', (data) =>{}) // kiedys zrobic moze gdy user jest połączony i znowu się chce łączyć
          socket.emit("disconnectUser", data);
          socket.on("disconnect-info", (info) => {
            setUsers([]);
            addUser(info);
            // console.log('połączeni użytkownicy to'+info)
          });

          socket.emit("join-game", data, (error) => {
            if (error) {
              // console.log(error)
              toast.info(error);
              // e.target.value=(error)
              setDisabled(false);
            }
          });
          socket.on("join-info", (user) => {
            addUser(user);
          });
  
        }
      } catch (e) {
        console.log(e);
        setDisabled(false);
      }
    }
  };

  const disconnectUser = async () => {
    socket.emit("disconnectUser", data);
    navigate("/");
  };

  const goToOtherRoom = async () => {
    socket.emit("disconnectUser", data);
    // console.log(games.gameType)
    navigate("/join-game", { state: { gameType: gameName } });
  };

  // paperStone Scissors
  const paperStoneScissors = async (userChoice) => {
    setIsUserButtonDisabled(true);
    socket.emit("paperStoneScissors", { userChoice, userName, roomName });
    socket.on("result", (result) => {
      setFinishedGame(!finishedGame);
      setIsUserButtonHidden(true);
      setIsUserButtonDisabled(false);
      // socket.emit('disconnectUser', data)
      setResultGameOne(result);
    });

    // gdy gracz 2 wybierze w przeciągu ? 10 sekund ? to wysyla dane do servera i sprawdza kto wygrał
  };

  const playAgain = async () => {
    if (gameName[1] === "findAPair") {
    }
    if (gameName[1] === "maze") {
    }
    if (gameName[1] === "paperStoneScissors") {
      setIsUserButtonHidden(false);
    }
    if (gameName[1] === "puns") {
    }
    if (gameName[1] === "ticTacToe") {
      setIsGameBoardHidden(false);
      setDisabledOption(optionsTTT);
    }

    setFinishedGame(!finishedGame);
  };

  /// ticTacToe

  const ticTacToe = async (userChoice, e) => {
    // console.log(userChoice)
    // setIsUserButtonDisabled(true)
    e.target.disabled = true;
    // e.target.value = 'X'
    socket.emit("ticTacToe", { userChoice, userName, roomName });
    socket.on("result", (result) => {
      setFinishedGame(!finishedGame);
      setIsGameBoardHidden(true);
      setResultGameOne(result);

    });
  };

  socket.on("user-pick", (data) => {
    const { userChoice, type } = data;
    const user = data.userName;
    disableButtonAndSetValue(userChoice, type);
    if (user === userName) {
      setOtherPlayerTurn(true);
    } else {
      setOtherPlayerTurn(false);
    }
  });

  // disable options tictactoe
  const disableButtonAndSetValue = (userPick, type) => {
    let newDisabledOption = [...disabledOption];
    let change = newDisabledOption.find((a) => a.id === userPick);
    change.disable = true;
    if (type === 0) {
      change.signType = "o";
    } else {
      change.signType = "x";
    }

    setDisabledOption(newDisabledOption);
  };

  return (
    <div>
      {isLoading && (
        <div className="game-container">
          <GameMenu disconnectUser={disconnectUser} goToOtherRoom={goToOtherRoom}></GameMenu>
          <ToastContainer position="bottom-right" theme="colored" />
          {/* <div>{console.log(users.filter(user => user===userName).length)}</div>
    {users.filter(user => user===userName)===userName ? 
      <div>{console.log(users.filter(user => user===userName))}</div>
    : */}
          <div className="position-game-area">
            <div className="game-container__room-info">
              {howManyConnectedUsers >= 1 && (
                <div>
                  <h1 className="game-container__room-info--users">Gracze:</h1>
                  <h2 className="game-container__room-info--user">
                    {users.map((user) => (
                      <div key={user}>{user}</div>
                    ))}
                  </h2>
                </div>
              )}
            </div>

            <div className="game-container__board">
              <div className="game-container__board--info">
                <h2>Typ Gry:{gameName[2]}</h2>
                <h2>Pokój:{roomName}</h2>
              </div>
              {howManyConnectedUsers === 0 && (
                <button className="game-container__board--join-button" onClick={(e) => joinGame(e)} disabled={disabled}>
                  Dołącz
                </button>
              )}
              {howManyConnectedUsers === 1 && !finishedGame && users.filter((user) => user === userName).length === 1 && (
                <div className="game-container__board--waiting">
                  <div className="game-container__board--waiting-info">Waiting for opponent...</div>
                </div>
              )}
              {(howManyConnectedUsers === 2 || finishedGame) && users.filter((user) => user === userName).length === 1 && (
                <div className="game-container__board--started-game">
                  {gameName[1] === "findAPair" && <FindAPair gameType={gameName[1]}></FindAPair>}
                  {gameName[1] === "maze" && <Maze gameType={gameName[1]}></Maze>}
                  {gameName[1] === "paperStoneScissors" && (
                    <PaperStoneScissors
                      paperStoneScissors={paperStoneScissors}
                      gameType={gameName[1]}
                      disabled={isUserButtonDisabled}
                      resultGame={resultGameOne}
                      isUserButtonHidden={isUserButtonHidden}
                      playAgain={playAgain}
                    ></PaperStoneScissors>
                  )}
                  {gameName[1] === "puns" && <Puns gameType={gameName[1]}></Puns>}
                  {gameName[1] === "ticTacToe" && (
                    <TicTacToe
                      ticTacToe={ticTacToe}
                      resultGame={resultGameOne}
                      otherPlayerTurn={otherPlayerTurn}
                      disabledOption={disabledOption}
                      gameType={gameName[1]}
                      isGameBoardHidden={isGameBoardHidden}
                      playAgain={playAgain}
                    ></TicTacToe>
                  )}
                </div>
              )}
            </div>
          </div>
          {/* } */}
        </div>
      )}
    </div>
  );
}

export default GameRoom;
