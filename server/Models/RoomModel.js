const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')



const roomSchema = new mongoose.Schema(
  {
    roomName: {
      type: String,
      require: true,
      trim: true,
      minlength: 1,
      maxlength: 255,
    },
    password: {
      type: String,
      require: true,
      trim: true,
      minlength: 6,
      maxlength: 255,
    },
    gameType: {
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

// join to game 
// userSchema.statics.findByCredentials = async (email, password) => {
//     const user = await User.findOne({ email: email})
//     if(!user){
//         throw new Error('Unable to login')
//     }

//     const isMatch = await bcrypt.compare(password, user.password)

//     if(!isMatch){
//         throw new Error('Unable to login')
//     }

//     return user
// }

// userSchema.pre('save', async function(next) {
//    if(this.isModified('password')){
//     this.password = await bcrypt.hash(this.password, 8)
//    }
//     next() 
// })


// userSchema.pre('remove', async function(next){
//     const user = this
//     await Tank.deleteMany({ owner: user._id})
//     next()
// })


const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
