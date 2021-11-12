import request  from "supertest";
import express from "express";
import characters from "../character.js";
const app = express();
app.use('/api/v1/characters/', characters);

describe('Test URL Character js routes', () => {
    it('Should access the /list route',  () => {
        const res = request(app).get('/characters/list');
        expect(res.redirects().url).toContain('/characters/list');
        expect(res.redirects()).toHaveProperty('method', 'GET');
        res.expect('Content-Type', /json/);
    });
})
