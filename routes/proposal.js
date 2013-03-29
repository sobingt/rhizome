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
      author: 'bird',
      timestamp: 'February 14th 2010, 3:25:50 pm',
      content: 'Lorem ipsum',
      replies: [
        {
          author: 'cow',
          timestamp: 'February 14th 2010, 3:25:50 pm',
          content: 'This is a reply',
          replies: []
        },
        {
          author: 'cat',
          timestamp: 'February 14th 2010, 3:25:50 pm',
          content: 'This is another reply',
          replies: []
        }
      ]
    },
    {
      author: 'fish',
      timestamp: 'February 14th 2010, 3:25:50 pm',
      content: 'Another argument',
      replies: []
    }
  ]);
};