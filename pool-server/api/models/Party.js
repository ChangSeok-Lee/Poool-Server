var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PartySchema = new Schema({
   id: {type: String, required: true},
   type: {type: Number, required: true},
   title: {type: String, required: true },
   body: { type: String, default: "Party" },
   owner: {type: JSON, required: true},
   size: {type: Number, default: 5},
   number: {type: Number, default: 1},
} ,
{
    timestamps: true,
    versionKey: false // You should be aware of the outcome after set to profileInfo
});


// Export the model
module.exports = mongoose.model('Party', PartySchema);