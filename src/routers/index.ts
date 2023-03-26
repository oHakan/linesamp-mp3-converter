import { Router } from "express";
import { MainRouter } from "./mainRouter";

export const indexRouter: Router = Router();

indexRouter.use('/main', MainRouter);
