exports.index = function(req, res){
  res.render('index', { user: req.user, title: 'Rhizome', message: 'Participatory democracy and place-based deliberation' });
};