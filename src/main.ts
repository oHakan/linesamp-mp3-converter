import dotenv from 'dotenv';

dotenv.config();

import ExpressServer from "./server";

export const outputPath: string = process.cwd() + '/output/';

function run(){
    const server = new ExpressServer();

    server.start();
}

run();