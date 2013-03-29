var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports.make = function make(Schema, mongoose) {
  var VoteSchema = new Schema({
    decision: { type: Schema.Types.ObjectId, ref: 'Decision' },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    yes: [{ type: Schema.Types.ObjectId, ref: 'Proposal' }],
    no: [{ type: Schema.Types.ObjectId, ref: 'Proposal' }]
  });
  return mongoose.model('Vote', VoteSchema);
}