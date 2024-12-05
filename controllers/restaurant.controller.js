const RestaurantModel = require("../models/restaurant.model")

// exports.createRestaurant = async (req, res, next) => {
//     const data = new RestaurantModel(req.body);
//     try {
//         const dataToSave = await data.save();
//         res.status(201).json(dataToSave);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

module.exports = class RestaurantController{

    static async createRestaurant(req,res,next){
        const data = new RestaurantModel(req.body);
        try {
            const dataToSave = await data.save();
            res.status(201).json(dataToSave);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getRestaurants(req,res,next){
        try {
            const data = await RestaurantModel.find();
            res.json(data)
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    static async getRestaurantById(req,res,next){
        try {
            const data = await RestaurantModel.findById(req.params.id);
            if(data){
                res.status(200).json(data)
            }
            else{
                res.status(404).send()
            }
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    static async deleteRestaurantById(req,res,next){
        try {
            const id = req.params.id;
            const data = await RestaurantModel.findByIdAndDelete(id)
            if(data){
                res.send(`Document with ${data.name} has been deleted..`)
            }
            else{
                res.status(404).send()
            }
        }
        catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    static async patchRestaurantById(req,res,next){
        try {
            const id = req.params.id;
            const updatedData = req.body;
            const options = { new: true };
            const result = await RestaurantModel.findByIdAndUpdate(
                id, updatedData, options
            )
            if(result){
                res.send(result)
            }
            else{
                res.status(404).send()
            }
        }
        catch (error) {
            res.status(400).json({ message: error.message })
        }
    }
}
