import ConvertService from "./convertService";
import cron from 'node-cron';
import fs from 'fs';
import { CronTime } from "../utils/enums/cronTime";

export default class CronService {
    public deleteOutdatedConvertedFiles() {
        const fileList = ConvertService.fileList;
        const currentDate = new Date().getTime();

        console.log(fileList)

        for (const file of fileList) {
            if(file.willDeleteTime < currentDate) {
                try {
                    fs.unlinkSync(file.file);


                    ConvertService.fileList = fileList.filter(fileObj => fileObj.file !== file.file);

                    console.log(file)
                } catch (e) {
                    console.log(e);
                }
            }
        }
    }

    public startCronService() {
        try {
            const task = cron.schedule(CronTime.Every30Seconds, this.deleteOutdatedConvertedFiles);

            task.start();
        } catch (e) {
            console.log(e);
        }
    }
}