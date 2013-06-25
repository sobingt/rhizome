/**
 * TODO: Budget voting (experimental).
 */

exports.view = function(req, res){
  res.render('budget', { user: req.user, title: 'Budget: Mozilla Open Source Retributions 2012' });
};