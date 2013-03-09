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

exports.arguments = function(req, res){
  res.json([
    {
      id: '1.',
      timestamp: 'February 14th 2010, 3:25:50 pm',
      content: 'Lorem ipsum',
      replies: [
        {
          id: '1.1.',
          timestamp: 'February 14th 2010, 3:25:50 pm',
          content: 'This is a reply',
          replies: []
        },
        {
          id: '1.2.',
          timestamp: 'February 14th 2010, 3:25:50 pm',
          content: 'This is another reply',
          replies: []
        }
      ]
    },
    {
      id: '2.',
      timestamp: 'February 14th 2010, 3:25:50 pm',
      content: 'Another argument',
      replies: []
    }
  ]);
};