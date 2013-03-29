var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/rhizome');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  module.exports.User = require('./user.js').make(Schema, mongoose);
  module.exports.Group = require('./group.js').make(Schema, mongoose);
  module.exports.Decision = require('./decision.js').make(Schema, mongoose);
  module.exports.Proposal = require('./proposal.js').make(Schema, mongoose);
  module.exports.Vote = require('./vote.js').make(Schema, mongoose);
  module.exports.Argument = require('./argument.js').make(Schema, mongoose);
  console.log('Connected to database');
});
