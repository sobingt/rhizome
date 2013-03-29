var models = require('../schemas/models')
  , bcrypt = require('bcrypt');

exports.login = function(req, res){
  res.render('login', { user: req.user, title: 'Sign in to Rhizome' });
};

exports.register = function(req, res){
  res.render('register', { user: req.user, title: 'Register on Rhizome'});
};

exports.registerHandler = function(req, res){
  var salt = bcrypt.genSaltSync(10);
  var user = new models.User({
    email: req.body.email,
    email_verification_key: bcrypt.genSaltSync(10),
    email_verified: false,
    password: bcrypt.hashSync(req.body.password, salt),
    salt: salt,
    name: req.body.name,
    groups: [],
    votes: []
  });

  user.save(function (err) {
    if (err) res.redirect('/');
    res.redirect('/');
  });
};