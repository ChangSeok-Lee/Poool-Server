
const User = require("../models/User");
var mongoose = require('mongoose');

exports.login = async(req, res, next) => {
    let {} = req.params;
    const user = new User({
        id: req.body.id,
        password: req.body.password,
    });
    try{
        //db id, pw체크
        console.log(user.id);
        let data= await User.findOne({id:user.id},{_id:false},function(err, dt){
            console.log(dt.password);
            if(dt.password== user.password){
                return res.send('login success');
            }else{
                return res.send('login fail');
            }
        });
        
        
        
    }catch(err){
        console.log(err);
        return res.send('error occured');
    }
}