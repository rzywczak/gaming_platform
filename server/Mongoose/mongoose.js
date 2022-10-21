const mongoose = require("mongoose");

const connectionDB = () => mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DataBase Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });


module.exports = connectionDB