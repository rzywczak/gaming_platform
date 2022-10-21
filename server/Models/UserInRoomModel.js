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
        maxlength: 10,
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

    const userInRoom = await UserInRoom.findOne({ user: user, room: room })
    const usersInRoom = await UserInRoom.count({room: room})
    console.log(usersInRoom)
    return userInRoom
}

// create room with user 



// userSchema.pre('remove', async function(next){
//     const user = this
//     await Tank.deleteMany({ owner: user._id})
//     next()
// })


const UserInRoom = mongoose.model("UserInRoom", UserInRoomSchema);

module.exports = UserInRoom;
