import express from "express";
import { characterController } from 'controllers/character.js';
import { controllerService } from 'services/controller.service.js';
const charactersRouter = express.Router();

charactersRouter.route(`/list`)
    .get(
        (req, res, next) => controllerService.checkApiKey(req, res, next),
        (req, res, next) => characterController.list(req, res));
export default charactersRouter;
