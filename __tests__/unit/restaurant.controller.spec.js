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
RestaurantModel.findByIdAndDelete = jest.fn()
RestaurantModel.findByIdAndUpdate = jest.fn()

describe('RestaurantController.createRestaurant', () => {
    beforeEach(() => {
        req.body = newRestaurant;
    });

    it('should have a createRestaurant function', () => {
        expect(typeof RestaurantController.createRestaurant).toBe('function');
    });

    it('should call RestaurantModel.save', async () => {
        await RestaurantController.createRestaurant(req, res, next);
        expect(RestaurantModel.prototype.save).toHaveBeenCalled();
    });

    it('should return 201 response code', async () => {
        RestaurantModel.prototype.save.mockReturnValue(newRestaurant);
        await RestaurantController.createRestaurant(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it('should return json body in response', async () => {
        RestaurantModel.prototype.save.mockReturnValue(newRestaurant);
        await RestaurantController.createRestaurant(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newRestaurant);
    });

    it('should handle errors', async () => {
        const errorMessage = { message: 'Error saving restaurant' };
        const rejectedPromise = Promise.reject(errorMessage);
        RestaurantModel.prototype.save.mockReturnValue(rejectedPromise);
        await RestaurantController.createRestaurant(req, res, next);
        expect(res.statusCode).toBe(400);
        expect(res._getJSONData()).toStrictEqual({ message: 'Error saving restaurant' });
    });
});

describe("Get all Restaurants",()=>{
    it("should have getRestaurants function",async()=>{
        expect(typeof RestaurantController.getRestaurants).toBe("function")
    })
    it("should call RestaurantController.getRestaurants",async()=>{
        await RestaurantController.getRestaurants(req,res,next)
        expect(RestaurantController.getRestaurants).toHaveBeenCalled()
    })
    it("should return 200 status code",async()=>{
        await RestaurantController.getRestaurants(req,res,next)
        expect(res.statusCode).toBe(200)
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
    it('should handle errors', async () => {
        const errorMessage = { message: 'Error getting restaurant' };
        const rejectedPromise = Promise.reject(errorMessage);
        RestaurantModel.findById.mockReturnValue(rejectedPromise);
        await RestaurantController.getRestaurantById(req, res, next);
        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toStrictEqual({ message: 'Error getting restaurant' });
    });
})

describe("Delete Restaurant by ID",()=>{
    it("should have deleteRestaurantById function",async()=>{
        expect(typeof RestaurantController.deleteRestaurantById).toBe("function")
    })
    it("should call deleteRestaurantById with route parameters",async()=>{
        req.params.id = "5eb3d668b31de5d588f4292a"
        await RestaurantController.deleteRestaurantById(req,res,next)
        expect(RestaurantModel.findByIdAndDelete).toHaveBeenCalledWith("5eb3d668b31de5d588f4292a")
    })
    it("should return 200 when succesfully deleting",async()=>{
        RestaurantModel.findByIdAndDelete.mockReturnValue({name:"asd"})
        await RestaurantController.deleteRestaurantById(req,res,next)
        expect(res.statusCode).toBe(200)
        expect(res._isEndCalled()).toBeTruthy()
    })

    it('should handle errors', async () => {
        const errorMessage = { message: 'Error deleting restaurant' };
        const rejectedPromise = Promise.reject(errorMessage);
        RestaurantModel.findByIdAndDelete.mockReturnValue(rejectedPromise);
        await RestaurantController.deleteRestaurantById(req, res, next);
        expect(res.statusCode).toBe(400);
        expect(res._getJSONData()).toStrictEqual({ message: 'Error deleting restaurant' });
    });
})


describe("Patch Restaurant by ID",()=>{
    it("should have patchRestaurantById function",async()=>{
        expect(typeof RestaurantController.patchRestaurantById).toBe("function")
    })
    it("sohuld call patchRestaurantById with parameters",async()=>{
        req.params.id = "673ee16fb4253126d6f58c79"
        await RestaurantController.patchRestaurantById(req,res,next)
        expect(RestaurantModel.findByIdAndUpdate).toHaveBeenCalledWith("673ee16fb4253126d6f58c79",{},{"new":true})
    })
    it("should return 200 when succesfully patching",async()=>{
        RestaurantModel.findByIdAndUpdate.mockReturnValue("pass");
        await RestaurantController.patchRestaurantById(req,res,next)
        expect(res.statusCode).toBe(200)
        expect(res._isEndCalled()).toBeTruthy()
    })

    it('should handle errors', async () => {
        const errorMessage = { message: 'Error saving restaurant' };
        const rejectedPromise = Promise.reject(errorMessage);
        RestaurantModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
        await RestaurantController.patchRestaurantById(req, res, next);
        expect(res.statusCode).toBe(400);
        expect(res._getJSONData()).toStrictEqual({ message: 'Error saving restaurant' });
    });
})