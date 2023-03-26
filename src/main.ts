import dotenv from 'dotenv';

dotenv.config();

import ExpressServer from "./server";

function run(){
    const server = new ExpressServer();

    server.start();
}

run();