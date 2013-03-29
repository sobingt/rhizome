var models = require('../schemas/models')
  , bcrypt = require('bcrypt');

exports.view = function(req, res){
  models.Group.findOne({ name: req.params.name }, function (err, group){
    if (group) {
      res.render('group', { title: group.name, group: group });
    } else {
      res.send(404);
    }
  });

};

exports.start = function(req, res){
  res.render('group-start', { title: 'Start a new group' });
};

exports.startHandler = function(req, res){
  var emails = req.body.emails.replace(/\s+/g, '').split(',');

  var group = new models.Group({
    name: req.body.name,
    description: req.body.description,
    members: []
  });

  var count = emails.length;

  for (i in emails) {
    addUser(emails[i]);
  }

  function addUser(email) {
    models.User.findOne({ email: email }, function (err, user){
      if (user) {
        group.members.push(user._id);
        user.groups.push(group._id);
        user.save(function (err) {
          updateGroup();
        });
      } else {
        var salt = bcrypt.genSaltSync(10);
        user = new models.User({
          email: email,
          email_verification_key: bcrypt.genSaltSync(10),
          email_verified: false,
          password: null,
          salt: salt,
          name: null,
          groups: [group._id]
        });
        group.members.push(user._id);
        user.save(function (err) {
          updateGroup();
        });
      }
    });
  }

  function updateGroup() {
    count--;
    if (count == 0) {
      group.save(function (err) {
        if (err) res.redirect('/login');
        res.redirect('/');
      });
    }
  }

};