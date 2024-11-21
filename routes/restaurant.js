const express = require("express");
const router = express.Router();
const RestaurantModel = require("../models/restaurant.model")
const RestaurantController = require("../controllers/restaurant.controller")

router.post('/', RestaurantController.createRestaurant)

router.get('/', RestaurantController.getRestaurants)

router.get('/:id', RestaurantController.getRestaurantById)

router.patch('/:id', RestaurantController.patchRestaurantById)

router.delete('/:id', RestaurantController.deleteRestaurantById)

module.exports = router;