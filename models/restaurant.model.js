const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
    address: {
        required: true,
        type: {
            building: String,
            coord: [Number, Number],
            street: String,
            zipcode: Number
        }
    },
    borough: {
        required: true,
        type: String,
    },

    cuisine: {
        required: true,
        type: String
    },
    grades: {
        required: true,
        type: [{ date: Date, grade: String, score: Number }]
    },
    name: {
        required: true,
        type: String
    },
    restaurant_id: {
        required: true,
        type: Number
    }
});
module.exports = mongoose.model("Restaurant", restaurantSchema);
