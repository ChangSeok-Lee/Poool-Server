var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatListSchema = new Schema({
   id: {type: String, required: true},
   type: {type: Number, required: true},
   title: {type: String, required: true },
   body: { type: String, default: "Party" },
   msg: {type: String},
} ,
{
    timestamps: true,
    versionKey: false // You should be aware of the outcome after set to profileInfo
});


// Export the model
module.exports = mongoose.model('ChatList', ChatListSchema);