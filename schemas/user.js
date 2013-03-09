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
    groups: [Schema.Types.ObjectId],
    votes: [Schema.Types.ObjectId],
    created_at: Date,
    new: Boolean
  });
  return mongoose.model('User', UserSchema);
}