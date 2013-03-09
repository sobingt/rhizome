var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports.make = function make(Schema, mongoose) {
  var DecisionSchema = new Schema({
    group: Schema.Types.ObjectId,
    starter: Schema.Types.ObjectId,
    title: String,
    description: String,
    created_at: Date,
    ends_at: Date,
    options: [Schema.Types.ObjectId],
    votes: [Schema.Types.ObjectId],
    active: Boolean,
    winner: Schema.Types.ObjectId
  });
  return mongoose.model('Decision', DecisionSchema);
}