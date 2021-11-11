import { controllerService } from "../controller.service";
import { mockNext, mockRequest, mockResponse } from "../../testUtils";

describe('Test controllerService', () => {
    it('checkApiKey should return 401 if key not correct', async () => {
        const req = mockRequest({
         headers: { authorization: '223333333333333333333'},
        });
        const resMock = {
            msg: 'Authorization error: Invalid API-KEY',
            code: '401'
        }
        const res = mockResponse(resMock);
        const next = mockNext();
        await controllerService.checkApiKey(req, res, next);
        expect(res.status).toBeInstanceOf(Function);
        expect(res.code).toBe('401');
        expect(res.msg).toBe('Authorization error: Invalid API-KEY');

    })
    it('Return error when no header provided', async () => {
        const req = mockRequest({
         body: {  },
        });
        const resMock = {
            msg: 'Authorization header not found in request',
            code: '401'
        }
        const res = mockResponse(resMock);
        const next = mockNext();
        await controllerService.checkApiKey(req, res, next);
        expect(res.status).toBeInstanceOf(Function);
        expect(res.code).toBe('401');
        expect(res.msg).toBe('Authorization header not found in request');

    })
    it('Return next once correct api is set', async () => {
        const req = mockRequest({
         headers: { authorization: 'test-api-key-sample' },
        });
        const resMock = {};
        const res = mockResponse(resMock);
        const next = mockNext();
        const a = await controllerService.checkApiKey(req, res, next);
        expect(a).toHaveProperty('send');
    })
});
