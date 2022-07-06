'use strict'
const admin_controller = require('../controllers/admin.controller');
const multer = require('multer')
const storage = multer.diskStorage({
    destination: './files',
    filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  const upload = multer({ storage });
module.exports = (app) => {
    app.route('/admin/additem')
        .post(upload.single('file'), admin_controller.addItem);
    app.route('/admin/updateitem')
        .post(upload.single('file'), admin_controller.updateItem);
    app.route('/admin/deleteitem/:id')
        .get(admin_controller.deleteitem);
    app.route('/admin/updateuser')
        .post(admin_controller.updateUser);
    app.route('/admin/deleteuser')
        .post(admin_controller.deleteUser);
    app.route('/admin/addcategory')
        .post(admin_controller.addCategory);
    app.route('/admin/updatecategory')
        .post(admin_controller.updateCategory);
    app.route('/admin/addshop')
        .post(upload.single('file'), admin_controller.addShop);
    app.route('/admin/updateshop')
        .post(upload.single('file'), admin_controller.updateShop);
    app.route('/admin/deleteshop/:id')
        .post(admin_controller.deleteshop);
    app.route('/admin/addproducer')
       .post(admin_controller.addProducer);
    app.route('/admin/updateproducer')
       .post(admin_controller.updateProducer);
    app.route('/admin/adduser')
       .post(admin_controller.addUser);
    app.route('/admin/getAllUser/:page')
       .get(admin_controller.getAllUser);
    app.route('/admin/login')
       .post(admin_controller.login);
}