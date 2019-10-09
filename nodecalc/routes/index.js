'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
const calculatriceController = require('../controllers/calculatriceController');

router.get('/', calculatriceController.list);
router.get('/calculer/:id', calculatriceController.calculer);
router.get('/delete/:id', calculatriceController.delete);

module.exports = router;
