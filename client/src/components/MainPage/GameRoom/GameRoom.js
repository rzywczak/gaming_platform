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

import eyeOne from "../../../img/findapair/eye_one.png";
import eyeTwo from "../../../img/findapair/eye_two.png";
import eyeThree from "../../../img/findapair/eye_three.png";
import eyeFour from "../../../img/findapair/eye_four.png";
import eyeFive from "../../../img/findapair/eye_five.png";
import eyeSix from "../../../img/findapair/eye_six.png";

const socket = io();

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function GameRoom() {
  // config  settings
  const navigate = useNavigate();
  const { state } = useLocation();
  const { userName, roomName, gameType } = state || "wrong data";
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [howManyConnectedUsers, setHowManyConnectedUsers] = useState(0);
  const [otherPlayerTurn, setOtherPlayerTurn] = useState(true);
  const [finishedGame, setFinishedGame] = useState(false);

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
  const [isGameBoardHidden, setIsGameBoardHidden] = useState(false);

  // findapair
  const [loadingFindAPairData, setLoadingFindAPairData] = useState(false);
  const [cardArrayNames, setCardArrayNames] = useState([]);
  const [hiddenimage, setHiddenImage] = useState([
    { id: 0, disable: true },
    { id: 1, disable: true },
    { id: 2, disable: true },
    { id: 3, disable: true },
    { id: 4, disable: true },
    { id: 5, disable: true },
    { id: 6, disable: true },
    { id: 7, disable: true },
    { id: 8, disable: true },
    { id: 9, disable: true },
    { id: 10, disable: true },
    { id: 11, disable: true },
  ]);
  const [cardArray, setCardArray] = useState([
    { id: 0, disable: true, hidden: false, name: "eye_one", img: eyeOne },
    { id: 1, disable: true, hidden: false, name: "eye_two", img: eyeTwo },
    { id: 2, disable: true, hidden: false, name: "eye_three", img: eyeThree },
    { id: 3, disable: true, hidden: false, name: "eye_four", img: eyeFour },
    { id: 4, disable: true, hidden: false, name: "eye_five", img: eyeFive },
    { id: 5, disable: true, hidden: false, name: "eye_six", img: eyeSix },
    { id: 6, disable: true, hidden: false, name: "eye_one", img: eyeOne },
    { id: 7, disable: true, hidden: false, name: "eye_two", img: eyeTwo },
    { id: 8, disable: true, hidden: false, name: "eye_three", img: eyeThree },
    { id: 9, disable: true, hidden: false, name: "eye_four", img: eyeFour },
    { id: 10, disable: true, hidden: false, name: "eye_five", img: eyeFive },
    { id: 11, disable: true, hidden: false, name: "eye_six", img: eyeSix },
  ]);

  //maze
  const [finishedTurn, setFinishedTurn] = useState(true);
  const [ chosenWord, setChosenWord ] = useState("")
 const [ drawUser ,setDrawUser] = useState("")
  const [ usersTypes, setUsersTypes] = useState([{ id: 0, userName: "", userAnswer: ""}])
 //
  const [gameName] = useState(whatGame());

  const [data] = useState({ username: userName, roomname: roomName, gamename: gameName, cardArray: cardArray });

  //

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
      // tictactoe reset data to default
      if (gameName[1] === "ticTacToe") {
        setDisabledOption(optionsTTT);
      }
    }
    if (users.length === 1) {
      setHowManyConnectedUsers(1);
      // tictactoe reset data to default
      if (gameName[1] === "ticTacToe") {
        setDisabledOption(optionsTTT);
      }
      // TicTacToe who's first settings for now here
      if (users[0] === userName) {
        setOtherPlayerTurn(false);
        setDrawUser(userName)
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
          // random card on board
          socket.on("findapair-prepareboard", async (newCardArray) => {
            // setCardArray();
            setCardArray(newCardArray);
            // setCardArrayNames(newCardArray.map((item) => item.name && item.id && item.disable && item.hidden));
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

  const playAgain = async () => {
    if (gameName[1] === "findAPair") {
      setIsGameBoardHidden(false);
      socket.on("findapair-prepareboard", async (newCardArray) => {
        setCardArray(newCardArray);
      });
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

  socket.on("user-pick", async (data) => {
    const user = data.userName;
    if (gameName[1] === "puns") {
      // const { userChoice, type } = data;
      // disableButtonAndSetValue(userChoice, type);

      if (user === userName) {
        setOtherPlayerTurn(true);
      } else {
        setOtherPlayerTurn(false);
      }
    }
    if (gameName[1] === "ticTacToe") {
      const { userChoice, type } = data;
      disableButtonAndSetValue(userChoice, type);
      if (user === userName) {
        setOtherPlayerTurn(true);
      } else {
        setOtherPlayerTurn(false);
      }
    }
    if (gameName[1] === "findAPair") {
      const { userChoice, again } = await data;
      // aktualizowanie danych z findapair na boardzie

      if (again === true) {
        let insertDataToFirstUser = cardArray.map((item) =>
          item.id === userChoice[0].id ? { ...item, disable: false, hidden: false } : item
        );
        let insertDataToSecondUser = insertDataToFirstUser.map((item) =>
          item.id === userChoice[1].id ? { ...item, disable: false, hidden: false } : item
        );
        setCardArray(insertDataToSecondUser);
        //  setOtherPlayerTurn(true)

        return;
      }

      if (again === false) {
        await delay(1000);
        let insertDataToFirstUser = cardArray.map((item) =>
          item.id === userChoice[0].id ? { ...item, disable: true, hidden: false } : item
        );
        let insertDataToSecondUser = insertDataToFirstUser.map((item) =>
          item.id === userChoice[1].id ? { ...item, disable: true, hidden: false } : item
        );

        //  setCardArray(insertDataToFirstUser);
        setCardArray(insertDataToSecondUser);
      }
      if (user === userName) {
        //  console.log(cardArray)
        setOtherPlayerTurn(true);
      } else {
        // console.log(cardArray)
        setOtherPlayerTurn(false);
      }
    }
  });

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

  // findapair

  socket.on("findAPair-info", async (userChoice) => {
    if (userChoice[0].name !== userChoice[1].name) {
      setOtherPlayerTurn(true);
    }

    let insertDataToFirstUser = cardArray.map((item) =>
      item.id === userChoice[0].id ? { ...item, disable: true, hidden: true } : item
    );
    let insertDataToFSecondUser = insertDataToFirstUser.map((item) =>
      item.id === userChoice[1].id ? { ...item, disable: true, hidden: true } : item
    );
    setCardArray(insertDataToFSecondUser);
  });

  const findAPair = async (e, userChoice, buttonID) => {
    e.preventDefault();
    // e.target.disabled=true
    // if(loadingFindAPairData===false){
    //   setLoadingFindAPairData(true)
    socket.emit("findAPair", { userName, roomName, userChoice });

    // }
    socket.on("result", (result) => {
      setFinishedGame(!finishedGame);
      setIsGameBoardHidden(true);
      setResultGameOne(result);
    });
  };

  // -------------------- puns

  socket.on("puns", async ({ finishedTurn, userAnswer, drawingUser, chosenword, username }) => {
    // console.log(userAnswer,finishedTurn,userName)/

    setChosenWord(chosenword)
    if(drawingUser!==null&&drawingUser!==undefined){
    
      // console.log(drawingUser)
      // console.log("wykonaj sie raz po zmianie rysującego")
      setFinishedTurn(false)
    setDrawUser(drawingUser)
    }
    if(finishedTurn===true){
      // console.log(userAnswer,finishedTurn,userName, "UKOŃCZONO TURE")
      setUsersTypes( [{ id: 0, userName: "", userAnswer: ""}])
     
    setFinishedTurn(true)
 
    setOtherPlayerTurn(true)

    if(drawingUser===userName){
      setOtherPlayerTurn(false)
      setDrawUser(drawingUser)
      // console.log(otherPlayerTurn,userName,drawingUser)
    }
    }
    if(finishedTurn===false){
      // console.log(userAnswer,finishedTurn,userName, "NIE UKONCZONO TURY")
      socket.on("message-puns", (message) => { 
   
        setUsersTypes( [ ...usersTypes, {  id: usersTypes.length,userName: message.userName+": ", userAnswer: message.userAnswer}])
        })
      
    }
  })


  const puns = async (e, data) => {
    e.preventDefault();
    e.target[0].value = ""
    // console.log(data)

    if(data.chosenWord.lenght>=1){
      // setOtherPlayerTurn(false)
     setFinishedGame(false)
    }
     socket.emit("puns", ({data: data,finishedTurn: false,roomName: roomName}));
    //  if(data.userAnswer.length>=1){
  
    // }
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
                      <div key={user}>{user === userName ? user + "(Ty)" : user}</div>
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
                  {gameName[1] === "findAPair" && (
                    <FindAPair
                      gameType={gameName[1]}
                      cardArray={cardArray}
                      findAPair={findAPair}
                      hiddenimage={hiddenimage}
                      otherPlayerTurn={otherPlayerTurn}
                      resultGame={resultGameOne}
                      isGameBoardHidden={isGameBoardHidden}
                      playAgain={playAgain}
                    ></FindAPair>
                  )}
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
                  {gameName[1] === "puns" && (
                    <Puns
                      gameType={gameName[1]}
                      socket={socket}
                      roomName={roomName}
                      userName={userName}
                      puns={puns}
                      otherPlayerTurn={otherPlayerTurn}
                      finishedTurn={finishedTurn}
                      chosenWord={chosenWord}
                      drawUser={drawUser}
                      usersTypes={usersTypes}
                    ></Puns>
                  )}
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
