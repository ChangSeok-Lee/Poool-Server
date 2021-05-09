var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserChattingSchema = new Schema({
   id: {type: String, required: true},//user의 id
   nickname: {type: String, required:true},//user의 닉네임
   chatList: {type: JSON},//user가 참여한 채팅 리스트
} ,
{
    versionKey: false // You should be aware of the outcome after set to profileInfo
});


// Export the model
module.exports = mongoose.model('UserChatting', UserChattingSchema);