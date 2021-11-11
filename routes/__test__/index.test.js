import request  from "supertest";
import express from "express";
import router from "../index.js";
const app = express();
app.use('/', router);

describe('Test Index js routes', () => {
    it('Should access route with invalid code',  () => {
        const cb = jest.fn();
        const res = request(app).get('/hello', cb());
        expect(res.redirects().url).toContain('/hello');
        expect(res.redirects()).toHaveProperty('method', 'GET');
        res.expect('Content-Type', 'text/html')
            .expect('Content-Length', '15')
            .expect(200);
    });
    it('Should access the / route',  () => {
        const res = request(app).get('/');
        expect(res.redirects().url).toContain('/');
        expect(res.redirects()).toHaveProperty('method', 'GET');
        res.expect('Content-Type', 'text/html');
    });
})
