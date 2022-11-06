const { Server } = require("socket.io");
const UserInRoom = require("../Models/UserInRoomModel");
const PaperStoneScissors = require("../Models/PaperStoneScissorsModel");
const TicTacToe = require("../Models/TicTacToeModel");
const FindAPair = require("../Models/FindAPairModel");
const Puns = require("../Models/PunsModel");
const { deleteMany } = require("../Models/UserInRoomModel");
// const { emit } = require("../Models/UserInRoomModel")

const socketRouter = (httpServer) => {
  const io = new Server(httpServer);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // paperStoneScissors

  //
  // tictactoe
  const winStates = ["012", "345", "678", "036", "147", "258", "048", "246"];

  const sign = { type: 0 };
  let winTTO = "";
  let messageTTO = "";
  //

  io.on("connection", (socket) => {
    console.log("WebSocket connection");

    // tworzenie pokoju z username, roomname i socketID
    socket.on("join-game", async ({ username, roomname, gamename, cardArray }, callback) => {
      const isRoomExist = await UserInRoom.findByCredentials(username, roomname);
      try {
        // console.log(isRoomExist)
        // console.log(username)
        if (isRoomExist !== null) {
          // console.log('Unable to join !')
          return callback("Unable to join !");
        }
        const usersInRoom = await UserInRoom.countUsersInRoom(roomname);
        if (usersInRoom >= 2) {
          // console.log('To many users maximum number of users is 2')
          // return callback('To many users in room, maximum number of users is 2')
          return callback("Za dużo użytkowników w pokoju spróbuj ponownie później!");
        }

        const userInRoom = await new UserInRoom({ socketID: socket.id, userName: username, roomName: roomname });
        // console.log(username,roomname)
        await userInRoom.save();
        // socket.join(roomname)
        const usersNamesInRoom = await UserInRoom.findAllUsersInRoom(roomname);
        await socket.join(roomname);

        // console.log("AKTYWNE POKOJE: ");
        // console.log(socket.rooms); // the Set contains at least the socket ID
        // console.log(socket.id)

        const whoConnected = await usersNamesInRoom.map((user) => user.userName);
        // const whoConnectedData = { whoConnected: whoConnected+roomname, roomname: roomname}
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
          socket.leave(roomname);
          io.to(roomname).emit("disconnect-info", whoIsConnected);
          // if roomName option exhist
          //  await PaperStoneScissors.deleteMany({roomName : room});
          return "Cant disconnect user";
        }
        // if roomName option exhist
        //  await PaperStoneScissors.deleteMany({roomName : room});

        await UserInRoom.deleteOne(userInRoom);
        // usuwanie opcji w danej grze w momęcie disconnecta
        const usersNamesInRoom = await UserInRoom.findAllUsersInRoom(roomname);
        const whoIsConnected = await usersNamesInRoom.map((user) => user.userName);

        // console.log('user disconnected'+' users in room : '+userInRoom.userName)

        // console.log("AKTYWNE POKOJE Z DISKONEKTA PRZED: ");
        // console.log(socket.rooms);
        // console.log(socket.id)

        socket.leave(roomname);
        io.to(roomname).emit("disconnect-info", whoIsConnected);

        await PaperStoneScissors.deleteMany({ roomName: roomname });
        await TicTacToe.deleteMany({ roomName: roomname });
        await FindAPair.deleteMany({ roomName: roomname });
        await Puns.deleteMany({ roomName: roomname });
        // console.log("AKTYWNE POKOJE Z DISKONEKTA PO: ");
        // console.log(socket.rooms);
        // console.log(socket.id)
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

        console.log(playerOne.userChoice);
        console.log(playerTwo.userChoice);
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
        console.log(result);
        await PaperStoneScissors.deleteMany({ roomName: data.roomName });
      }
    });

    // TicTacToe
    socket.on("ticTacToe", async (data) => {
      console.log("DANE JAKIEŚ Z TICTACTOE");

      const { userChoice, userName, roomName } = await data;

      const checkUser = await TicTacToe.haveUserPicked(userName, roomName);
      // console.log(haveUserPicked)
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
          console.log(howManyUsersPick[0].userName + ": WYGRAŁ!");

          winTTO = howManyUsersPick[0].userName;
          messageTTO = "Gracz: " + howManyUsersPick[0].userName + " wygrał!";
          io.to(roomName).emit("result", { win: winTTO, message: messageTTO });
          await TicTacToe.deleteMany({ roomName: data.roomName });
        }

        if (checkIfSecondPlayerWin.length > 0) {
          console.log(howManyUsersPick[1].userName + ": WYGRAŁ!");

          winTTO = howManyUsersPick[1].userName;
          messageTTO = "Gracz: " + howManyUsersPick[1].userName + " wygrał!";
          io.to(roomName).emit("result", { win: winTTO, message: messageTTO });
          await TicTacToe.deleteMany({ roomName: data.roomName });
        }

        //draw
        if (howManyUsersPick[0].userChoice.length >= 5 || howManyUsersPick[1].userChoice.length >= 5) {
          console.log("REMIS");
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
        console.log("User created, waiting for secound choice...");
        const user = await new FindAPair({ userChoice: userChoice, userName: userName, roomName: roomName });
        await user.save();
        return "User created, waiting for secound choice...";
      }
      const checkUserFirstChoice = await FindAPair.haveUserPicked(userName, roomName);
      if (checkUserFirstChoice === null) {
        console.log("UPDATE USER CHOICE W PROGRESS...");
        await FindAPair.updateUserChoice(userChoice, userName);
        return "Waiting for secound choice...";
      }

      if (checkUserFirstChoice !== null && userChoice.name !== null) {
        io.to(roomName).emit("findAPair-info", [userChoice, checkUserFirstChoice]);
        // console.log(userChoice+" : "+checkUser.userChoice)
        if (userChoice.name === checkUserFirstChoice.name) {
          console.log("Dostałeś punkt i jest znowu twoja tura");
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
          console.log("Tura przeciwnika bo nie udało CI się zgadnąć pary ");
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

    socket.on("disconnect", async () => {
      const room = await UserInRoom.findRoomBySocketId(socket.id);

      if (room !== null) {
        const usersNamesInRoom = room.userName;

        await UserInRoom.deleteOne(room);
        await PaperStoneScissors.deleteMany({ roomName: room.roomName });
        await TicTacToe.deleteMany({ roomName: room.roomName });
        await FindAPair.deleteMany({ roomName: room.roomName });
        await Puns.deleteMany({ roomName: room.roomName });
        socket.leave(room);
        io.emit("message", usersNamesInRoom);
        console.log(socket.id + " User disconnected");
        // delete game state for all games TODO
      }
    });
  });

  return io;
};

module.exports = socketRouter;
