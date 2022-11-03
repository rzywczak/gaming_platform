const mongoose = require('mongoose');

const FindAPairSchema = new mongoose.Schema(
    {
        userChoice: {
            type: Object,
            require: true,
            trim: true,
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
      points: {
            type: Number,
            default: 0,
            trim: true,
            minlength: 1,
            maxlength: 5,
          },
      },
      {
        timestamps: true,
      }
    );


    FindAPairSchema.statics.howManyUsersPick = async (roomName) => {

        const usersPicked = await FindAPair.find({roomName: roomName})
    
    
        return usersPicked.length
    }

    FindAPairSchema.statics.howManyPoints = async (roomName) => {

        const users = await FindAPair.find({roomName: roomName})
       const userPoints2 = users[0].points
       const userPoints1 = users[1].points 
       const userPoints = userPoints2+userPoints1
       return userPoints
    }

    FindAPairSchema.statics.haveUserPicked = async ( user, room) => {

       const data = await FindAPair.findOne({roomName: room, userName: user})

       
       return data.userChoice

    }

    FindAPairSchema.statics.updateUserPointsAndChoice = async (user) => {

        const userPick = await FindAPair.findOneAndUpdate(
            { userName: user },
            {$inc : {'points' : 1}}
          );
        const userChoice = await FindAPair.findOneAndUpdate(
            { userName: user },
            { userChoice: null}
        )

        userPick.save()
        userChoice.save()


    }

    FindAPairSchema.statics.updateUserChoice = async (choice, user) => {

        const userChoice = await FindAPair.findOneAndUpdate(
            { userName: user },
            { userChoice: choice}
        )
        await userChoice.save()
    }

    
const FindAPair = mongoose.model("FindAPair", FindAPairSchema);

module.exports = FindAPair;
