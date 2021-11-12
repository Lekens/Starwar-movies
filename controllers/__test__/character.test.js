import {characterController} from '../character.js';
import {mockResponse2} from '../../testUtils.js';

describe('Character controller test', () => {
    const mockRequest = {
        headers: {
            authorization: 'asds'
        }
    };
    const mockResponse = mockResponse2({});
    test('List api test', async () => {
        // expect(await characterController.list(mockRequest, mockResponse)).toBeCalledTimes(1);
    });
})
