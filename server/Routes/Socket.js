const { Server } = require("socket.io")
const UserInRoom = require("../Models/UserInRoomModel")

const socketRouter = (httpServer) => {
    const io = new Server(httpServer)




io.on("connection", (socket) => {
    console.log("WebSocket connection");

// tworzenie pokoju z username, roomname i socketID
    socket.on('join-game', async ({ username, roomname}) => {

        const isRoomExist = await UserInRoom.findByCredentials(username, roomname)
       try {
        // console.log(isRoomExist)
         if(isRoomExist!==null){
            return console.log('Unable to join !')
        }
        const userInRoom =  new UserInRoom({socketID: socket.id, userName: username, roomName: roomname})
        console.log(username,roomname)
        userInRoom.save();
      } catch (e) {
        console.log(e)
      }

    })


  })





return io
}

module.exports = socketRouter 