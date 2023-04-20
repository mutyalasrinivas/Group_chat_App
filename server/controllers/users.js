const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// get config vars
dotenv.config();

// access config var
process.env.TOKEN_SECRET;


require('crypto').randomBytes(64).toString('hex')
'09f26e4cdsdff9556885fdg22hy44eeeeegbbbdfshvbshdbv56sdv1v1s6vsawahgvcyj'

exports.signup=  async(req,res,next)=>{
    try{
        console.log(req.body);
        const {name,email,phone,password}=req.body;
    
     
        if(!name || !email || !phone || !password){
            return res.status(500).send("required feilds missing");
        }
        //check if user already exits
        const existingUser = await User.findOne({where:{email:email}});
        if(existingUser){
            return res.status(201).send("User already exits please Login");
        }
        //password
        const saltrounds= 10;
        await bcrypt.hash(password,saltrounds,async(err,hash)=>{
            console.log(err);
            await User.create({
                name:name,
                email:email,
                phone:phone,
                password:hash
            })
            console.log("successfully send to Db");
            res.status(201).send("success user created")
        })
        
    
    
    }catch(err){
       console.log("signup error-->",err);
       res.status(500).send("something went wrong to post to db")
    }
}    



function generateAccessToken(id,name) {
    return jwt.sign({userId:id,name:name}, process.env.TOKEN_SECRET);
  }



exports.login=async(req,res,next)=>{
     
    try{
         console.log(req.body);
         const {email,password} = req.body;
         //find user in db
         const user = await User.findAll({where:{email}});
         //if the user doest not exist
         if(user.length > 0){
           await bcrypt.compare(password,user[0].password,(err,result)=>{
                if(err){
                     throw new Error('Something went wrong')
                 }
                 else if(result === true){
                     res.status(201).json({success:true,message:"user logged in succesfully",token:generateAccessToken(user[0].id,user[0].name)})
                }
                else{
                     return res.status(401).json({success:false,message:'password is incorrect'})
                }
           })
             
      }else{
           return res.status(404).json({success:false,message:"user does not exit"})
      } 
    }catch(err){
         console.log("login controller function error",err)
    }
 }

