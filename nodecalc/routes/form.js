'use strict';
var express = require('express');
var router = express.Router();

const additionController = require('../controllers/additionController');

/* GET livres page. */
router.get('/', additionController.formulaire);
router.post('/add', additionController.save);

module.exports = router;