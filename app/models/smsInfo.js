var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SmsInfoSchema = new Schema({
    _id: {type: Schema.Types.ObjectId , auto : true},
    phone :String,
    auth_code : String,
    time : {type:Date , default :  Date.now },

} ,{
    versionKey: false // You should be aware of the outcome after set to false
});


// Export the model
module.exports = mongoose.model('SmsInfo', SmsInfoSchema);