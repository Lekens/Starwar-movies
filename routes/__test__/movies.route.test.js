import request  from "supertest";
import express from "express";
import movies from "../movies.js";
const app = express();
app.use('/api/v1/', movies);

describe('Test URL Router js routes', () => {
    it('Should access the /movies/list route',  () => {
        const res = request(app).get('/movies/list');
        expect(res.redirects().url).toContain('/movies/list');
        expect(res.redirects()).toHaveProperty('method', 'GET');
        res.expect('Content-Type', /json/);
    });
})
