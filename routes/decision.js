
/*
 * GET decision page.
 */

exports.main = function(req, res){
  res.render('decision', { title: 'What to do with the parking lot in Ridge?' });
};