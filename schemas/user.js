var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

module.exports.make = function make(Schema, mongoose) {
  var UserSchema = new Schema({
    email: {
      address: String,
      verification_key: Number,
      verified: Boolean
    },
    password: String,
    name: String,
    groups: [ObjectId],
    votes: [ObjectId],
    created_at: Date,
    new: Boolean
  });
  return mongoose.model('User', UserSchema);
}