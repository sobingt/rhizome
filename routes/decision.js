var models = require('../schemas/models');

/**
 * TODO: View a decision.
 */
exports.view = function(req, res){
  res.render('decision', { user: req.user, title: 'What to do with the parking lot in Ridge?' });
};

/**
 * TODO: Get all proposals (JSON, sorted by new).
 * If ?proposals, get actual proposal data. Otherwise, get only the order.
 */
exports.new = function(req, res){
  res.json({
    order: [1, 2, 3],
    proposals: req.query['proposals'] == undefined ? [] : getProposals(req.params.id)
  });
};

/**
 * TODO: Get all proposals (JSON, sorted by current results).
 * If ?proposals, get actual proposal data. Otherwise, get only the order.
 */
exports.results = function(req, res){
  res.json({
    order: [3, 1, 2],
    proposals: req.query['proposals'] == undefined ? [] : getProposals(req.params.id)
  });
};

/**
 * TODO: Get only proposals that have not been voted by the user (JSON, sorted by current results).
 * If ?proposals, get actual proposal data. Otherwise, get only the order.
 */
exports.unvoted = function(req, res){
  res.json({
    order: [2, 3, 1],
    proposals: req.query['proposals'] == undefined ? [] : getProposals(req.params.id)
  });
};

/**
 * View "Start a new decision" page.
 */
exports.start = function(req, res){
  models.Group.findOne({ subdomain: req.params.subdomain }, function (err, group){
    if (group) {
      res.render('decision-start', { user: req.user, group: group.subdomain, groupName: group.name,  title: 'New decision' });
    } else {
      res.send(404);
    }
  });
};

/**
 * TODO: Start a new decision.
 */
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

/**
 * TODO: Helper to get the data of a list of proposals.
 */
function getProposals(ids, decision) {
  return [{id: 1, title: 'Proposal 1', content: 'Content 1 loaded from first', argument_count: 0}, {id: 2, title: 'Proposal 2', content: 'Content 2 loaded from first', argument_count: 0}];
}