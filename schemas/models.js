var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/rhizome');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  module.exports.User = require('./user.js').make(Schema, mongoose);
  module.exports.Group = require('./group.js').make(Schema, mongoose);
  console.log('Connected to database');
});
