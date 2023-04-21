const express = require('express');
const {getGroupUser,removeuser,makememberadmin} = require('../controllers/groupchat');
const {authenticate} = require('../middleware/auth');

const router = express.Router();

router.get('/groupusers/getname',getGroupUser);
router.post('/group/removemember', authenticate,removeuser);
router.post('/group/makememberadmin',authenticate,makememberadmin);


module.exports = router;