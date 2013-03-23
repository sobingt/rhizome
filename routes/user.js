var models = require('../schemas/models')
  , bcrypt = require('bcrypt');

//login
exports.login = function(req, res){
  res.render('login', { title: 'Peer Library - Log in' });
};

//register
exports.register = function(req, res){
  res.render('register', { title: 'Peer Library Registration'});
};

exports.registerHandler = function(req, res){
  var salt = bcrypt.genSaltSync(10);
  var user = new models.User({
    email: req.body.email,
    email_verification_key: bcrypt.genSaltSync(10),
    email_verified: false,
    password: bcrypt.hashSync(req.body.password, salt),
    salt: salt,
    name: req.body.name
  });

  user.save(function (err) {
    if (err) res.redirect('/');
    res.redirect('/');
  });
};