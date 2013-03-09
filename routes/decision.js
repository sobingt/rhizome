
/*
 * GET decision page.
 */

exports.view = function(req, res){
  res.render('decision', { title: 'What to do with the parking lot in Ridge?' });
};

exports.new = function(req, res){
  res.json([1, 2, 3]);
};

exports.unvoted = function(req, res){
  res.json([2, 3, 1]);
};

exports.results = function(req, res){
  res.json([3, 1, 2]);
};