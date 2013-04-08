exports.view = function(req, res){
  res.json({
    id: req.params.id,
    title: 'Proposal ' + req.params.id,
    content: 'Content ' + req.params.id,
    argument_count: 0
  });
};

exports.arguments = function(req, res){
  res.json([
    {
      author: 'Rodrigo Ochigame',
      timestamp: 'February 14th 2010, 3:25:50 pm',
      content: 'Lorem ipsum',
      replies: [
        {
          author: 'Tony Chen',
          timestamp: 'February 14th 2010, 3:25:50 pm',
          content: 'This is a reply',
          replies: []
        },
        {
          author: 'Aly Kopel',
          timestamp: 'February 14th 2010, 3:25:50 pm',
          content: 'This is another reply',
          replies: []
        }
      ]
    },
    {
      author: 'Stephanie Gardner',
      timestamp: 'February 14th 2010, 3:25:50 pm',
      content: 'Another argument',
      replies: []
    }
  ]);
};