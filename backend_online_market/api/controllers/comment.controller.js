"use strict";
const _comment = require("../models/comment.model");
const item = require("../models/item.model");

exports.mycomment = async (req, res) => {
  if (
    typeof req.body.id_user === "undefined" ||
    typeof req.body.id_item === "undefined" ||
    typeof req.body.name === "undefined" ||
    typeof req.body.comment === "undefined"
  ) {
    res.status(422).json({ msg: "Invalid data" });
    return;
  }

  let { id_user, id_item, name, comment } = req.body;
  let itemFind;
  try {
    itemFind = await item.findById(id_item);
  } catch (err) {
    res.status(422).json({ msg: " ID item Invalid data" });
    return;
  }
  const new_comment = _comment({
    id_user: id_user,
    id_item: id_item,
    name: name,
    comment: comment
  });
  try {
    new_comment.save();
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
    return;
  }
  res.status(201).json({ msg: "success" });
  return;
};

exports.getCommentByIDItem = async (req, res) => {
  if (
    typeof req.body.id_item === "undefined" ||
    typeof req.body.page === "undefined"
  ) {
    res.status(422).json({ msg: "Invalid data" });
    return;
  }
  let { id_item, page } = req.body;
  let count = await _comment.count({ id_item: id_item });
  let totalPage = parseInt((count - 1) / 9 + 1);
  if (parseInt(page) < 1 || parseInt(page) > totalPage) {
    res.status(200).json({ data: [], msg: "Invalid page", totalPage });
    return;
  }
  _comment
    .find({ id_item: id_item })
    .skip(9 * (parseInt(page) - 1))
    .limit(9)
    .sort({ date: 1 })
    .exec((err, docs) => {
      if (err) {
        console.log(err);
        res.status(500).json({ msg: err });
        return;
      }
      res.status(200).json({ data: docs, totalPage });
    });
};
