var models = require('../schemas/models')
  , bcrypt = require('bcrypt');

/**
 * View a group.
 */
exports.view = function(req, res){
  models.Group.findOne({ subdomain: req.params.subdomain })
  .populate('decisions', '')
  .exec(function (err, group){
    if (group) {
      res.render('group', { user: req.user, title: group.name, group: group });
    } else {
      res.send(404);
    }
  });

};

/**
 * View "Start a new group" page.
 */
exports.start = function(req, res){
  res.render('group-start', { user: req.user, title: 'Start a new group' });
};

/**
 * Start a new group.
 * Gets emails separated by commas. If an email is registered, add it to group. Otherwise, invite email to Rhizome. 
 */
exports.startHandler = function(req, res){
  var emails = req.body.emails.replace(/\s+/g, '').split(',');

  models.Group.findOne({ subdomain: req.body.subdomain }, function (err, group){

    if (group == null) {
      var group = new models.Group({
        name: req.body.name,
        description: req.body.description,
        subdomain: req.body.subdomain,
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
          } else { // TODO: send invitation email to new user
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

    } else { // TODO: display error (subdomain already taken)
      res.redirect('/group/start');
    }
  });

};