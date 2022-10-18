const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) =>{
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token})
        if(!user){
            throw new Error()
        }
        req.token = token 
        req.user = user
        next()
    } catch(e){
        res.status(401).send({error : 'Please authenticate.'})
    }

}
module.exports = auth

// module.exports.checkUser = (req, res, next) => {
//   const token = req.cookies.jwt;
//   if (token) {
//     jwt.verify(
//       token,
//         "secretkey",
//       async (err, decodedToken) => {
//         if (err) {
//           res.json({ status: false });
//           next();
//         } else {
//           const user = await User.findById(decodedToken.id);
//           if (user) res.json({ status: true, user: user.email, username: user.username });
//           else res.json({ status: false });
//           next();
//         }
//       }
//     );
//   } else {
//     res.json({ status: false });
//     next();
//   }
// };

