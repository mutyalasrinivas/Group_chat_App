const express=require('express');

const router=express.Router();
const {postChat,getchat}=require('../controllers/chat');

const {authenticate}=require('../middleware/auth');

router.post('/chat',authenticate,postChat);
router.get('/chat',getchat);
module.exports=router