var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

module.exports.make = function make(Schema, mongoose) {
  var DecisionSchema = new Schema({
    group: ObjectId,
    starter: ObjectId,
    title: String,
    description: String,
    created_at: Date,
    ends_at: Date,
    options: [ObjectId],
    votes: [ObjectId],
    active: Boolean,
    winner: ObjectId
  });
  return mongoose.model('Decision', DecisionSchema);
}