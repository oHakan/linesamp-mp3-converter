import { Router } from "express";
import MainController from "../controllers/mainController";

export const MainRouter: Router = Router();

const mainController = new MainController();

MainRouter.get('/hello', mainController.hello)