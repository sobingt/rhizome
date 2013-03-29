var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports.make = function make(Schema, mongoose) {
  var DecisionSchema = new Schema({
    group: { type: Schema.Types.ObjectId, ref: 'Group' },
    starter: { type: Schema.Types.ObjectId, ref: 'User' },
    title: String,
    description: String,
    ends_at: Date,
    proposals: [{ type: Schema.Types.ObjectId, ref: 'Proposal' }],
    votes: [{ type: Schema.Types.ObjectId, ref: 'Vote' }],
    active: Boolean,
    winner: { type: Schema.Types.ObjectId, ref: 'Proposal' }
  });
  return mongoose.model('Decision', DecisionSchema);
}