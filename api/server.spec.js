const request = require ('supertest');
const server = require ('./server');

const db = require('../database/dbConfig');

describe ('the server', () => {

    it ('test is running', () => {
        return request(server).get('/')
        .then(res => {
            expect(res.type).toBe('text/html');
        });
       
    })

    describe('GET /api', () => {
        it('returns a 200 response', async () => {
            const res = await request(server).get('/');
            expect(res.status).toBe(200);
        })
    })


});
        
