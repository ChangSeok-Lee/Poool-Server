var express = require('express');
var router = express.Router();
var loginService = require('../services/login-service');

/* GET regist listing. */
router.get('/', function(req, res, next) {
    
    res.send('login get');
});

router.post('/', loginService.login);

module.exports = router;
