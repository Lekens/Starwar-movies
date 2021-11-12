import { responseHandler } from "../services/response.service.js";
import {utils} from '../services/utils.service.js';
import Comment from '../models/comment.model.js';

export const commentController = {
    list: async (req, res) => {
        try {
            const { title } = req.params;
            if(!title) {
                responseHandler.sendError(
                    res,
                    400,
                    'FAILURE',
                    'Provide valid movie title.'
                );
            }
            utils.listComments(title, (response) => {
                if(response && response.code === '01') {
                    responseHandler.sendSuccess(res, 200, 'Movie comments fetched successfully!',
                        response.comments || []);
                } else {
                    responseHandler.sendError(
                        res,
                        400,
                        'FAILURE',
                        'Error while fetching movie comments'
                    );
                }
            });

        } catch (e) {
            responseHandler.sendError(
                res,
                500,
                'FAILURE',
                'Error while fetching all comments',
                e
            );
        }
    },
    saveComment: async (req, res) => {
        try {
            const { comment, title } = req.body;
            if(!title || !comment) {
                responseHandler.sendError(
                    res,
                    400,
                    'FAILURE',
                    'Provide valid movie title and comment.'
                );
            }
            if(comment && comment.length > 500) {
                responseHandler.sendError(
                    res,
                    400,
                    'FAILURE',
                    'Comment is limited to 500 characters'
                );
            }

            const newComment = new Comment({
                movie_title: title,
                comment: comment,
                date: new Date(),
                commenter_ip: req.socket.remoteAddress || req.headers['x-forwarded-for']
            });

            Comment.create(newComment, (err, data) => {
                if (err){
                    responseHandler.sendError(
                        res,
                        400,
                        'FAILURE',
                        'Unable to save comment',
                        err
                    );
                } else {
                    responseHandler.sendSuccess(res, 201, 'Comment saved successfully!',
                        data || {});
                }
            });
        } catch (e) {
            responseHandler.sendError(
                res,
                500,
                'FAILURE',
                'Error while fetching saving comment',
                e
            );
        }
    },
    deleteComments: async (req, res) => {
        try {
            const { title } = req.params;
            if(!title) {
                responseHandler.sendError(
                    res,
                    400,
                    'FAILURE',
                    'Provide valid movie title.'
                );
            }
            Comment.deleteAllByTitle(title, (response) => {
                if(response && response.code === '01') {
                    responseHandler.sendSuccess(res, 200, 'Movie comments deleted successfully!',
                        response.comments || []);
                } else {
                    responseHandler.sendError(
                        res,
                        400,
                        'FAILURE',
                        response.message || 'Error while deleting movie comments'
                    );
                }
            });

        } catch (e) {
            responseHandler.sendError(
                res,
                500,
                'FAILURE',
                'Error while deleting all comments',
                e
            );
        }
    },

};
