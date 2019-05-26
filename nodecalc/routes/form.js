'use strict';
var express = require('express');
var router = express.Router();

/* GET form page. */
router.get('/', function (req, res) {
    res.render('form');
});

module.exports = router;
