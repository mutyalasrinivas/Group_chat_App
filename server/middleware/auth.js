const jwt = require('jsonwebtoken');
const User = require('../models/users');

// exports.authenticate = async (req, res, next) => {
//      try {
//           const token = req.header('Authorization');
//           console.log(token);
//           const decoded = jwt.verify(token, 'secretkey');
//           console.log('userId-------->', decoded.userId);
//           const user = await User.findByPk(decoded.userId);
//           if (!user) {
//                return res.status(401).json({ success: false, message: "User not found" });
//           }
//           req.user = user;
//           next();
//      } catch (err) {
//           console.error(err);
//           return res.status(401).json({ success: false, message: "Invalid token" });
//      }
// }

 

const authenticate=(req,res,next)=>{
    try{
        const token = req.header('Authorization')
        console.log(token);
        const user=jwt.verify(token,'SecretKey')
        console.log(user);
        User.findByPk(user.userid).then(user=>{
            
            req.user=user
            next()
        })
        .catch(err=>{
            res.status(500).json({err:err})
        })
    }
    catch(err){
        console.log(err)
        res.status(501).json({err:"something went wrong"})
    }
}

module.exports={
    authenticate
}
