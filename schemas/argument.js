var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports.make = function make(Schema, mongoose) {
  var ArgumentSchema = new Schema({
    proposal: { type: Schema.Types.ObjectId, ref: 'Proposal' },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    content: String,
    supporters: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    parent: { type: Schema.Types.ObjectId, ref: 'Argument' },
    replies: [{ type: Schema.Types.ObjectId, ref: 'Argument' }]
  });
  return mongoose.model('Argument', ArgumentSchema);
}