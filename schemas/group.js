var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports.make = function make(Schema, mongoose) {
  var GroupSchema = new Schema({
  	subdomain: String,
    name: String,
    description: String,
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  });
  return mongoose.model('Group', GroupSchema);
}