import express from 'express';
import bodyParser from 'body-parser';
import { indexRouter } from './routers';

export default class ExpressServer {
    private server: express.Application;
    private port: number = Number(process.env.PORT);

    constructor(){
        this.server = express();
    }

    private config(){
        this.server.use(bodyParser.urlencoded({
            extended: true
        }));
        this.server.use(bodyParser.json());
        this.server.use(indexRouter);
    }

    public start(){
        try {
            this.config();
            this.server.listen(this.port);
            console.log('Express Server Has Started!')
        } catch (e) {
            console.log(e);
        }
    }
}