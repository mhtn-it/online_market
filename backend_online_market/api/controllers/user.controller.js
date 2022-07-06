'use strict'
const user = require('../models/user.model');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    if ((typeof req.body.email === 'undefined')
        || typeof req.body.username === 'undefined'
        || typeof req.body.password === 'undefined'
        || typeof req.body.fullName === 'undefined'
        || typeof req.body.address === 'undefined'
        || typeof req.body.phone_number === 'undefined'
    ) {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let { email, password, username, fullName, address, phone_number} = req.body;
    if ( password.length < 6 ){
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let userFind = null;
    try {
        userFind = await user.find({ 'username': username });
    }
    catch (err) {
        res.status(500).json({ msg: err });
        return;
    }
    if (userFind.length > 0) {
        res.status(409).json({ msg: 'Username already exist' }); 
        return;
    }
    password = bcrypt.hashSync(password, 10);
    const newUser = new user({
        email: email,
        username: username,
        fullName: fullName,
        password: password,
        address: address,
        phone_number: phone_number,
        type: '2'
    });
    try {
        await newUser.save();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: err });
        return;
    }
    res.status(201).json({ msg: 'success' })
}

// delete
// exports.verifyAccount = async (req, res) => {
//     if(typeof req.params.token === 'undefined'){
//         res.status(402).json({msg: "!invalid"});
//         return;
//     }
//     let token = req.params.token;
//     let tokenFind = null;
//     try{
//         tokenFind = await user.findOne({'token': token});
//     }
//     catch(err){
//         res.status(500).json({msg: err});
//         return;
//     }
//     if(tokenFind == null){
//         res.status(404).json({msg: "not found!!!"});
//         return;
//     }
//     try{
//         await user.findByIdAndUpdate(tokenFind._id ,
//             { $set: { is_verify: true }}, { new: true });
//     }
//     catch(err){
//         res.status(500).json({msg: err});
//         return;
//     }
//     res.status(200).json({msg:"success!"});
// }

exports.login = async (req, res) => {
    if(typeof req.body.username === 'undefined'
    || typeof req.body.password == 'undefined'){
        res.status(402).json({msg: "Invalid data"});
        return;
    }
    let { username, password } = req.body;
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
    
    if(!bcrypt.compareSync(password, userFind.password)){
        res.status(422).json({msg: 'Invalid data'});
        return;
    }
    res.status(200).json({msg: 'success', user: {
        email: userFind.email,
        password: password,
        username: userFind.username,
        fullName: userFind.fullName,
        address: userFind.address,
        phone_number: userFind.phone_number,
        id: userFind._id
    }});
}

// exports.requestForgotPassword = async (req, res) => {
//     if(typeof req.params.email === 'undefined'){
//         res.json({msg: "Invalid data"});
//         return;
//     }   
//     let email = req.params.email;
//     let userFind = null;
//     try{
//         userFind = await user.findOne({'email': email});
//     }
//     catch(err){
//         res.json({msg: err});
//         return;
//     }
//     if(userFind == null) {
//         res.status(422).json({msg: "Invalid data"});
//     }
//     let token = otp.generateOTP();
//     let sendEmail = await nodemailer.sendEmailForgotPassword(email, token);
//     if (!sendEmail) {
//         res.status(500).json({ msg: 'Send email fail' });
//         return;
//     }   
//     userFind.token = token;
//     try {
//         await userFind.save();
//     }
//     catch (err) {
//         res.status(500).json({ msg: err });
//         return;
//     }
//     res.status(201).json({ msg: 'success', email: email })
// }

// exports.verifyForgotPassword = async (req, res) => {
//     if(typeof req.body.email === 'undefined'
//     || typeof req.body.otp === 'undefined'){
//         res.status(402).json({msg: "Invalid data"});
//         return;
//     }

//     let { email, otp } = req.body;
//     let userFind = null;
//     try{
//         userFind = await user.findOne({'email': email});
//     }
//     catch(err){
//         res.json({msg: err});
//         return;
//     }
//     if(userFind == null){
//         res.status(422).json({msg: "Invalid data"});
//         return;
//     }
//     if(userFind.token != otp) {
//         res.status(422).json({msg: "OTP fail"});
//         return;
//     }
//     res.status(200).json({msg: "success", otp: otp});
// }

// exports.forgotPassword = async (req, res) => {
//     if(typeof req.body.email === 'undefined'
//     || typeof req.body.otp === 'undefined'
//     || typeof req.body.newPassword === 'undefined'){
//         res.status(402).json({msg: "Invalid data"});
//         return;
//     }
//     let { email, otp, newPassword } = req.body;
//     let userFind = null;
//     try{
//         userFind = await user.findOne({'email': email});
//     }
//     catch(err){
//         res.json({msg: err});
//         return;
//     }
//     if(userFind == null){
//         res.status(422).json({msg: "Invalid data"});
//         return;
//     }
//     if(userFind.token != otp) {
//         res.status(422).json({msg: "OTP fail"});
//         return;
//     }

//     userFind.password = bcrypt.hashSync(newPassword, 10);
//     try {
//         await userFind.save();
//     }
//     catch (err) {
//         console.log(err);
//         res.status(500).json({ msg: err });
//         return;
//     }
//     res.status(201).json({ msg: 'success' })
// }

exports.updateInfor = async (req, res) => {
    if ( typeof req.body.fullName === 'undefined'
        || typeof req.body.username === 'undefined'
        || typeof req.body.address === 'undefined'
        || typeof req.body.phone_number === 'undefined'
        || typeof req.body.email === 'undefined'
    ) {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let { email, username, fullName, address, phone_number} = req.body;
    let userFind
    try {
        userFind = await user.findOne({'username': username})
    }
    catch(err) {
        res.status(500).json({ msg: err });
        return;
    }
    if(userFind === null) {
        res.status(422).json({ msg: "not found" });
        return;
    }
    userFind.email = email;
    userFind.fullName = fullName;
    userFind.address = address;
    userFind.phone_number = phone_number
    try {
        await userFind.save()
    }
    catch(err) {
        res.status(500).json({ msg: err });
        return;
    }
    res.status(200).json({msg: 'success', user: {
        username: userFind.username,
        email: userFind.email,
        fullName: userFind.fullName,
        address: userFind.address,
        phone_number: userFind.phone_number,
        id: userFind._id
    }});
}

exports.updatePassword = async (req, res) => {
    if ( typeof req.body.oldpassword === 'undefined'
        || typeof req.body.newpassword === 'undefined'
        || typeof req.body.username === 'undefined'
    ) {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let { username, oldpassword, newpassword } = req.body;
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
    if(!bcrypt.compareSync(oldpassword, userFind.password)){
        res.status(422).json({msg: 'Invalid data'});
        return;
    }
    userFind.password = bcrypt.hashSync(newpassword, 10);
    try {
        await userFind.save()
    }
    catch(err) {
        res.status(500).json({ msg: err });
        return;
    }
    res.status(200).json({msg: 'success'});
}