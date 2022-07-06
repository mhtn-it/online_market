'use strict'
const user = require('../models/user.model');
const bcrypt = require('bcrypt');
exports.verify = async(req, res) => {
    if(typeof req.body.username === 'undefined'
        ||typeof req.body.password === 'undefined'){
        res.status(422).json({msg: "Invalid data"});
        return;
    }
    let password = req.body.password;
    let username = req.body.username;
    let userFind = null;
    try{
        userFind = await user.findOne({'username': username});
    }
    catch(err){
        res.json({msg: err});
        return;
    }
    if(userFind == null){
        res.status(422).json({msg: "Invalid data"});
        return;
    }
    // password = bcrypt.hashSync(password, 10);
    if(bcrypt.compareSync(password, userFind.password)){
        res.status(200).json({msg: 'success'});
        return;
    }
    res.status(404).json({msg: 'unsuccess'});
}