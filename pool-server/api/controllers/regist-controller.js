var express = require('express');
var router = express.Router();
var registService = require('../services/regist-service');

/* GET regist listing. */
router.get('/', function(req, res, next) {
    
    res.send('respond with a resource');
});

router.post('/', registService.registUser);

module.exports = router;
