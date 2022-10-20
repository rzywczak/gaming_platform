const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      trim: true,
      maxlength: 255,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
      maxlength: 255,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      require: true,
      trim: true,
      minlength: 6,
      maxlength: 255,
    },
    tokens: [
      {
        token: {
          type: String,
          require: true,
        },
      },
    ],
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

userSchema.methods.toJSON = function () {
    const user = this 
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this 
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({token: token})
    await user.save()
    return token
}


// userSchema.methods.deleteToken = async function() {

//   const user = this
//   user.update()

// }

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email: email})
    if(!user){
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    console.log(isMatch)
    if(!isMatch){
        throw new Error('Unable to login')
    }

    return user
}

userSchema.pre('save', async function(next) {
   if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password, 8)
   }
    next() 
})


// userSchema.pre('remove', async function(next){
//     const user = this
//     await Tank.deleteMany({ owner: user._id})
//     next()
// })


const User = mongoose.model("User", userSchema);

module.exports = User;
