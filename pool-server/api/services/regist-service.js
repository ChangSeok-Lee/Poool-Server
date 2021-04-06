const User = require("../models/User");

exports.registUser = async(req, res, next) => {
    let {} = req.params;
    const user = new User({
        id: req.body.id,
        password: req.body.password,
    });
    try{
        user.save();
        return res.send('post success');
    }catch(err){
        console.log(err);
        return ;
    }
}