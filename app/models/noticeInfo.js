var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var NoticeInfoSchema = new Schema({
    _id: {type: Schema.Types.ObjectId , auto : true},
    title :  String,
    content  : String,
    noticeNumber : {type:Number , default:1 ,unique:true},
    imageUrl :String,
    time : {type: Date  , default:Date.now }

} ,{
    versionKey: false // You should be aware of the outcome after set to false
});


NoticeInfoSchema.plugin(autoIncrement.plugin,  {
    model: 'NoticeInfo',
    field: 'noticeNumber',
    startAt: 1
});
module.exports = mongoose.model('NoticeInfo', NoticeInfoSchema);