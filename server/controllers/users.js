const User = require('../models/users');
const bcrypt = require('bcrypt');

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
        bcrypt.hash(password,saltrounds,async(err,hash)=>{
            console.log(err);
            await User.create({
                name,
                email,
                phone,
                password
            })
            console.log("successfully send to Db");
            res.status(201).send("success user created")
        })
        
    
    
    }catch(err){
       console.log("signup error-->",err);
       res.status(500).send("something went wrong to post to db")
    }
}    