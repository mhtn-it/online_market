'use strict'
const shop_controller = require('../controllers/shop.controller');
module.exports = (app) => {
    app.route('/shop')
        .get(shop_controller.getShop);
    app.route('/shop/all/:page')
        .get(shop_controller.getAll);
    app.route('/shop/name/:id')
        .get(shop_controller.getNameByID);
    app.route('/shop/:id')
        .get(shop_controller.getShopByID)
}