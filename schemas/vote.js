var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

module.exports.make = function make(Schema, mongoose) {
  var VoteSchema = new Schema({
    decision: ObjectId,
    author: ObjectId,
    yes: [ObjectId],
    no: [ObjectId]
  });
  return mongoose.model('Vote', VoteSchema);
}