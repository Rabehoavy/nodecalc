'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
const calculatriceController = require('../controllers/calculatriceController');

router.get('/', calculatriceController.list);

module.exports = router;
