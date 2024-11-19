const request = require('supertest')
const app = require('../../index')



describe('Create Todo', () =>{
    it("should return 200 and get restaurants",async()=>{
        const response = await request(app).get("/api/")
        expect(response.statusCode).toBe(200)
        expect(Array.isArray(response.body)).toBeTruthy()
        expect(response.body[0].address).toBeDefined()
        expect(response.body[0].borough).toBeDefined()
        expect(response.body[0].cuisine).toBeDefined()
        expect(response.body[0].grades).toBeDefined()
        expect(response.body[0].name).toBeDefined()
        expect(response.body[0].restaurant_id).toBeDefined()
    })
})