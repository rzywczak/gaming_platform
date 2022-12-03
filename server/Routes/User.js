const express = require('express');
const User = require('../Models/UserModel');
const Room = require('../Models/RoomModel');
const auth = require('../Middlewares/AuthMiddleware')
const router = new express.Router();

//USER

//register
router.post("/api/users", async (req, res) => {
  const user = new User(req.body);
  try {
    // console.log(req.body)
    await user.save();

    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});
//login
router.post('/api/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});
// logout
router.get('/api/users/logout', auth ,async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch(e) {
        res.status(500).send()
    }
})

//get user data
router.get("/api/users/:id", auth, async (req, res) => {
    // console.log('data user'+req.user)
    res.send(req.user)
  
});

module.exports = router;