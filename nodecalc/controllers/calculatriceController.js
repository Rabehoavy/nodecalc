var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

const controller = {};

controller.formulaire = (req, res) => {
  res.render('calculatrice', {page:'Calculatrice', menuId:'ajouter'});
};

controller.list = (req, res) => {
  MongoClient.connect(url, function(err, db) {
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
  MongoClient.connect(url, function(err, db) {
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
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("calculatrice");
  var myquery = { _id: "5d9b0b7d22da7d25784de10e" };
  var newvalues = { $set: {nombre1: "Mickey", nombre2: "Canyon 123" } };
  dbo.collection("param").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});
  res.redirect("/");
};

controller.edit = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM etats WHERE id = ?", [id], (err, rows) => {
      res.render("etats_edit", {
        data: rows[0]
      });
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
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("biblio");
  var { myquery } = req.params;
  dbo.collection("livres").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    db.close();
  });
});
res.redirect("/");
};

module.exports = controller;
