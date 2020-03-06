const request = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig');

describe ('This is a restful database', () => {
    beforeEach(async () => { 
		await  db('users').truncate();
    });

    describe ('Post/register', () => {
        it('should return status 200', () => { 
        request(server)
            .post('/api/auth/register')
            .send({
                firstName: 'Katrina', 
                lastName: 'Dierking', 
                email: 'kl@gmail.com', 
                password: 'cook'
            })
            .expect(201);
        })

        it ('should return a json obj', () => {
            request(server)
            .post('/api/auth/register')
            .send({
                firstName: 'Katrina', 
                lastName: 'Dierking', 
                email: 'kl@gmail.com', 
                password: 'cook'
            })
            .expect('content-type', /json/)
        })
    });

    describe ('Post/login', () => {
        it('should return a 200 response', async() => {
            request(server)
                .post('/api/auth/login')
                .send({
                    firstName: 'Katrina', 
                    lastName: 'Dierking', 
                    email: 'kl@gmail.com', 
                    password: 'cook'
                })
                .expect(200)
        })

        it ('should return a json obj', () => {
            request(server)
            .post('/api/auth/login')
            .send({
                firstName: 'Katrina', 
                lastName: 'Dierking', 
                email: 'kl@gmail.com', 
                password: 'cook'
            })
            .expect('content-type', /json/)
        })
    })

    describe('GET /', () => {
        it ('should return a 401 response', () => {
            request(server)
                .get('/api/auth')
                .expect(401)
        })
    });
});