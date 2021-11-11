import { successResponse } from '../interfaces/response.js';
import { errorResponse } from "../interfaces/error.js";

export const responseHandler = {

    sendError: (res, code, status, message, error) => {
        const err = new Error(message);
        errorResponse.status = status;
        errorResponse.code = code;
        errorResponse.message = message;
        error ? err.ERROR = error : null;
        return res.status(code).json(errorResponse);
        },

    sendSuccess: (res, code, message, data) => {
        successResponse.data = data;
        successResponse.message = message;
        if(code){
            successResponse.code = code;
        }
        return res.json(successResponse);
    }
};
