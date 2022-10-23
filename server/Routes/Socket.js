const { Server } = require("socket.io")
const UserInRoom = require("../Models/UserInRoomModel")

const socketRouter = (httpServer) => {
    const io = new Server(httpServer)




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
          return callback('To many users maximum number of users is 2')
        }
        const userInRoom =  await new UserInRoom({socketID: socket.id, userName: username, roomName: roomname})
        // console.log(username,roomname)
        await userInRoom.save();
        // socket.join(roomname)
        const usersNamesInRoom = await UserInRoom.findAllUsersInRoom(roomname)
        await socket.join(roomname)
        const whoConnected = usersNamesInRoom.map(user => user.userName)
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



    socket.on("disconnect", async () => {
      console.log(socket.id)
      // const updateUsersTable = true
       const room = await UserInRoom.findRoomBySocketId(socket.id)
       console.log(room)
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