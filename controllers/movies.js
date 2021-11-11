import { responseHandler } from "services/response.service.js";

export const moviesController = {
    list: (req, res) => {
        try {

        } catch (e) {
          responseHandler.sendError(
              res,
             400,
             'FAILURE',
             'Error while fetching all movies',
              e
            );
        }
    }
};
