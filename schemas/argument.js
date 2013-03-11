var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports.make = function make(Schema, mongoose) {
  var ArgumentSchema = new Schema({
    option: { type: Schema.Types.ObjectId, ref: 'Option' },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    content: String,
    supporters: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    parent: { type: Schema.Types.ObjectId, ref: 'Argument' },
    replies: [{ type: Schema.Types.ObjectId, ref: 'Argument' }]
  });
  return mongoose.model('Argument', ArgumentSchema);
}