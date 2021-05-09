var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BanUserSchema = new Schema({
    _id: {type: Schema.Types.ObjectId , auto : true},
    id: String,
    oppositeId:  { type : String , ref: 'Account'},
    connect : {type: Boolean , default: true}, //true이면 연결 , false이면 폰차단
    time : {type:Date , default :  Date.now },

} ,{
    versionKey: false // You should be aware of the outcome after set to false
});


// Export the model
module.exports = mongoose.model('BanUser', BanUserSchema);