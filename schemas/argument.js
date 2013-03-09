var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports.make = function make(Schema, mongoose) {
  var ArgumentSchema = new Schema({
    option: Schema.Types.ObjectId,
    author: Schema.Types.ObjectId,
    content: String,
    supporters: [Schema.Types.ObjectId]
  });
  return mongoose.model('Argument', ArgumentSchema);
}