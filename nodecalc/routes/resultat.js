'use strict';
var express = require('express');
var router = express.Router();

/* POST form page. */
router.post('/', function (req, res) {
    var addition = Number(req.body.nun) + Number(req.body.n2);
    var resultat = addition.toString();
    res.render('resultat', {
        result: resultat
    });
});

module.exports = router;