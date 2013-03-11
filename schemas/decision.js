var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports.make = function make(Schema, mongoose) {
  var DecisionSchema = new Schema({
    group: { type: Schema.Types.ObjectId, ref: 'Group' },
    starter: { type: Schema.Types.ObjectId, ref: 'User' },
    title: String,
    description: String,
    ends_at: Date,
    options: [{ type: Schema.Types.ObjectId, ref: 'Option' }],
    votes: [{ type: Schema.Types.ObjectId, ref: 'Vote' }],
    active: Boolean,
    winner: { type: Schema.Types.ObjectId, ref: 'Option' }
  });
  return mongoose.model('Decision', DecisionSchema);
}