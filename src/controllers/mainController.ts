import { Response, Request } from "express"
import MainService from "../services/mainService"

export default class MainController {
    private mainService: MainService

    constructor(){
        this.mainService = new MainService();
    }

    public hello(req: Request, res: Response): Response{
        const hello = this.mainService.hello();

        return res.send(hello);
    }
}