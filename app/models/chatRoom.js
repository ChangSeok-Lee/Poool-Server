var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// const moment = require('moment-timezone');
// const dateSeoul = moment.tz(Date.now() , "Asia/Seoul");
var ChatRoomSchema = new Schema({
    _id: {type: Schema.Types.ObjectId , auto : true},
    roomId:  String,
    type : Number, // 0=소개팅, 1=미팅
    sender : {type : String, ref : "Account"},
    message : String,
    time : {type:Date , default :  Date.now },
    badge : {type:Boolean , default : true},
} ,{
    versionKey: false // You should be aware of the outcome after set to false
});


// Export the model
module.exports = mongoose.model('ChatRoom', ChatRoomSchema);