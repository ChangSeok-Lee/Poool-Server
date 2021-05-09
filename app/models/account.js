var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AccountSchema = new Schema({
    _id: {type: String, required: true, max: 100},
    uid : String,
    android : {type: Boolean  , default: true },
    profileInfo : { type : JSON},    // 다름 사람이 봐도 되는 정보 몰빵 (name, pic 등등)
    coin : {type : Number, default : 0},
    passSimsa:  {type: Boolean  , default:false },
    stop:  {type: Boolean  , default:false },
    writeReview:  {type: Boolean  , default:false },     //리뷰 유도
    itemInfo : {type:JSON},         //보유 아이템
    pushInfo : {type: JSON},        //푸시 알림 설정
    badgeInfo : {type:JSON},        //받은 뱃지
    withDraw : { type:Date},            //탈퇴 시간
    bot:  {type: Boolean  , default:false },
} ,{
    versionKey: false // You should be aware of the outcome after set to profileInfo
});


// Export the model
module.exports = mongoose.model('Account', AccountSchema);