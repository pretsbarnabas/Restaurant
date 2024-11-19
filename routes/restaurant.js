const express = require("express");
const router = express.Router();
const RestaurantModel = require("../models/restaurant.model")
const RestaurantController = require("../controllers/restaurant.controller")

router.post('/', RestaurantController.createRestaurant)

router.get('/', RestaurantController.getRestaurants)

router.get('/:id', RestaurantController.getRestaurantById)

router.patch('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };
        const result = await RestaurantModel.findByIdAndUpdate(
            id, updatedData, options
        )
        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params._id;
        const data = await RestaurantModel.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;