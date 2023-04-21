const express = require('express');
const router = express.Router();
const {postChat} =require('../controllers/chat');
const {authenticate}=require('../middleware/auth');


router.post('/chat',authenticate,postChat);


module.exports = router;