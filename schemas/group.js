var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports.make = function make(Schema, mongoose) {
  var GroupSchema = new Schema({
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    name: String,
    description: String
  });
  return mongoose.model('Group', GroupSchema);
}