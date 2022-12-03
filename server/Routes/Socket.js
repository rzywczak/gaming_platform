const { Server } = require("socket.io");
const UserInRoom = require("../Models/UserInRoomModel");
const PaperStoneScissors = require("../Models/PaperStoneScissorsModel");
const TicTacToe = require("../Models/TicTacToeModel");
const FindAPair = require("../Models/FindAPairModel");
const Puns = require("../Models/PunsModel");
const Maze = require("../Models/MazeModel");
const { deleteMany } = require("../Models/UserInRoomModel");
const generator = require('generate-maze');
const { findOne } = require("../Models/MazeModel");

const socketRouter = (httpServer) => {
  const io = new Server(httpServer);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

 
  // tictactoe
  const winStates = ["012", "345", "678", "036", "147", "258", "048", "246"];

  const sign = { type: 0 };
  let winTTO = "";
  let messageTTO = "";


  io.on("connection", (socket) => {
    console.log("WebSocket connection");

    socket.on("join-game", async ({ username, roomname, gamename, cardArray }, callback) => {
      const isRoomExist = await UserInRoom.findByCredentials(username, roomname);
      try {
        if (isRoomExist !== null) {
          return callback("Unable to join !");
        }
        const usersInRoom = await UserInRoom.countUsersInRoom(roomname);
        if (usersInRoom >= 2) {
          return callback("Za dużo użytkowników w pokoju spróbuj ponownie później!");
        }

        const userInRoom = await new UserInRoom({ socketID: socket.id, userName: username, roomName: roomname });
        await userInRoom.save();
        const usersNamesInRoom = await UserInRoom.findAllUsersInRoom(roomname);
        await socket.join(roomname);

        const whoConnected = await usersNamesInRoom.map((user) => user.userName);
        io.to(roomname).emit("join-info", whoConnected);
        if (gamename[1] === "findAPair" && (await UserInRoom.countUsersInRoom(roomname)) === 2) {
          const newCardArray = cardArray.sort(() => 0.5 - Math.random());
          io.to(roomname).emit("findapair-prepareboard", newCardArray);
        }

        console.log("user connected " + socket.id + " users in room " + roomname + " : " + whoConnected);
        callback();
      } catch (e) {
        console.log(e);
      }
    });
    socket.on("disconnectUser", async ({ username, roomname }, callback) => {
      const userInRoom = await UserInRoom.findByCredentials(username, roomname);
      try {
        if (userInRoom === null) {
          const usersNamesInRoom = await UserInRoom.findAllUsersInRoom(roomname);
          const whoIsConnected = await usersNamesInRoom.map((user) => user.userName);
          io.to(roomname).emit("disconnect-info", whoIsConnected);
          socket.leave(roomname);
        
          return "Cant disconnect user";
        }


        await UserInRoom.deleteOne(userInRoom);
        const usersNamesInRoom = await UserInRoom.findAllUsersInRoom(roomname);
        const whoIsConnected = await usersNamesInRoom.map((user) => user.userName);
        io.to(roomname).emit("disconnect-info", whoIsConnected);
        

        socket.leave(roomname);
        
        
        await PaperStoneScissors.deleteMany({ roomName: roomname });
        await TicTacToe.deleteMany({ roomName: roomname });
        await FindAPair.deleteMany({ roomName: roomname });
        await Puns.deleteMany({ roomName: roomname });
        await Maze.deleteMany({ roomName: roomname });
      } catch (e) {
        console.log(e);
      }
    });

    // PaperStoneScissors
    socket.on("paperStoneScissors", async (data) => {
      const { userChoice, userName, roomName } = await data;
      const userPick = await new PaperStoneScissors({ userChoice: userChoice, userName: userName, roomName: roomName });
      await userPick.save();

      const howManyUsersPick = await PaperStoneScissors.howManyUsersPick(data.roomName);

      if (howManyUsersPick.length <= 1) {
      } else {
        const playerOne = howManyUsersPick[0];
        const playerTwo = howManyUsersPick[1];
        let win = "";
        let message = "";

        if (playerOne.userChoice === "bato") {
          if (playerOne.userChoice === "bato" && playerTwo.userChoice === "gunting") {
            message = `Gracz ${playerOne.userName} wygrał!`;
            win = playerOne.userName;
          } else if (playerOne.userChoice === playerTwo.userChoice) {
            message = `Remis!`;
          } else {
            message = `Gracz ${playerTwo.userName} wygrał!`;
            win = playerTwo.userName;
          }
        } else if (playerOne.userChoice === "gunting") {
          if (playerOne.userChoice === "gunting" && playerTwo.userChoice === "papel") {
            message = `Gracz ${playerOne.userName} wygrał!`;
            win = playerOne.userName;
          } else if (playerOne.userChoice === playerTwo.userChoice) {
            message = `Remis!`;
          } else {
            message = `Gracz ${playerTwo.userName} wygrał!`;
            win = playerTwo.userName;
          }
        } else if (playerOne.userChoice === "papel") {
          if (playerOne.userChoice === "papel" && playerTwo.userChoice === "bato") {
            message = `Gracz ${playerOne.userName} wygrał!`;
            win = playerOne.userName;
          } else if (playerOne.userChoice === playerTwo.userChoice) {
            message = `Remis!`;
          } else {
            message = `Gracz ${playerTwo.userName} wygrał!`;
            win = playerTwo.userName;
          }
        }

        let result = {
          message,
          win,
        };

        io.to(data.roomName).emit("result", result);
        await PaperStoneScissors.deleteMany({ roomName: data.roomName });
      }
    });

    // TicTacToe
    socket.on("ticTacToe", async (data) => {

      const { userChoice, userName, roomName } = await data;
      const checkUser = await TicTacToe.haveUserPicked(userName, roomName);
      if (!checkUser.haveUserPicked) {
        const userPick = await new TicTacToe({ userChoice: userChoice, userName: userName, roomName: roomName });
        await userPick.save();
      } else {
        const userPick = await TicTacToe.findOneAndUpdate(
          { userName: userName },
          { userChoice: checkUser.userPicks + userChoice }
        );
        await userPick.save();
      }

      const howManyUsersPick = await TicTacToe.howManyUsersPick(roomName);

      if (howManyUsersPick.length <= 1) {
        if (howManyUsersPick[0].userName === userName) {
          sign.type = 0;
        }
        io.to(roomName).emit("user-pick", { userName: userName, userChoice: userChoice, type: sign.type });
      } else {
        if (howManyUsersPick[0].userName === userName) {
          sign.type = 0;
        }
        if (howManyUsersPick[1].userName === userName) {
          sign.type = 1;
        }

        io.to(roomName).emit("user-pick", { userName: userName, userChoice: userChoice, type: sign.type });

        const playerOneChoice = howManyUsersPick[0].userChoice;
        const playerTwoChoice = howManyUsersPick[1].userChoice;

        const checkIfFirstPlayerWin = winStates.filter(
          (winChoice) =>
            [...playerOneChoice].find((e) => e === winChoice[0]) &&
            [...playerOneChoice].find((e) => e === winChoice[1]) &&
            [...playerOneChoice].find((e) => e === winChoice[2])
        );
        const checkIfSecondPlayerWin = winStates.filter(
          (winChoice) =>
            [...playerTwoChoice].find((e) => e === winChoice[0]) &&
            [...playerTwoChoice].find((e) => e === winChoice[1]) &&
            [...playerTwoChoice].find((e) => e === winChoice[2])
        );

        if (checkIfFirstPlayerWin.length > 0) {

          winTTO = howManyUsersPick[0].userName;
          messageTTO = "Gracz: " + howManyUsersPick[0].userName + " wygrał!";
          io.to(roomName).emit("result", { win: winTTO, message: messageTTO });
          await TicTacToe.deleteMany({ roomName: data.roomName });
        }

        if (checkIfSecondPlayerWin.length > 0) {

          winTTO = howManyUsersPick[1].userName;
          messageTTO = "Gracz: " + howManyUsersPick[1].userName + " wygrał!";
          io.to(roomName).emit("result", { win: winTTO, message: messageTTO });
          await TicTacToe.deleteMany({ roomName: data.roomName });
        }

        //draw
        if (howManyUsersPick[0].userChoice.length >= 5 || howManyUsersPick[1].userChoice.length >= 5) {
          io.to(roomName).emit("result", { win: "", message: "Remis!" });
          await TicTacToe.deleteMany({ roomName: data.roomName });
        }
      }
    });

    // FindAPair
    socket.on("findAPair", async (data) => {
      io.to(data.roomName).emit("findAPair-info", [data.userChoice, data.userChoice]);
      const { userName, roomName, userChoice } = await data;

      const userExist = await FindAPair.findOne({ userName: userName });

      if (userExist === null) {
        const user = await new FindAPair({ userChoice: userChoice, userName: userName, roomName: roomName });
        await user.save();
        return "User created, waiting for secound choice...";
      }
      const checkUserFirstChoice = await FindAPair.haveUserPicked(userName, roomName);
      if (checkUserFirstChoice === null) {
        await FindAPair.updateUserChoice(userChoice, userName);
        return "Waiting for secound choice...";
      }

      if (checkUserFirstChoice !== null && userChoice.name !== null) {
        io.to(roomName).emit("findAPair-info", [userChoice, checkUserFirstChoice]);
        if (userChoice.name === checkUserFirstChoice.name) {
          // console.log("Dostałeś punkt i jest znowu twoja tura");
          await FindAPair.updateUserPointsAndChoice(userName);
          console.log(checkUserFirstChoice);
          console.log(userChoice);
          io.to(roomName).emit("user-pick", {
            userName: "",
            userChoice: [userChoice, checkUserFirstChoice],
            again: true,
          });
        }
        if (userChoice.name !== checkUserFirstChoice.name) {
          // console.log("Tura przeciwnika bo nie udało CI się zgadnąć pary ");
          console.log(checkUserFirstChoice);
          console.log(userChoice);
          await FindAPair.updateUserChoice(null, userName);
          io.to(roomName).emit("user-pick", {
            userName: userName,
            userChoice: [userChoice, checkUserFirstChoice],
            again: false,
          });
        }
      }
      const howManyUsersPick = await FindAPair.howManyUsersPick(roomName);
      if (howManyUsersPick >= 2) {
        const points = await FindAPair.howManyPoints(roomName);
        if (points >= 6) {
          console.log("Wygrał " + userName + "!");
          io.to(roomName).emit("result", { userName: userName, message: "Wygrał " + userName + "!" });
          await FindAPair.deleteMany({ roomName: data.roomName });
        }
      }
    });


    // Puns
    socket.on("puns", async (data) => {
      socket.on("draw-puns", (data) => socket.broadcast.emit("draw-puns", data));
      const { roomName, finishedTurn } = await data;
      const { userName, userAnswer, chosenWord } = await data.data;
      if (chosenWord.length >= 1) {
        const userChoice = await new Puns({ chosenWord: chosenWord, userName: userName, roomName: roomName });
        await userChoice.save();
        const goodAnswer = await Puns.findAGoodAnswer(roomName);
        const result = {
          finishedTurn: false,
          userAnswer: userAnswer,
          chosenword: goodAnswer,
          drawingUser: userName
        };

        io.to(roomName).emit("puns", result);
        return 
      }
      const goodAnswer = await Puns.findAGoodAnswer(roomName);
      if (userAnswer === goodAnswer) {
      
       
        const result = {
          finishedTurn: true,
          userAnswer: userAnswer,
          drawingUser: userName,
        };

        await Puns.deleteMany({ roomName: roomName });
        io.to(roomName).emit("puns", result);
      }
      if (userAnswer !== goodAnswer) {
        const result = {
          finishedTurn: false,
          userAnswer: userAnswer,
          chosenword: goodAnswer,

        };

        io.to(roomName).emit("puns", result);
        io.to(roomName).emit("message-puns", ( {userName: userName, userAnswer: userAnswer}))
      }
    });
   
    // Maze



    socket.on('maze', async ({ userName ,roomName,  endRound, userCords, currentPosition, loadedMaze, winner, resultMazeGameInfo }) => {
     
     
      const checkUsers = await Maze.find({ roomName: roomName })
      if(resultMazeGameInfo&&checkUsers.length>=1) {
        console.log('koniec rundy')
        socket.to(roomName).emit('maze', { message: `Wygrał gracz: `, winner})
        await Maze.deleteMany({ userName: userName });
        return 
      }
      const isMazeGenerated = await Maze.find({ roomName: roomName })
      if(loadedMaze && currentPosition!==undefined && userCords!==undefined){
        socket.to(roomName).emit('client-data-maze', {endRound, userName, currentPosition, userCords})
        return 
      }

      console.log("TEST")
     if(isMazeGenerated.length<=1 && !loadedMaze && !resultMazeGameInfo ){
     
      console.log( userName )
    
      
        if((isMazeGenerated.length===0||isMazeGenerated[0].userName!==userName)&&isMazeGenerated.length!==2){
        const generateRandomNumberMaze =  Math.floor(Math.random() * 10000) + 1;
        const userData = await new Maze({ generatedMazeSeed: generateRandomNumberMaze, userName: userName, roomName: roomName })
        await userData.save()
    
        }
        const sendMaze = await Maze.find({ roomName: roomName })
        socket.to(roomName).emit('usersInMazeGame', {mazeData :sendMaze.length, sendMaze: sendMaze })
  
        if(sendMaze.length>=1){
        
          const roomGeneratedMaze = await Maze.find({ roomName: roomName })
          const generatedMazeKey = roomGeneratedMaze[0].generatedMazeSeed;
          socket.to(roomName).emit('generate-maze', {maze: generatedMazeKey, loaded: true})
    
          }
      
     
    }
 })

    socket.on("disconnect", async () => {
      const room = await UserInRoom.findRoomBySocketId(socket.id);

      if (room !== null) {
        const usersNamesInRoom = room.userName;

        await UserInRoom.deleteOne(room);
        await PaperStoneScissors.deleteMany({ roomName: room.roomName });
        await TicTacToe.deleteMany({ roomName: room.roomName });
        await FindAPair.deleteMany({ roomName: room.roomName });
        await Puns.deleteMany({ roomName: room.roomName });
        await Maze.deleteMany({ roomName: room.roomName });
        socket.leave(room);
        io.emit("message", usersNamesInRoom);
        console.log(socket.id + " User disconnected");
      }
    });
  });

  return io;
};

module.exports = socketRouter;
