var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// const moment = require('moment-timezone');
// const dateSeoul = moment.tz(Date.now() , "Asia/Seoul");
var ChatListSchema = new Schema({
    _id:  String,
    type: Number, // 0=소개팅, 1=미팅
    meeting : {type: String, ref : 'Meeting'},
    participants :[],          //{ id, exit , badge,  name , }
    bot : {type:Boolean , default:false},
    createdAt :  {type:Date , default : Date.now },
    time : {type:Date , default :  Date.now },
    message : String ,
    paid:{type:Boolean , default:false}
} ,{
    versionKey: false // You should be aware of the outcome after set to false
});


// Export the model
module.exports = mongoose.model('ChatList', ChatListSchema);