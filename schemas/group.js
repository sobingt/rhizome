var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

module.exports.make = function make(Schema, mongoose) {
  var GroupSchema = new Schema({
    members: [ObjectId],
    name: String,
    description: String,
    created_at: Date
  });
  return mongoose.model('Group', GroupSchema);
}