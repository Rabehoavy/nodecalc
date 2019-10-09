var express = require('express');
var router = express.Router();

const calculatriceController = require('../controllers/calculatriceController');

/* GET calculatrice page. */
router.get('/', calculatriceController.formulaire);
router.post('/add', calculatriceController.save);
router.get('/update/:id', calculatriceController.edit);
router.post('/update/:id', calculatriceController.update);

module.exports = router;
