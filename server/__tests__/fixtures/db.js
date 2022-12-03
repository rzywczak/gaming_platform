
const mongoose = require('mongoose')
const request = require("supertest");
const jwt = require('jsonwebtoken')
const User = require('../../Models/UserModel')
const Room = require('../../Models/RoomModel')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    username: 'Ola',
    email: 'ola@ola.pl',
    password: '123123!',
    tokens: [{
        token: jwt.sign( {_id: userOneId }, process.env.JWT_SECRET)
    }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    username: 'Puczini',
    email: 'a@a.pl',
    password: '123123!',
    tokens: [{
        token: jwt.sign( {_id: userOneId }, process.env.JWT_SECRET)
    }]
}

const roomOne = {
    _id: new mongoose.Types.ObjectId(),

}

const roomTwo = {
    _id: new mongoose.Types.ObjectId(),
    roomName: 'roomTesting',
    password: '123456789!',
    gameType: 'puns'
}

const roomThree = {
    _id: new mongoose.Types.ObjectId(),
    roomName: 'room2',
    password: '123456789!',
    gameType: 'maze'
}

const setupDatabase = async () => {
    await User.deleteMany()
    await Room.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Room(roomOne).save()
    await new Room(roomTwo).save()
    await new Room(roomThree).save()
}

const closeConnectDB = async () => {
    await mongoose.connection.close()
}

module.exports = {
    userOneId,
    userTwoId,
    userOne,
    userTwo,
    roomOne,
    roomTwo,
    setupDatabase,
    closeConnectDB
}
