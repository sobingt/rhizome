var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

module.exports.make = function make(Schema, mongoose) {
  var OptionSchema = new Schema({
    decision: ObjectId,
    author: ObjectId,
    title: String,
    content: String,
    created_at: Date,
    arguments: [ObjectId],
    parent: ObjectId,
    children: [ObjectId]
  });
  return mongoose.model('Option', OptionSchema);
}