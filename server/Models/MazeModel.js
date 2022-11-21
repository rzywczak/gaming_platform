const mongoose = require('mongoose');

const MazeSchema = new mongoose.Schema(
    {
        generatedMazeSeed: {
            type: Number,
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


    MazeSchema.statics.findAGoodAnswer = async (roomName) => {

        const goodAnswer = await Maze.findOne({roomName: roomName})
    
    
        return goodAnswer.chosenWord
    }

    // MazeSchema.statics.howManyPoints = async (roomName) => {

    //     const users = await FindAPair.find({roomName: roomName})
    //    const userPoints2 = users[0].points
    //    const userPoints1 = users[1].points 
    //    const userPoints = userPoints2+userPoints1
    //    return userPoints
    // }

    // MazeSchema.statics.haveUserPicked = async ( user, room) => {

    //    const data = await FindAPair.findOne({roomName: room, userName: user})

       
    //    return data.userChoice

    // }

    // MazeSchema.statics.updateUserPointsAndChoice = async (user) => {

    //     const userPick = await FindAPair.findOneAndUpdate(
    //         { userName: user },
    //         {$inc : {'points' : 1}}
    //       );
    //     const userChoice = await Maze.findOneAndUpdate(
    //         { userName: user },
    //         { userChoice: null}
    //     )

    //     userPick.save()
    //     userChoice.save()


    // }

    MazeSchema.statics.updateGeneratedMaze= async (user) => {

        const userChoice = await Maze.findOneAndUpdate(
            { userName: user },
            { userChoice: true}
        )
        await userChoice.save()
    }

    
const Maze = mongoose.model("Maze", MazeSchema);

module.exports = Maze;
