import { responseHandler } from "../services/response.service.js";
import {api} from '../services/api.service.js';
import {utils} from '../services/utils.service.js';

export const moviesController = {
    list: async (req, res) => {
        try {
            const response = await api.get(process.env.GET_MOVIES);
            if (response) {
                const formattedMovies = await utils.formatMovies(response.results);
                responseHandler.sendSuccess(res, 200, 'Movies fetched successfully!',
                    utils.sortByReleaseDate(formattedMovies));
            } else {
                responseHandler.sendError(res, 400, 'FAILURE', 'Unable to list movies');
            }
        } catch (e) {
          responseHandler.sendError(
              res,
             400,
             'FAILURE',
             'Error while fetching movies',
              e
            );
        }
    }
};
