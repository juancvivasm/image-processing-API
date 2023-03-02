import supertest from 'supertest'
import app from '../../index'
import fs from 'fs'
import resize from '../../utilities/resize'

const request = supertest(app)

describe('Tests for images', () => {
    describe('Endpoint tests', () => {
        describe('When the image exists', () => {
            it('GET api/images?filename=palmtunnel&width=200&height=200', async () => {
                const response = await request.get('/api/images').query({
                    filename: 'palmtunnel',
                    width: '200',
                    height: '200',
                })
                expect(response.status).toBe(200)
                expect(response.type).toBe('image/jpeg')
            })
        })

        describe('When the image does not exist', () => {
            it('GET api/images?filename=Venezuela&width=200&height=200', async () => {
                const response = await request.get('/api/images').query({
                    filename: 'Venezuela',
                    width: '200',
                    height: '200',
                })
                expect(response.status).toBe(404)
                expect(response.type).toBe('text/html')
                expect(response.text).toBe('File Not Found!')
            })
        })

        describe('When the image name is not defined', () => {
            it('GET api/images?filename=&width=200&height=200', async () => {
                const response = await request
                    .get('/api/images')
                    .query({ filename: '', width: '200', height: '200' })
                expect(response.status).toBe(400)
                expect(response.type).toBe('text/html')
                expect(response.text).toBe('The file name must not be empty.')
            })
        })

        describe('When the width of the image has an invalid character', () => {
            it('GET api/images?filename=palmtunnel&width=x&height=200', async () => {
                const response = await request.get('/api/images').query({
                    filename: 'palmtunnel',
                    width: 'x',
                    height: '200',
                })
                expect(response.status).toBe(400)
                expect(response.type).toBe('text/html')
                expect(response.text).toBe('Width must be a valid value.')
            })
        })

        describe('When the width of the image is not defined', () => {
            it('GET api/images?filename=palmtunnel&width=&height=200', async () => {
                const response = await request
                    .get('/api/images')
                    .query({ filename: 'palmtunnel', width: '', height: '200' })
                expect(response.status).toBe(400)
                expect(response.type).toBe('text/html')
                expect(response.text).toBe('Width must be greater than 0.')
            })
        })

        describe('When the height of the image has an invalid character', () => {
            it('GET api/images?filename=palmtunnel&width=200&height=x', async () => {
                const response = await request.get('/api/images').query({
                    filename: 'palmtunnel',
                    width: '200',
                    height: 'x',
                })
                expect(response.status).toBe(400)
                expect(response.type).toBe('text/html')
                expect(response.text).toBe('Height must be a valid value.')
            })
        })

        describe('When the height of the image is not defined', () => {
            it('GET api/images?filename=palmtunnel&width=200&height=', async () => {
                const response = await request
                    .get('/api/images')
                    .query({ filename: 'palmtunnel', width: '200', height: '' })
                expect(response.status).toBe(400)
                expect(response.type).toBe('text/html')
                expect(response.text).toBe('Height must be greater than 0.')
            })
        })
    })

    describe('Tests to process the image', () => {
        it('resizing the image: palmtunnel', async () => {
            const sourceFile = 'images/palmtunnel.jpg'
            const newFile = 'thumb/palmtunnel-200x200-resized-compressed.jpeg'
            const width = 200
            const height = 200
            if (fs.existsSync(newFile)) {
                fs.unlinkSync(newFile)
            }
            const r = await resize.resize(sourceFile, newFile, width, height)
            expect(r).toEqual(true)
        })
    })
})
