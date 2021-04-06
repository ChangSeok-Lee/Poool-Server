var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatSchema = new Schema({
   id: {type: String, required: true},
   sender: {type: String, required: true},
   msg: {type: String, required: true },
} ,
{
    timestamps: true,
    versionKey: false // You should be aware of the outcome after set to profileInfo
});


// Export the model
module.exports = mongoose.model('Chat', ChatSchema);