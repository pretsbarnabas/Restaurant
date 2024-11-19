const RestaurantModel = require("../../models/restaurant.model")
const RestaurantController = require("../../controllers/restaurant.controller")
const httpMocks = require("node-mocks-http")
const newRestaurant = require('../new-restaurant.json');


RestaurantModel.prototype.save = jest.fn();

let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;
});

RestaurantController.getRestaurants = jest.fn()
RestaurantModel.findById = jest.fn()

// describe('RestaurantController.createRestaurant', () => {
//     beforeEach(() => {
//         req.body = newRestaurant;
//     });

//     it('should have a createRestaurant function', () => {
//         expect(typeof RestaurantController.createRestaurant).toBe('function');
//     });

//     it('should call RestaurantModel.save', async () => {
//         await RestaurantController.createRestaurant(req, res, next);
//         expect(RestaurantModel.prototype.save).toHaveBeenCalled();
//     });

//     it('should return 201 response code', async () => {
//         RestaurantModel.prototype.save.mockReturnValue(newRestaurant);
//         await RestaurantController.createRestaurant(req, res, next);
//         expect(res.statusCode).toBe(201);
//         expect(res._isEndCalled()).toBeTruthy();
//     });

//     it('should return json body in response', async () => {
//         RestaurantModel.prototype.save.mockReturnValue(newRestaurant);
//         await RestaurantController.createRestaurant(req, res, next);
//         expect(res._getJSONData()).toStrictEqual(newRestaurant);
//     });

//     it('should handle errors', async () => {
//         const errorMessage = { message: 'Error saving restaurant' };
//         const rejectedPromise = Promise.reject(errorMessage);
//         RestaurantModel.prototype.save.mockReturnValue(rejectedPromise);
//         await RestaurantController.createRestaurant(req, res, next);
//         expect(res.statusCode).toBe(400);
//         expect(res._getJSONData()).toStrictEqual({ message: 'Error saving restaurant' });
//     });
// });

describe("Get all Restaurants",()=>{
    it("should have getRestaurants function",async()=>{
        expect(typeof RestaurantController.getRestaurants).toBe("function")
    })
    it("should call RestaurantController.getRestaurants",async()=>{
        await RestaurantController.getRestaurants(req,res,next)
        expect(RestaurantController.getRestaurants).toHaveBeenCalled()
    })
})

describe("Get Restaurant by ID",()=>{
    it("should have getRestaurantById function",async()=>{
        expect(typeof RestaurantController.getRestaurantById).toBe("function")
    })
    it("should call getRestaurantById with route parameters",async()=>{
        req.params.id = "5eb3d668b31de5d588f4292a"
        await RestaurantController.getRestaurantById(req,res,next)
        expect(RestaurantModel.findById).toHaveBeenLastCalledWith("5eb3d668b31de5d588f4292a")
    })
    it("should return 404 when item doesnt exist",async()=>{
        RestaurantModel.findById.mockReturnValue(null)
        await RestaurantController.getRestaurantById(req,res,next)
        expect(res.statusCode).toBe(404)
        expect(res._isEndCalled()).toBeTruthy()
    })
})
