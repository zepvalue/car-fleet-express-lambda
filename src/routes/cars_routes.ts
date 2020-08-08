const express = require("express");
const {
  get_cars,
  get_car,
  delete_car,
} = require("../controllers/car_controller");

const carRouterTS = express.Router();
carRouterTS.route("/cars").get(get_cars);
carRouterTS.route("/car/:id").get(get_car).delete(delete_car);
module.exports = carRouterTS;
