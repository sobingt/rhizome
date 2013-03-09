var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

module.exports.make = function make(Schema, mongoose) {
  var ArgumentSchema = new Schema({
    option: ObjectId,
    author: ObjectId,
    content: String,
    created_at: Date,
    supporters: [ObjectId]
  });
  return mongoose.model('Argument', ArgumentSchema);
}