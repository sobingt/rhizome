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

function getProposals(ids, decision) {
  return [{id: 1, title: 'Proposal 1', content: 'Content 1 loaded from first', argument_count: 0}, {id: 2, title: 'Proposal 2', content: 'Content 2 loaded from first', argument_count: 0}];
}