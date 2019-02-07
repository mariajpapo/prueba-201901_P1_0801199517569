var express = require('express');
var router = express.Router();

//var usersApi = require('./api/users');
var superbowlApi = require('./api/superbowl');

//router.use('/users', usersApi);
router.use('/superbowl', superbowlApi);

module.exports = router;