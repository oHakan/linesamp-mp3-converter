import { Router } from "express";
import ConvertController from "../controllers/convertController";

export const convertRouter: Router = Router();

const convertController = new ConvertController();

convertRouter.post('/convert', convertController.convertToMp3.bind(convertController));