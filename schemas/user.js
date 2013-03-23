var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports.make = function make(Schema, mongoose) {
  var UserSchema = new Schema({
    email: String,
    email_verification_key: String,
    email_verified: Boolean,
    password: String,
    salt: String,
    name: String,
    groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
    votes: [{ type: Schema.Types.ObjectId, ref: 'Vote' }]
  });
  return mongoose.model('User', UserSchema);
}