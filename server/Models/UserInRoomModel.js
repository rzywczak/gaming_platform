const mongoose = require("mongoose");

const UserInRoomSchema = new mongoose.Schema(
  {
    socketID: {
      type: String,
      require: true,
      trim: true,
      unique: true,
      minlength: 1,
      maxlength: 255,
    },
    userName: {
      type: String,
      require: true,
      trim: true,
      minlength: 6,
      maxlength: 255,
    },
    roomName: {
        type: String,
        require: true,
        trim: true,
        minlenght: 1,
        maxlength: 255,
      },
  },
  {
    timestamps: true,
  }
);

// userSchema.virtual('tanks', {
//     ref: 'Tank',
//     localField: '_id',
//     foreignField: 'owner'
// })

// userSchema.methods.toJSON = function () {
//     const user = this 
//     const userObject = user.toObject()

//     delete userObject.password
//     delete userObject.tokens

//     return userObject
// }

// join to game  // serach User in Room
UserInRoomSchema.statics.findByCredentials = async (user, room) => {

    const userInRoom = await UserInRoom.findOne({ userName: user,roomName: room})

    return userInRoom
}
UserInRoomSchema.statics.countUsersInRoom = async (room) => {

const usersInRoom = await UserInRoom.count({roomName: room})

return usersInRoom
}

UserInRoomSchema.statics.findAllUsersInRoom = async (room) => {

  const userName = await UserInRoom.find({roomName: room})

  return userName
  }

UserInRoomSchema.statics.findRoomBySocketId = async (socketId) => {
  
  const room = await UserInRoom.findOne({socketID: socketId})

  return room

}
// create room with user 



// userSchema.pre('remove', async function(next){
//     const user = this
//     await Tank.deleteMany({ owner: user._id})
//     next()
// })


const UserInRoom = mongoose.model("UserInRoom", UserInRoomSchema);

module.exports = UserInRoom;
