import supertest from 'supertest'
import app from '../index'

const request = supertest(app)

describe('Main endpoint test', () => {
    describe('Endpoint tests', () => {
        it('GET api/', async () => {
            const response = await request.get('/api')
            expect(response.status).toBe(200)
            expect(response.text).toEqual('Main API route')
        })
    })
})
