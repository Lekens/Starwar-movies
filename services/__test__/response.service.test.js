import {mockRequest, mockResponse, mockResponse2} from "../../testUtils.js";
import {responseHandler} from "../response.service.js";

describe('responseHandler: response service test', () => {
    it('sendError: with 400 error code', () => {
        const res = mockResponse2();
        const actual = responseHandler
            .sendError(res, 400, 'FAILURE', 'Not found error', new Error());
        expect(actual.json)
            .toBeCalledTimes(1);
        expect(actual.json).toBeCalledWith({
                'code': 400,
                'error': null,
                'message': 'Not found error',
                'status': 'FAILURE'
        });
    })
    it('sendSuccess: with 200 code', () => {
        const res = mockResponse2();
        const data = [{
            name: 'Test', description: 'Just to test a data value'
        }];
        const actual = responseHandler
            .sendSuccess(res, 200, 'Data fetched successfully!', data);
        expect(actual.json)
            .toBeCalledTimes(1);
        expect(actual.json).toBeCalledWith({
                'code': 200,
                'message': 'Data fetched successfully!',
                'status': 'SUCCESS',
                'data': data
        });
    });
    it('sendSuccess: with null code', () => {
        const res = mockResponse2();
        const data = [{
            name: 'Test', description: 'Just to test a data value'
        }];
        const actual = responseHandler
            .sendSuccess(res, null, 'Data fetched successfully!', data);
        expect(actual.json)
            .toBeCalledTimes(1);
        expect(actual.json).toBeCalledWith({
                'code': 200,
                'message': 'Data fetched successfully!',
                'status': 'SUCCESS',
                'data': data
        });
    });
});
