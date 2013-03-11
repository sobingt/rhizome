var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports.make = function make(Schema, mongoose) {
  var OptionSchema = new Schema({
    decision: { type: Schema.Types.ObjectId, ref: 'Decision' },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    title: String,
    content: String,
    arguments: [{ type: Schema.Types.ObjectId, ref: 'Argument' }],
    parent: { type: Schema.Types.ObjectId, ref: 'Option' },
    children: [{ type: Schema.Types.ObjectId, ref: 'Option' }]
  });
  return mongoose.model('Option', OptionSchema);
}