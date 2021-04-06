var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
   id: {type: String, required: true},
   password: {type: String, required: true},
   profileInfo: {type: JSON },
   pushInfo: { type: JSON },
   stop: {type: Boolean, default: false},
} ,
{
    timestamps: true,
    versionKey: false // You should be aware of the outcome after set to profileInfo
});


// Export the model
module.exports = mongoose.model('User', UserSchema);