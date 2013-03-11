var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports.make = function make(Schema, mongoose) {
  var VoteSchema = new Schema({
    decision: { type: Schema.Types.ObjectId, ref: 'Decision' },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    yes: [{ type: Schema.Types.ObjectId, ref: 'Option' }],
    no: [{ type: Schema.Types.ObjectId, ref: 'Option' }]
  });
  return mongoose.model('Vote', VoteSchema);
}