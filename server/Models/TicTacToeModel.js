const mongoose = require("mongoose");

const TicTacToeSchema = new mongoose.Schema(
  {
    userChoice: {
        type: String,
        require: true,
        trim: true,
        minlength: 1,
        maxlength: 255,
      },
      userName: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        minlength: 1,
        maxlength: 255,
      },
    roomName: {
      type: String,
      require: true,
      trim: true,
      minlength: 1,
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

// join to game 
TicTacToeSchema.statics.howManyUsersPick = async (roomName) => {

    const usersPicked = await TicTacToe.find({roomName: roomName})


    return usersPicked
}

TicTacToeSchema.statics.haveUserPicked = async (userName,roomName) => {

    const userPicked = await TicTacToe.findOne({userName: userName, roomName: roomName})

    if(userPicked!==null) {
        return { haveUserPicked: true, userPicks: userPicked.userChoice  }
    }
    else{
        return false
    }
    // return userPicked
}

// PaperStoneScissorsSchema.pre('save',async function(next) {
//   console.log('test')
//   if(this.isModified('password')){
//    this.password = await bcrypt.hash(this.password, 8)
//   }

//    next() 
// })

// userSchema.pre('remove', async function(next){
//     const user = this
//     await Tank.deleteMany({ owner: user._id})
//     next()
// })


const TicTacToe = mongoose.model("TicTacToe", TicTacToeSchema);

module.exports = TicTacToe;
