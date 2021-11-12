import express from "express";
import { commentController } from '../controllers/comment.js';
import { controllerService } from '../services/controller.service.js';
const commentsRouter = express.Router();

commentsRouter.route(`/:title`)
    .get(
        (req, res, next) => controllerService.checkApiKey(req, res, next),
        (req, res, next) => commentController.list(req, res))
    .post(
        (req, res, next) => controllerService.checkApiKey(req, res, next),
        (req, res, next) => commentController.saveComment(req, res))
    .delete(
        (req, res, next) => controllerService.checkApiKey(req, res, next),
        (req, res, next) => commentController.deleteComments(req, res));
commentsRouter.route(`/`)
    .post(
        (req, res, next) => controllerService.checkApiKey(req, res, next),
        (req, res, next) => commentController.saveComment(req, res))

export default commentsRouter;
