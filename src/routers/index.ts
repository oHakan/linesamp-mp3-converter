import { Router } from "express";
import { convertRouter } from "./convertRouter";

export const indexRouter: Router = Router();

indexRouter.use('/converter', convertRouter);
