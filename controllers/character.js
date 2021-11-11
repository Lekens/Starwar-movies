import { responseHandler } from "../services/response.service.js";
import {api} from '../services/api.service.js';
import {utils} from '../services/utils.service.js';

export const characterController = {
    list: async (req, res) => {
        try {
            // sortBy = name, height, gender
            // order = ascending, descending, asc, ascend, desc
            // filterValue = male, female, n/a
            const { sortBy, order, filterValue } = req.query;
            if(sortBy) {
                await getCharacters(req, res, filterValue, {sortBy, order});
            } else {
                await getCharacters(req, res, filterValue, null);
            }

        } catch (e) {
            responseHandler.sendError(
                res,
                400,
                'FAILURE',
                'Error while fetching characters',
                e
            );
        }
    }
};
async function getCharacters(req, res, filter = null, sort = null) {
    const page = req.query.page || 1;
    const response = await api.get(`${process.env.GET_CHARACTERS}?page=${page}`);
    if (response) {
        const filterCharacters = await utils.filterCharacters(response.results, filter);
        let characters = filterCharacters;
        if(sort && sort.sortBy) {
            characters = await utils.useSortByCharacters(filterCharacters, sort);
        }
        responseHandler.sendSuccess(res, 200, 'Movies characters fetched successfully!',
            utils.addMetaDataToCharacters(characters));
    } else {
        responseHandler.sendError(res, 400, 'FAILURE', 'Unable to list characters');
    }
}
