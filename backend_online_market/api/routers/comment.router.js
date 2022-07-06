'use strict'
const comment_controller = require('../controllers/comment.controller');
module.exports = (app) => {
    app.route('/comment')
        .post(comment_controller.mycomment);
    app.route('/comment/:id')
        .post(comment_controller.getCommentByIDItem)
}