var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports.make = function make(Schema, mongoose) {
  var GroupSchema = new Schema({
    members: [Schema.Types.ObjectId],
    name: String,
    description: String,
    created_at: Date
  });
  return mongoose.model('Group', GroupSchema);
}