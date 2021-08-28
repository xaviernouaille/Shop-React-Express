import jest from 'jest'
import request from 'supertest'
import app from '../server'
import mongoose from 'mongoose'

// describe("Test product route", ()=>{
//     test("it should response the get method", done =>{
//         // request(app).get('/product').then(response => expect(response.status).toBe(200))
//         expect(true).toBe(true)
//     }, 10000)
// })
interface IInterface{
    toto: number
}

describe('Test product route', () => {
    it('it should response the get method', () => {
        request(app).get('/product').then(response => expect(response.status).toBe(209))
    })
    // it('it should response with good struct', () => {
    //     request(app).get('/product').then(response => expect(response.data).toEqual({
    //         total: expect.any(Number),
    //         page: expect.any(Number),
    //         pageSize: expect.any(Number),
    //         toto: expect.any(Number)
    //     }
    //     ))
    // })
})

  

afterAll(async () => { 
    await mongoose.connection.close()
})