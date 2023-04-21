const User=require('../models/users');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');



exports.signup= async (req , res)=>{
    try{
    const{name, email, phone, password}=req.body;
    if(name===undefined||name.length===0||email==null||email.lenght===0||phone===undefined||phone.length===0||password==null||password.length===0){
        return res.status(400).json({err:'Bad Paramete,Something is missing'})

    }
    const saltrounds=10;
    bcrypt.hash ( password,saltrounds,async(err , hash)=>{
      console.log(err);
      await User.create({name,email,phone,password:hash})
      res.status(201).json({message:"Succesfully created new user"})
    })
  }
  catch(err){
    res.status(500).json(err);
  }
  }






function isstringinvalid(string){
  if(string == undefined || string.length === 0){
       return true
  }
  else{
      return false
  }
}

function generateToken(id,name){
  return jwt.sign({userid:id,name:name},'SecretKey');
}


exports.login= async (req,res,next)=>{
  try{
       const {email,password }=req.body

      if(isstringinvalid(email) || isstringinvalid(password)){
        return res.status(400).json({error:"All fields are required"})
        }

      const user=await User.findAll({where : {email}})
      if(user.length>0){
          bcrypt.compare(password,user[0].password,(err,result)=>{
           if(err){
             res.status(500).json({  message:"something went wrong"})
           }
           else if(result===true){
           res.status(201).json({ success: true, message:"user logged successfully",token:generateToken(user[0].id,user[0].name)})
           }
           else{
           res.status(401).json({ success: false, message:"incorrect password"})
              }
           }
         )}
      else{
        res.status(404).json({success:false, message: "User not found"})
      }

  }
  catch(err){
      console.log(err)
     res.status(500).json({message: err, success:false})
  }
}