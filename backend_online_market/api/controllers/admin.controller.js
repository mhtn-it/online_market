'use strict'
var cloudinary = require('cloudinary').v2;
// var uploads = {};
cloudinary.config({
    cloud_name: 'onlinemarket',
    api_key: '613293524736556',
    api_secret: 'nQ3h5BU_Jyu0chsu59Hi23B7xRw'
});

const item = require('../models/item.model');
const user = require('../models/user.model');
const category = require('../models/category.model');
const shop = require('../models/shop.model');
const producer = require('../models/producer.model');
const bcrypt = require('bcrypt');
const fs = require('fs');
const uploadImg = async (path) => {
    let res
    try {
        res = await cloudinary.uploader.upload(path)
    }
    catch(err) {
        console.log(err)
        return false
    }
    return res.secure_url
}
exports.addItem = async (req, res) => {
    if(typeof req.file === 'undefined' 
    || typeof req.body.name === 'undefined' 
    || typeof req.body.id_category === 'undefined' 
    || typeof req.body.price === 'undefined' 
    || typeof req.body.release_date === 'undefined' 
    || typeof req.body.describe === 'undefined' 
    || typeof req.body.id_shop === 'undefined' 
    || typeof req.body.id_producer === 'undefined' 
    ) {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    const {id_category, name, price, release_date, describe, id_producer, id_shop} = req.body;
    let urlImg = await uploadImg(req.file.path)
    if(urlImg === false) {
        res.status(500).json({msg: 'server error'});
        return;
    }
    const newItem = new item({
        id_category:id_category,
        name: name,
        price: price,
        release_date: release_date,
        img: urlImg,
        describe: describe,
        id_producer: id_producer,
        id_shop: id_shop
    })
    try{
        newItem.save()
    }
    catch(err) {
        res.status(500).json({msg: 'server error'});
        return;
    }
    fs.unlink(req.file.path, (err) => {
        if (err) throw err;
      });
    res.status(201).json({msg: 'success'})
    
}
exports.updateItem = async (req, res) => {
    if( typeof req.body.name === 'undefined' 
    || typeof req.body.id === 'undefined' 
    || typeof req.body.id_category === 'undefined' 
    || typeof req.body.price === 'undefined' 
    || typeof req.body.release_date === 'undefined' 
    || typeof req.body.describe === 'undefined' 
 
    ) {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let { name, id, id_category, price, release_date, describe, category} = req.body;
    let itemFind;
    try {
        itemFind = await item.findById(id);
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ msg: err })
        return;
    }
    if (itemFind === null) {
        res.status(404).json({ msg: "Not found" })
        return;
    }
    let urlImg = null;
    if(typeof req.file !== 'undefined' ) {
        urlImg = await uploadImg(req.file.path)
    }
    if(urlImg !== null) {
        if(urlImg === false) {
            res.status(500).json({msg: 'server error'});
            return;
        }
    }
    if(urlImg === null)
        urlImg = itemFind.img;
    
    itemFind.id_category = id_category;
    itemFind.name = name;
    itemFind.price = parseFloat(price)
    itemFind.release_date = release_date;
    itemFind.describe = describe;
    itemFind.category = category;
    itemFind.img = urlImg;
    itemFind.save((err, docs) => {
        if (err) {
            console.log(err);
        }
    });
   
    res.status(200).json({ msg: 'success', data: itemFind });
}

exports.deleteitem = async (req, res) => {
    if (typeof req.params.id === 'undefined') {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let itemFind;
    try {
        itemFind = await item.findById(req.params.id);
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ msg: err })
        return;
    }
    itemFind.remove();
    res.status(200).json({ msg: 'success', });
}

exports.updateUser = async (req, res) => {
    if (typeof req.body.email === 'undefined'
        || typeof req.body.username === 'undefined'
        || typeof req.body.fullName === 'undefined'
        || typeof req.body.address === 'undefined'
        || typeof req.body.phone_number === 'undefined'
        || typeof req.body.type === 'undefined'
    ) {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let { email, username, fullName, address, phone_number, type } = req.body;
    let userFind;
    try {
        userFind = await user.findOne({ 'username': username })
    }
    catch (err) {
        res.status(500).json({ msg: err });
        return;
    }
    if (userFind === null) {
        res.status(422).json({ msg: "not found" });
        return;
    }
    userFind.username = username;
    userFind.fullName = fullName;
    userFind.address = address;
    userFind.email = email;
    userFind.phone_number = phone_number;
    userFind.type = type;
    try {
        await userFind.save()
    }
    catch (err) {
        res.status(500).json({ msg: err });
        return;
    }
    res.status(200).json({
        msg: 'success', user: {
            email: userFind.email,
            username: userFind.username,
            fullName: userFind.fullName,
            address: userFind.address,
            phone_number: userFind.phone_number,
            type: userFind.type
        }
    });
}

exports.addProducer = async (req, res) => {
    if (typeof req.body.name === 'undefined') {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let { name } = req.body;
    let producerFind;
    try {
        producerFind = await producer.find({ 'name': name });
    }
    catch (err) {
        res.status(500).json({ msg: err });
        return;
    }
    if (producerFind.length > 0) {
        res.status(409).json({ msg: 'Producer already exist' });
        return;
    }
    const newProducer = new producer({ name: name });
    try {
        await newProducer.save();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: err });
        return;
    }
    res.status(201).json({ msg: 'success' });
}

exports.updateProducer = async (req, res) => {
    if (typeof req.body.id === 'undefined'
        || typeof req.body.name === 'undefined'
    ) {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let { id, name } = req.body;
    let producerFind;
    try {
        producerFind = await producer.findById(id);
    }
    catch (err) {
        res.status(500).json({ msg: err });
        return;
    }
    if (producerFind === null) {
        res.status(422).json({ msg: "not found" });
        return;
    }
    producerFind.name = name;
    try {
        await producerFind.save();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: err });
        return;
    }
  res.status(201).json({ msg: 'success', producer: { name: name } });
}

exports.deleteUser = async (req, res) => {
    if (typeof req.body.username === 'undefined') {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let userFind;
    try {
        userFind = await user.findOne({'username': req.body.username})
    }
    catch(err) {
        res.status(500).json({ msg: err });
        return;
    }
    userFind.remove();
    res.status(200).json({ msg: 'success'});
}

exports.addCategory = async (req, res) => {
    if (typeof req.body.name === 'undefined') {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let { name } = req.body;
    let categoryFind;
    try {
        categoryFind = await category.find({ 'name': name });
    }
    catch (err) {
        res.status(500).json({ msg: err });
        return;
    }
    if (categoryFind.length > 0) {
        res.status(409).json({ msg: 'Category already exist' });
        return;
    }
    const newCategory = new category({ name: name });
    try {
        await newCategory.save();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: err });
        return;
    }
    res.status(201).json({ msg: 'success' });
}

exports.updateCategory = async (req, res) => {
    if (typeof req.body.id === 'undefined'
        || typeof req.body.name === 'undefined'
    ) {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let { id, name } = req.body;
    let categoryFind;
    try {
        categoryFind = await category.findById(id);
    }
    catch (err) {
        res.status(500).json({ msg: err });
        return;
    }
    if (categoryFind === null) {
        res.status(422).json({ msg: "not found" });
        return;
    }
    categoryFind.name = name;
    try {
        await categoryFind.save();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: err });
        return;
    }
    res.status(201).json({ msg: 'success', category: { name: name } });
}

exports.addShop = async (req, res) => {
    if(typeof req.file === 'undefined' 
    || typeof req.body.name === 'undefined' 
    || typeof req.body.address === 'undefined' 
    || typeof req.body.phone_number === 'undefined' 
    || typeof req.body.describe === 'undefined' 
    ) {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let {name, address, phone_number, describe} = req.body;
    let shopFind;
    try {
        shopFind = await shop.find({ 'name': name });
    }
    catch (err) {
        res.status(500).json({ msg: err });
        return;
    }
    if (shopFind.length > 0) {
        res.status(409).json({ msg: 'Author already exist' });
        return;
    }
    let urlImg = await uploadImg(req.file.path)
    if(urlImg === false) {
        res.status(500).json({msg: 'server error'});
        return;
    }
    const newShop = new shop({
        name: name,
        certificate: urlImg,
        describe: describe,
        address: address,
        phone_number: phone_number
    })
    try{
        newShop.save()
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: err });
        return;
    }
    res.status(201).json({ msg: 'success' });
}

exports.updateShop = async (req, res) => {
    if (typeof req.body.id === 'undefined'
        || typeof req.body.name === 'undefined'
        || typeof req.body.address === 'undefined' 
        || typeof req.body.phone_number === 'undefined' 
        || typeof req.body.describe === 'undefined' 
    ) {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let { id, name, address, phone_number, describe } = req.body;
    let shopFind;
    try {
        shopFind = await shop.findById(id);
    }
    catch (err) {
        res.status(500).json({ msg: err });
        return;
    }
    if (shopFind === null) {
        res.status(422).json({ msg: "not found" });
        return;
    }
    let urlImg = null;
    if(typeof req.file !== 'undefined' ) {
        urlImg = await uploadImg(req.file.path)
    }
    if(urlImg !== null) {
        if(urlImg === false) {
            res.status(500).json({msg: 'server error'});
            return;
        }
    }
    if(urlImg === null)
        urlImg = itemFind.img;
    
    shopFind.name = name;
    shopFind.address = address;
    shopFind.phone_number = phone_number;
    shopFind.describe = describe;
    shopFind.certificate = urlImg;
    try {
        await shopFind.save();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: err });
        return;
    }
    res.status(201).json({ msg: 'success', shop: { name: name } });
}

exports.deleteshop = async (req, res) => {
    if (typeof req.params.id === 'undefined') {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let shopFind;
    try {
        shopFind = await shop.findById(req.params.id);
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ msg: err })
        return;
    }
    shopFind.remove();
    res.status(200).json({ msg: 'success', });
}

exports.addUser = async (req, res) => {
    if ((typeof req.body.email === 'undefined')
        || typeof req.body.username === 'undefined'
        || typeof req.body.fullName === 'undefined'
        || typeof req.body.address === 'undefined'
        || typeof req.body.phone_number === 'undefined'
        || typeof req.body.type === 'undefined'
    ) {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let { email, username, fullName, address, phone_number, type } = req.body;
    let userFind = null;
    try {
        userFind = await user.find({ 'username': username });
    }
    catch (err) {
        res.status(500).json({ msg: err });
        console.log(1)
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
        type: type
    });
    try {
        await newUser.save();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: err });
        return;
    }
    res.status(201).json({ msg: 'success' });
}
exports.getAllUser = async(req, res) => {
    if(typeof req.params.page === 'undefined') {
        res.status(402).json({msg: 'Data invalid'});
        return;
    }
    let count = null;
    try { 
        count = await user.count({});
    }
    catch(err) {
        console.log(err);
        res.status(500).json({msg: err});
        return;
    }
    let totalPage = parseInt(((count - 1) / 9) + 1);
    let { page } = req.params;
    if ((parseInt(page) < 1) || (parseInt(page) > totalPage)) {
        res.status(200).json({ data: [], msg: 'Invalid page', totalPage });
        return;
    }
    user.find({})
    .skip(9 * (parseInt(page) - 1))
    .limit(9)
    .exec((err, docs) => {
        if(err) {
            console.log(err);
                    res.status(500).json({ msg: err });
                    return;
        }
        res.status(200).json({ data: docs, totalPage });
    })
}
exports.login = async (req, res) => {
    if(typeof req.body.username === 'undefined'
    || typeof req.body.password == 'undefined'){
        res.status(402).json({msg: "Invalid data"});
        return;
    }
    let { username, password } = req.body;
    let userFind = null;
    try{
        userFind = await user.findOne({'username': username, 'type': '0'});
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
        username: userFind.username,
        password: password,
        email: userFind.email,
        fullName: userFind.fullName,
        address: userFind.address,
        phone_number: userFind.phone_number,
        id: userFind._id
    }});
}