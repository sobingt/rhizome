var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports.make = function make(Schema, mongoose) {
  var UserSchema = new Schema({
    email: {
      address: String,
      verification_key: Number,
      verified: Boolean
    },
    password: String,
    name: String,
    groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
    votes: [{ type: Schema.Types.ObjectId, ref: 'Vote' }],
    new: Boolean
  });
  return mongoose.model('User', UserSchema);
}