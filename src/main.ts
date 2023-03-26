import dotenv from 'dotenv';

dotenv.config();

import ExpressServer from "./server";
import CronService from './services/cronService';

export const outputPath: string = process.cwd() + '/client/videos/';

function run(){
    const server = new ExpressServer();
    new CronService().startCronService();

    server.start();
}

run();