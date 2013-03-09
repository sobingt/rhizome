var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports.make = function make(Schema, mongoose) {
  var VoteSchema = new Schema({
    decision: Schema.Types.ObjectId,
    author: Schema.Types.ObjectId,
    yes: [Schema.Types.ObjectId],
    no: [Schema.Types.ObjectId]
  });
  return mongoose.model('Vote', VoteSchema);
}