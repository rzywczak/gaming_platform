const express = require('express');
const User = require('../Models/UserModel');
const Room = require('../Models/RoomModel');
const auth = require('../Middlewares/AuthMiddleware')
const router= new express.Router();


//ROOMS


//register
router.post("/api/rooms", async (req, res) => {

  const room = await new Room(req.body.data);
  try {
    await room.save();

    // const token = await user.generateAuthToken();

    res.status(201).send({ room });
  } catch (e) {
    res.status(400).send(e);
  }
});
//login
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