const controller = {};

controller.formulaire = (req, res) => {
  res.render('form', {page:'Addition', menuId:'additionner', addition:0});
};

controller.save = (req, res) => {
  var addition = Number(req.body.nun) + Number(req.body.n2);
  res.render('form', {page:'Addition', menuId:'additionner', addition:addition.toString()});
  res.redirect("/");
};

module.exports = controller;