const Chat = require('../models/chat');
const {Op} = require('sequelize');
const { where } = require('sequelize');


exports.postChat = async(req,res,next)=>{
    try{
        console.log("UserId",req.user.id);
        console.log("chat",req.body.text)
        await Chat.create({
            message:req.body.text,
            userId:req.user.id,
            username:req.user.name,
            time:new Date().getTime() 
        })
        res.satus(200).json({message:"successfully send message"});


    }catch(err){
        console.log(err);
        res.status(500).json({success:false,message: err})
    }
}