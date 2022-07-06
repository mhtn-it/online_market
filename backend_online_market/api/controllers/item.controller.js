'use strict'
const item = require('../models/item.model');
const producerController = require('../controllers/producer.controller');
const shopController = require('../controllers/shop.controller');
const categoryController = require('./category.controller');

exports.getTotalPage = (req, res) => {
    item.find({}, (err, docs) => {
        if (err) {
            console.log(err);
            res.status(500).json({ msg: err });
            return;
        }
        res.status(200).json({ data: parseInt((docs.length - 1) / 9) + 1 })
    })
}

exports.getAllItem = async (req, res) => {
    if ((typeof req.body.page === 'undefined')) {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    //Khoang gia
    let range = null;
    let objRange = null;
    if (typeof req.body.range !== 'undefined') {
        range = req.body.range;
        //objRange = JSON.parse(range);
        objRange = range;
    }
    //Search Text
    let searchText = "";
    if (typeof req.body.searchtext !== 'undefined') {
        searchText = req.body.searchtext;
    }
    let searchProducer = null;
    searchProducer = await producerController.getIDBySearchText(searchText);
    let searchShop = null;
    searchShop = await shopController.getIDBySearchText(searchText);
    let searchCategory = null;
    searchCategory = await categoryController.getIDBySearchText(searchText);
    //Sap xep
    let sortType = "release_date";
    let sortOrder = "-1";
    if (typeof req.body.sorttype !== 'undefined') {
        sortType = req.body.sorttype;
    }
    if (typeof req.body.sortorder !== 'undefined') {
        sortOrder = req.body.sortorder;
    }
    if ((sortType !== "price")
        && (sortType !== "release_date")
        && (sortType !== "view_counts")
        && (sortType !== "sales")) {
        res.status(422).json({ msg: 'Invalid sort type' });
        return;
    }
    if ((sortOrder !== "1")
        && (sortOrder !== "-1")) {
        res.status(422).json({ msg: 'Invalid sort order' });
        return;
    }
    //Trang va tong so trang
    let itemCount = null;
    try {
        if (range !== null) {
            itemCount = await item
                .count({ $or: [{ name: new RegExp(searchText, "i") }, { id_producer: { $in: searchProducer } }, { id_shop: { $in: searchShop } }, { id_category: { $in: searchCategory } }], price: { $gte: objRange.low, $lte: objRange.high } });
        }
        else {
            itemCount = await item.count({ $or: [{ name: new RegExp(searchText, "i") }, { id_producer: { $in: searchProducer } }, { id_shop: { $in: searchShop } }, { id_category: { $in: searchCategory } }] });
        }
    }
    catch (err) {
        res.status(500).json({ msg: err });
        return;
    }
    let totalPage = parseInt(((itemCount - 1) / 9) + 1);
    let { page } = req.body;
    if ((parseInt(page) < 1) || (parseInt(page) > totalPage)) {
        res.status(200).json({ data: [], msg: 'Invalid page', totalPage });
        return;
    }
    //De sort
    let sortQuery = {}
    sortQuery[sortType] = sortOrder;
    //Lay du lieu
    if (range !== null) {
        item
            .find({ $or: [{ name: new RegExp(searchText, "i") }, { id_producer: { $in: searchProducer } }, { id_shop: { $in: searchShop } }, { id_category: { $in: searchCategory } }], price: { $gte: objRange.low, $lte: objRange.high } })
            .skip(9 * (parseInt(page) - 1))
            .limit(9)
            .sort(sortQuery)
            .exec((err, docs) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ msg: err });
                    return;
                }
                res.status(200).json({ data: docs, totalPage });
            });
    }
    else {
        item
            .find({ $or: [{ name: new RegExp(searchText, "i") }, { id_producer: { $in: searchProducer } }, { id_shop: { $in: searchShop } }, { id_category: { $in: searchCategory } }] })
            .skip(9 * (parseInt(page) - 1))
            .limit(9)
            .sort(sortQuery)
            .exec((err, docs) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ msg: err });
                    return;
                }
                res.status(200).json({ data: docs, totalPage });
            });
    }
}

exports.getItemByProducer = async (req, res) => {
    if ((typeof req.body.page === 'undefined')
        || (typeof req.body.id === 'undefined')) {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let { id, page } = req.body;
    //Khoang gia
    let range = null;
    let objRange = null;
    if (typeof req.body.range !== 'undefined') {
        range = req.body.range;
        //objRange = JSON.parse(range);
        objRange = range;
    }
    //Search Text
    let searchText = "";
    if (typeof req.body.searchtext !== 'undefined') {
        searchText = req.body.searchtext;
    }
    //Sap xep
    let sortType = "release_date";
    let sortOrder = "-1";
    if (typeof req.body.sorttype !== 'undefined') {
        sortType = req.body.sorttype;
    }
    if (typeof req.body.sortorder !== 'undefined') {
        sortOrder = req.body.sortorder;
    }
    if ((sortType !== "price")
        && (sortType !== "release_date")
        && (sortType !== "view_counts")
        && (sortType !== "sales")) {
        res.status(422).json({ msg: 'Invalid sort type' });
        return;
    }
    if ((sortOrder !== "1")
        && (sortOrder !== "-1")) {
        res.status(422).json({ msg: 'Invalid sort order' });
        return;
    }
    //Trang va tong so trang
    let itemCount = null;
    try {
        if (range !== null) {
            itemCount = await item
                .count({ name: new RegExp(searchText, "i"), id_producer: id, price: { $gte: objRange.low, $lte: objRange.high } });
        }
        else {
            itemCount = await item.count({ name: new RegExp(searchText, "i"), id_producer: id });
        }
    }
    catch (err) {
        res.status(500).json({ msg: err });
        return;
    }
    let totalPage = parseInt(((itemCount - 1) / 9) + 1);
    if ((parseInt(page) < 1) || (parseInt(page) > totalPage)) {
        res.status(200).json({ data: [], msg: 'Invalid page', totalPage });
        return;
    }
    //De sort
    let sortQuery = {}
    sortQuery[sortType] = sortOrder;
    //Lay du lieu
    if (range !== null) {
        item
            .find({ name: new RegExp(searchText, "i"), id_producer: id, price: { $gte: objRange.low, $lte: objRange.high } })
            .skip(9 * (parseInt(page) - 1))
            .limit(9)
            .sort(sortQuery)
            .exec((err, docs) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ msg: err });
                    return;
                }
                res.status(200).json({ data: docs, totalPage });
            });
    }
    else {
        item
            .find({ name: new RegExp(searchText, "i"), id_producer: id })
            .skip(9 * (parseInt(page) - 1))
            .limit(9)
            .sort(sortQuery)
            .exec((err, docs) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ msg: err });
                    return;
                }
                res.status(200).json({ data: docs, totalPage });
            });
    }
}

exports.getItemByCategory = async (req, res) => {
    if (typeof req.body.id === 'undefined'
        || typeof req.body.page === 'undefined'
    ) {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let { id, page } = req.body;
    //Khoang gia
    let range = null;
    let objRange = null;
    console.log(req.body.range)
    if (typeof req.body.range !== 'undefined') {
        range = req.body.range;
        objRange = range;
    }
    //Kiem tra text
    let searchText = "";
    if (typeof req.body.searchtext !== 'undefined') {
        searchText = req.body.searchtext;
    }
    //Sap xep
    let sortType = "release_date";
    let sortOrder = "-1";
    if (typeof req.body.sorttype !== 'undefined') {
        sortType = req.body.sorttype;
    }
    if (typeof req.body.sortorder !== 'undefined') {
        sortOrder = req.body.sortorder;
    }
    if ((sortType !== "price")
        && (sortType !== "release_date")
        && (sortType !== "view_counts")
        && (sortType !== "sales")) {
        res.status(422).json({ msg: 'Invalid sort type' });
        return;
    }
    if ((sortOrder !== "1")
        && (sortOrder !== "-1")) {
        res.status(422).json({ msg: 'Invalid sort order' });
        return;
    }
    //Tinh tong so trang
    let itemCount, itemFind;
    try {
        if (range === null) {
            itemFind = await item.find({ id_category: id, name: new RegExp(searchText, "i") });
        } else {
            itemFind = await item.find({ id_category: id, name: new RegExp(searchText, "i"), price: { $gte: objRange.low, $lte: objRange.high } });
        }
    }
    catch (err) {
        res.status(500).json({ msg: err });
        return;
    }
    itemCount = itemFind.length;
    let totalPage = parseInt(((itemCount - 1) / 9) + 1);
    if (parseInt(page) < 1 || parseInt(page) > totalPage) {
        res.status(200).json({ data: [], msg: 'Invalid page', totalPage: totalPage });
        return;
    }
    //De sort
    let sortQuery = {}
    sortQuery[sortType] = sortOrder;
    //Lay du lieu
    if (range === null) {
        item.find({ id_category: id, name: new RegExp(searchText, "i") })
            .limit(9)
            .skip(9 * (page - 1))
            .sort(sortQuery)
            .exec((err, docs) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ msg: err });
                    return;
                }
                res.status(200).json({ data: docs, totalPage: totalPage });
            })
    } else {
        item.find({ id_category: id, name: new RegExp(searchText, "i"), price: { $gte: objRange.low, $lte: objRange.high } })
            .limit(9)
            .skip(9 * (page - 1))
            .sort(sortQuery)
            .exec((err, docs) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ msg: err });
                    return;
                }
                res.status(200).json({ data: docs, totalPage: totalPage });
            })
    }
}

exports.getItemByShop = async (req, res) => {
    if (typeof req.body.id === 'undefined'
        || typeof req.body.page === 'undefined'
    ) {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let { id, page } = req.body;
    //Khoang gia
    let range = null;
    let objRange = null;
    if (typeof req.body.range !== 'undefined') {
        range = req.body.range;
        objRange = range;
    }
    //Kiem tra text
    let searchText = "";
    if (typeof req.body.searchtext !== 'undefined') {
        searchText = req.body.searchtext;
    }
    //Sap xep
    let sortType = "release_date";
    let sortOrder = "-1";
    if (typeof req.body.sorttype !== 'undefined') {
        sortType = req.body.sorttype;
    }
    if (typeof req.body.sortorder !== 'undefined') {
        sortOrder = req.body.sortorder;
    }
    if ((sortType !== "price")
        && (sortType !== "release_date")
        && (sortType !== "view_counts")
        && (sortType !== "sales")) {
        res.status(422).json({ msg: 'Invalid sort type' });
        return;
    }
    if ((sortOrder !== "1")
        && (sortOrder !== "-1")) {
        res.status(422).json({ msg: 'Invalid sort order' });
        return;
    }
    //De sort
    let sortQuery = {}
    sortQuery[sortType] = sortOrder;
    //Tinh tong so trang
    let itemCount, itemFind;
    try {
        if (range === null) {
            itemFind = await item.find({ id_shop: id, name: new RegExp(searchText, "i") });
        } else {
            itemFind = await item.find({ id_shop: id, name: new RegExp(searchText, "i"), price: { $gte: objRange.low, $lte: objRange.high } });
        }
    }
    catch (err) {
        res.status(500).json({ msg: err });
        return;
    }
    itemCount = itemFind.length;
    let totalPage = parseInt(((itemCount - 1) / 9) + 1);
    if (parseInt(page) < 1 || parseInt(page) > totalPage) {
        res.status(200).json({ data: [], msg: 'Invalid page', totalPage: totalPage });
        return;
    }
    //Lay du lieu
    if (typeof req.body.range === 'undefined') {
        item.find({ id_shop: id, name: new RegExp(searchText, "i") })
            .limit(9)
            .skip(9 * (page - 1))
            .sort(sortQuery)
            .exec((err, docs) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ msg: err });
                    return;
                }
                res.status(200).json({ data: docs, totalPage: totalPage });
            })
    } else {
        item.find({shopop: id, name: new RegExp(searchText, "i"), price: { $gte: objRange.low, $lte: objRange.high } })
            .limit(9)
            .skip(9 * (page - 1))
            .sort(sortQuery)
            .exec((err, docs) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ msg: err });
                    return;
                }
                res.status(200).json({ data: docs, totalPage: totalPage });
            });
    }
}

exports.getItemByID = async (req, res) => {
    if (req.params.id === 'undefined') {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let result
    try {
        result = await item.findById(req.params.id);
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ msg: err })
        return;
    }
    if (result === null) {
        res.status(404).json({ msg: "not found" })
        return;
    }
    result.view_counts = result.view_counts + 1;
    result.save((err, docs) => {
        if (err) {
            console.log(err);
        }
    });
    res.status(200).json({ data: result })
}

exports.getRelatedItem = async (req, res) => {
    if (typeof req.params.itemId === 'undefined') {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let { itemId } = req.params;
    let itemObj = null;
    try {
        itemObj = await item.findById(itemId);
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ msg: err })
        return;
    }
    if (itemObj === null) {
        res.status(200).json({ data: [], msg: 'Invalid itemId' });
        return;
    }
    item
        .find({ $or: [{ $and: [{ id_category: itemObj.id_category }, { _id: { $nin: [itemId] } }] }, { $and: [{ id_shop: itemObj.id_shop }, { _id: { $nin: [itemId] } }] }] })
        .limit(5)
        .sort({ release_date: -1 })
        .exec((err, docs) => {
            if (err) {
                console.log(err);
                res.status(500).json({ msg: err });
                return;
            }
            res.status(200).json({ data: docs });
        });
}