const mongoose = require('mongoose');

const PunsSchema = new mongoose.Schema(
    {
        chosenWord: {
            type: String,
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
      },
      {
        timestamps: true,
      }
    );


    PunsSchema.statics.findAGoodAnswer = async (roomName) => {

        const goodAnswer = await Puns.findOne({roomName: roomName})
    
    
        return goodAnswer.chosenWord
    }

    // PunsSchema.statics.howManyPoints = async (roomName) => {

    //     const users = await FindAPair.find({roomName: roomName})
    //    const userPoints2 = users[0].points
    //    const userPoints1 = users[1].points 
    //    const userPoints = userPoints2+userPoints1
    //    return userPoints
    // }

    // PunsSchema.statics.haveUserPicked = async ( user, room) => {

    //    const data = await FindAPair.findOne({roomName: room, userName: user})

       
    //    return data.userChoice

    // }

    // PunsSchema.statics.updateUserPointsAndChoice = async (user) => {

    //     const userPick = await FindAPair.findOneAndUpdate(
    //         { userName: user },
    //         {$inc : {'points' : 1}}
    //       );
    //     const userChoice = await Puns.findOneAndUpdate(
    //         { userName: user },
    //         { userChoice: null}
    //     )

    //     userPick.save()
    //     userChoice.save()


    // }

    // PunsSchema.statics.updateUserChoice = async (choice, user) => {

    //     const userChoice = await Puns.findOneAndUpdate(
    //         { userName: user },
    //         { userChoice: choice}
    //     )
    //     await userChoice.save()
    // }

    
const Puns = mongoose.model("Puns", PunsSchema);

module.exports = Puns;
