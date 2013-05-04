var models = require('../schemas/models');

exports.view = function(req, res){
  res.render('decision', { user: req.user, title: 'What to do with the parking lot in Ridge?' });
};

exports.new = function(req, res){
  res.json({
    order: [1, 2, 3],
    proposals: req.query['proposals'] == undefined ? [] : getProposals(req.params.id)
  });
};

exports.unvoted = function(req, res){
  res.json({
    order: [2, 3, 1],
    proposals: req.query['proposals'] == undefined ? [] : getProposals(req.params.id)
  });
};

exports.results = function(req, res){
  res.json({
    order: [3, 1, 2],
    proposals: req.query['proposals'] == undefined ? [] : getProposals(req.params.id)
  });
};

exports.start = function(req, res){
  models.Group.findOne({ subdomain: req.params.subdomain }, function (err, group){
    if (group) {
      res.render('decision-start', { user: req.user, group: group.subdomain, groupName: group.name,  title: 'New decision' });
    } else {
      res.send(404);
    }
  });
};

exports.startHandler = function(req, res){
  models.Group.findOne({ subdomain: req.body.subdomain }, function (err, user){
    if (group) {
      var decision = new models.Decision({
        group: group._id,
        starter: req.user,
        title: req.body.title,
        description: req.body.description,
        created_at: new Date(),
        ends_at: (new Date()),
        proposals: [],
        votes: [],
        active: true,
        winner: null
      });
    } else {
      res.send(404);
    }
  });
}

function getProposals(ids, decision) {
  return [{id: 1, title: 'Proposal 1', content: 'Content 1 loaded from first', argument_count: 0}, {id: 2, title: 'Proposal 2', content: 'Content 2 loaded from first', argument_count: 0}];
}