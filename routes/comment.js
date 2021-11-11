import express from "express";
import { commentController } from '../controllers/comment.js';
import { controllerService } from '../services/controller.service.js';
const commentsRouter = express.Router();

commentsRouter.route(`/list`)
    .get(
        (req, res, next) => controllerService.checkApiKey(req, res, next),
        (req, res, next) => commentController.list(req, res));
export default commentsRouter;
