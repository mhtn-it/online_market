"use strict";
const producer_controller = require("../controllers/producer.controller");
module.exports = app => {
  app.route("/producer/all/:page").get(producer_controller.getAll);
  app.route("/producer").get(producer_controller.getProducer);
  app.route("/producer/name/:id").get(producer_controller.getNameByID);
}
