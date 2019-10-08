var express = require('express');
var router = express.Router();

const calculatriceController = require('../controllers/calculatriceController');

/* GET calculatrice page. */
router.get('/', calculatriceController.formulaire);
router.post('/add', calculatriceController.save);
router.get('/_id', calculatriceController.calculer);
router.get('/delete/id', calculatriceController.delete);

module.exports = router;
