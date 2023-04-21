const express = require("express");
const router = express.Router();
const {signup,login} =require('../controllers/users');
 
 

 

router.post('/users/signup',signup);
router.post('/users/login',login);



module.exports = router;