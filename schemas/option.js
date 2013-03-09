var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports.make = function make(Schema, mongoose) {
  var OptionSchema = new Schema({
    decision: Schema.Types.ObjectId,
    author: Schema.Types.ObjectId,
    title: String,
    content: String,
    arguments: [Schema.Types.ObjectId],
    parent: Schema.Types.ObjectId,
    children: [Schema.Types.ObjectId]
  });
  return mongoose.model('Option', OptionSchema);
}