
/*
 * GET decision page.
 */

exports.view = function(req, res){
  res.render('decision', { title: 'What to do with the parking lot in Ridge?' });
};

exports.new = function(req, res){
  res.json({
    order: [1, 2, 3],
    options: req.query['options'] == undefined ? [] : getDecisionOptions(req.params.id)
  });
};

exports.unvoted = function(req, res){
  res.json({
    order: [2, 3, 1],
    options: req.query['options'] == undefined ? [] : getDecisionOptions(req.params.id)
  });
};

exports.results = function(req, res){
  res.json({
    order: [3, 1, 2],
    options: req.query['options'] == undefined ? [] : getDecisionOptions(req.params.id)
  });
};

function getDecisionOptions(id) {
  return [{id: 1, title: 'Option 1', content: 'Content 1 loaded from first', argument_count: 0}, {id: 2, title: 'Option 2', content: 'Content 2 loaded from first', argument_count: 0}];
}