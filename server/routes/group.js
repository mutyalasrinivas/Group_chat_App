const express = require('express');
const {createGroup,getgroupname} = require('../controllers/group');
const {authenticate} = require('../middleware/auth');

const router = express.Router();
router.post('/group/creategrp',authenticate,createGroup);

router.get('/users/getgroupname',authenticate,getgroupname);

module.exports = router;