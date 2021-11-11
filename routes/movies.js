import express from "express";
import { moviesController } from '../controllers/movies.js';
import { controllerService } from '../services/controller.service.js';
const moviesRouter = express.Router();

moviesRouter.route(`/list`)
    .get(
        (req, res, next) => controllerService.checkApiKey(req, res, next),
        (req, res, next) => moviesController.list(req, res));
export default moviesRouter;
