const { Server } = require("socket.io")
const UserInRoom = require("../Models/UserInRoomModel")
const PaperStoneScissors = require("../Models/PaperStoneScissorsModel")
const { emit } = require("../Models/UserInRoomModel")

const socketRouter = (httpServer) => {
    const io = new Server(httpServer)

// paperStoneScissors

let usersChoices = []


//
    


io.on("connection", (socket) => {
    console.log("WebSocket connection");


// tworzenie pokoju z username, roomname i socketID
    socket.on('join-game', async ({ username, roomname}, callback) => {
        const isRoomExist = await UserInRoom.findByCredentials(username, roomname)
       try {
        // console.log(isRoomExist)
        // console.log(username)
         if(isRoomExist!==null){
          // console.log('Unable to join !')
            return callback('Unable to join !')
        }
        const usersInRoom = await UserInRoom.countUsersInRoom(roomname)
        if(usersInRoom>=2){
          // console.log('To many users maximum number of users is 2')
          // return callback('To many users in room, maximum number of users is 2')
          return callback('Za dużo użytkowników w pokoju spróbuj ponownie później!')
        }

        const userInRoom =  await new UserInRoom({socketID: socket.id, userName: username, roomName: roomname})
        // console.log(username,roomname)
        await userInRoom.save();
        // socket.join(roomname)
        const usersNamesInRoom = await UserInRoom.findAllUsersInRoom(roomname)
        await socket.join(roomname)
        console.log(roomname)
        const whoConnected = await usersNamesInRoom.map(user => user.userName)
        // const whoConnectedData = { whoConnected: whoConnected+roomname, roomname: roomname}
        io.to(roomname).emit('join-info',whoConnected)
        console.log('user connected '+socket.id+' users in room : '+whoConnected)
        callback()


      } catch (e) {
        console.log(e)
      }


    })
    socket.on('disconnectUser', async ({username, roomname}) => {

      const userInRoom = await UserInRoom.findByCredentials(username, roomname)
      try{
        if(userInRoom===null){
          return console.log('Cant disconnect user')
        }
        await UserInRoom.deleteOne(userInRoom);
        const usersNamesInRoom = await UserInRoom.findAllUsersInRoom(roomname)
        // const usersInRoom = await UserInRoom.countUsersInRoom(roomname)
        const whoDisconnected = await usersNamesInRoom.map(user => user.userName)
        io.to(roomname).emit('disconnect-info', whoDisconnected)
        console.log('user disconnected'+' users in room : '+userInRoom.userName)

      }
      catch(e){
        console.log(e)
      }
      

    })
    socket.on('paperStoneScissors', async (data) =>{
 
      const userPick = await new PaperStoneScissors({userChoice: data.userChoice, userName: data.userName, roomName: data.roomName})
      await userPick.save();



      const howManyUsersPick = await PaperStoneScissors.howManyUsersPick(data.roomName)

      console.log(howManyUsersPick.length)

      //  usersChoices.push({
      //   picked: data.userChoice,
      //   name: data.userName
      //  })

       if(howManyUsersPick.length <= 1){}
       
       else{

        const playerOne = howManyUsersPick[0]
        const playerTwo = howManyUsersPick[1]
        let win = "";
        let message = "";

        console.log(playerOne.userChoice)
        console.log(playerTwo.userChoice)
        if(playerOne.userChoice === 'bato') {
          if(playerOne.userChoice === 'bato' && playerTwo.userChoice === 'gunting') {
              message = `Gracz ${playerOne.userName} wygrał!`;
              win = playerOne.userName;
          } else if(playerOne.userChoice === playerTwo.userChoice) {
              message = `Remis!`;
          } else {
              message = `Gracz ${playerTwo.userName} wygrał!`;
              win = playerTwo.userName;
          }
      } else if(playerOne.userChoice === 'gunting') {
          if(playerOne.userChoice === 'gunting' && playerTwo.userChoice === 'papel') {
              message = `Gracz ${playerOne.userName} wygrał!`;
              win = playerOne.userName;
          } else if(playerOne.userChoice === playerTwo.userChoice) {
              message = `Remis!`;
          } else {
              message = `Gracz ${playerTwo.userName} wygrał!`;
              win = playerTwo.userName;
          }
      } else if(playerOne.userChoice === 'papel') {
          if(playerOne.userChoice === 'papel' && playerTwo.userChoice === 'bato') {
              message = `Gracz ${playerOne.userName} wygrał!`;
              win = playerOne.userName;
          } else if(playerOne.userChoice === playerTwo.userChoice) {
              message = `Remis!`;
          } else {
              message = `Gracz ${playerTwo.userName} wygrał!`;
              win = playerTwo.userName;
          }
      }

      // let result = [
      //     message,
      //     // usersChoices,
      //     win,
      // ]

      let result = {
        message,
        win,
      }


      io.to(data.roomName).emit('result', result);
      console.log(result)
      await PaperStoneScissors.deleteMany({roomName :data.roomName});
       }


    })

  


    // TicTacToe
    socket.on('ticTacToe', async (data) =>{
      console.log(data)

      // io.to(data.roomName).emit('',)
    })



    socket.on("disconnect", async () => {
      // console.log(socket.id)
      // const updateUsersTable = true
       const room = await UserInRoom.findRoomBySocketId(socket.id)
      //  console.log(room)
       if(room!==null) {const usersNamesInRoom = room.userName
     await UserInRoom.deleteOne(room);
   
     io.emit('message', usersNamesInRoom)
      console.log(socket.id+" User disconnected");
       }
    });

  })





return io
}

module.exports = socketRouter 