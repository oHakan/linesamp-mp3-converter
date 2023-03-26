import ytdl from 'ytdl-core';
import fs from 'fs';
import { outputPath } from '../main';
import { deleteTime } from '../utils/enums/deleteTime';

export interface ConvertedFile {
    file: string,
    generatedTime: number,
    willDeleteTime: number
};

export default class ConvertService {
    private mainLinkPath: string = 'https://www.youtube.com/watch?v=';
    public static fileList: ConvertedFile[] = [];

    public async downloadMp3(videoId: string): Promise <Boolean> {
        try {
            return new Promise((resolve) => {
                const video = ytdl(this.mainLinkPath + videoId, {filter: 'audioonly'});
                const file = outputPath + videoId + '.mp3';
                const fileExists = this.isFileExists(file);
                const time = new Date().getTime();

                if(fileExists){
                    return resolve(true);
                }

                const process = video.pipe(fs.createWriteStream(file));

                process.on('error', (err) => {
                    console.log(err);
                    return resolve(false);
                });

                process.on('close', () => {
                    return resolve(true);
                })

                ConvertService.fileList.push({
                    file: file,
                    generatedTime: time,
                    willDeleteTime: time + deleteTime.After30Second,
                });
            });
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    public isFileExists(fileDir: string): Boolean {
        try {
            const isExists = fs.existsSync(fileDir);

            if(isExists) {
                return true;
            }

            return false;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}