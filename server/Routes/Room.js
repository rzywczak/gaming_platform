const express = require('express');
const User = require('../Models/UserModel');
const Room = require('../Models/RoomModel');
const auth = require('../Middlewares/AuthMiddleware')
const router= new express.Router();


//ROOMS


// create new room
router.post("/api/rooms", async (req, res) => {

  try {
    const room = new Room(req.body);
    console.log(req.body)
    await room.save();

    // const token = await user.generateAuthToken();

    res.status(201).send({ room });
  } catch (e) {
    res.status(400).send(e);
  }
});
// join new room
router.post('/api/rooms/join' ,async (req, res) => {
  try {
   
    const room = await Room.findByCredentials(
      req.body.roomName,
      req.body.password
    );

    // const token = await user.generateAuthToken();
    res.send({ room });
  } catch (e) {
    res.status(400).send();
  }
});


//get room data
router.get("/api/rooms/:id", auth, async (req, res) => {
    // console.log('data user'+req.user)
    res.send(req.room)
  
});




module.exports = router;