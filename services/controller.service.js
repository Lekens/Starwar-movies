import { responseHandler } from "./response.service.js";

export const controllerService = {
    checkApiKey: (req, res, next) => {
        try {
          if(req.headers && req.headers.authorization) {
            const apiKey = req.headers.authorization;
            if(!apiKey || apiKey !== process.env.APIKEY) {
                return responseHandler.sendError(
                  res, 401, 'FAILURE', 'Authorization error: Invalid API-KEY',
                );
            } else {
                next();
            }
          } else {
           responseHandler.sendError(
            res,
           401,
           'FAILURE',
           'Authorization header not found in request',
           );
          }
        } catch (error) {
            responseHandler.sendError(
                res,
                500,
                'FAILURE',
                'Unable to check request header!',
            );
        }
    }
};
