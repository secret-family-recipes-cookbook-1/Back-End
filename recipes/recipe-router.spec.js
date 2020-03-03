const server = require('./recipe-router');
const test = require('supertest');

describe ('GET /', () => {
    it('is testing', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    it('returns an unauthorized response', () => {
        return test(server).get('/')
            .expect(401)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body.api).toBe(undefined)
            })
    })
});