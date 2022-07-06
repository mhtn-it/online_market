'use strict'
const item_controller = require('../controllers/item.controller');
module.exports = (app) => {
    app.route('/item/totalpage')
        .get(item_controller.getTotalPage);

    app.route('/item/allitem')
        .post(item_controller.getAllItem);

    app.route('/item/producer')
        .post(item_controller.getItemByProducer);

    app.route('/item/category')
        .post(item_controller.getItemByCategory);

    app.route('/item/shop')
        .post(item_controller.getItemByShop);

    app.route('/item/:id')
        .get(item_controller.getItemByID)

    app.route('/item/related/:itemId')
        .get(item_controller.getRelatedItem)
}