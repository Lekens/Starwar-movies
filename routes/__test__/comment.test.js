import request  from "supertest";
import express from "express";
import comment from "../comment.js";
const app = express();
app.use('/api/v1/comments/', comment);

describe('Test URL comment js routes', () => {
    it('Should access the /list route-GET',  () => {
        const res = request(app).get('/comment/hello-world');
        expect(res.redirects().url).toContain('/comment/hello-world');
        expect(res.redirects()).toHaveProperty('method', 'GET');
        res.expect('Content-Type', /json/);
    });
    it('Should access the /hello-world route-POST',  () => {
        const res = request(app).post('/comment/hello-world');
        expect(res.redirects().url).toContain('/comment/hello-world');
        expect(res.redirects()).toHaveProperty('method', 'POST');
        res.expect('Content-Type', /json/);
    });
    it('Should access the /hello-world route-DELETE',  () => {
        const res = request(app).delete('/comment/hello-world');
        expect(res.redirects().url).toContain('/comment/hello-world');
        expect(res.redirects()).toHaveProperty('method', 'DELETE');
        res.expect('Content-Type', /json/);
    });
})
