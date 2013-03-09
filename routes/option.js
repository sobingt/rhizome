/*
 * GET option page.
 */

exports.view = function(req, res){
  res.json({
    id: req.params.id,
    title: 'Option ' + req.params.id,
    content: 'Content ' + req.params.id,
    argument_count: 0
  });
};