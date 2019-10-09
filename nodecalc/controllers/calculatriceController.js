var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId; 
var url = "mongodb://localhost:27017/";

const controller = {};

controller.formulaire = (req, res) => {
  res.render('calculatrice', {page:'Calculatrice', menuId:'ajouter'});
};

controller.list = (req, res) => {
  MongoClient.connect(url, {useUnifiedTopology: true, useNewUrlParser: true}, function(err, db) {
  if (err) throw err;
  var dbo = db.db("calculatrice");
  dbo.collection("param").find({}).toArray(function(err, result) {
    
    if (err) throw err;
	res.render('index', {page:result, menuId:'home'});
    console.log(result);
    db.close();
  });
});
};

controller.save = (req, res) => {
  MongoClient.connect(url, {useUnifiedTopology: true, useNewUrlParser: true}, function(err, db) {
  if (err) throw err;
  var dbo = db.db("calculatrice");
  var myobj = req.body;
  dbo.collection("param").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});
  res.redirect("/");
};

controller.calculer = (req, res) => {
  MongoClient.connect(url, {useUnifiedTopology: true, useNewUrlParser: true}, function(err, db) {
  if (err) throw err;
  var dbo = db.db("calculatrice");
  var myquery = req.params.id;

    dbo.collection("param").findOne({ _id: new ObjectId(myquery) }, function(err, operation) {
      if (err) throw err;
      console.log(operation);
      console.log("operation : "+operation.sel1);
      var nombre1 = Number(operation.nombre1);
      var nombre2 = Number(operation.nombre2);
      switch (operation.sel1) {
        case "+":
          resultat = nombre1 + nombre2;
          break;
        case "-":
          resultat = nombre1 - nombre2;
          break;
        case "*":
          resultat = nombre1 * nombre2;
          break;
        case "/":
          resultat = nombre1 / nombre2;
          break;
      }
      console.log(resultat);
      var newvalues = { $set: { "resultat": resultat } };
      dbo.collection("param").updateOne({ _id: new ObjectId(myquery) }, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
        db.close();
      });
      db.close();
    })
    res.redirect("/");  
});
  
};

controller.edit = (req, res) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("calculatrice");
    dbo.collection("param").find({}, { projection: { _id: req.params._id } }).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.render("calculatrice_edit", {
        page: result[0], menuId:'modifier'
      });
      db.close();
    });
  });
};

controller.update = (req, res) => {
  const { id } = req.params;
  const newetats = req.body;

  req.check("nom").isLength({ min: 3 });
  req.check("description").isLength({ min: 3 });
  const errors = req.validationErrors();
  if (errors) {
    console.log(errors);
    req.flash("error", "Erreur");
  } else {
    req.getConnection((err, conn) => {
      conn.query(
        "UPDATE etats set ? where id = ?",
        [newetats, id],
        (err, rows) =>  {
          req.flash("success", "Validé"); 
          res.redirect("/admin/etat");
        }
      );
    });
  }
};

controller.delete = (req, res) => {
  MongoClient.connect(url, {useUnifiedTopology: true, useNewUrlParser: true}, function(err, db) {
  if (err) throw err;
  var dbo = db.db("calculatrice");
  var myquery = req.params._id;
  dbo.collection("param").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    db.close();
  });
});
res.redirect("/");
};

module.exports = controller;
