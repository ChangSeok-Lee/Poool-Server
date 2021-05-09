var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatListSchema = new Schema({
   id: {type: String, required: true},//chatting room id
   type: {type: Number, required: true},//chatting room type
   roomName: {type: String, required: true },//chatting room name
   user: {type: String},//현재 참여한 유저정보
   number: {type: Number},//현재 참여한 유저 수
   body: { type: String, default: "Party" },
   msg: {type: String},
} ,
{
    timestamps: true,
    versionKey: false // You should be aware of the outcome after set to profileInfo
});


// Export the model
module.exports = mongoose.model('ChatList', ChatListSchema);