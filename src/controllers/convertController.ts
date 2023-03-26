import { Request, Response } from "express";
import ConvertService from "../services/convertService";
import { extractVideoID } from "../utils/regex/extract-video-id";

export default class ConvertController {
    private convertService: ConvertService;

    constructor() {
        this.convertService = new ConvertService();
    }

    async convertToMp3(req: Request, res: Response) : Promise <Response> {
        try {
            const videoLink = req.body.videoLink;
            const validateVideoId = extractVideoID(videoLink);

            if(!validateVideoId) {
                return res.status(404).json({message: 'Invalid Link!'});
            }

            const convertedFilePath = await this.convertService.downloadMp3(validateVideoId);

            if(!convertedFilePath) {
                return res.status(404).json({message: 'An error orucced on youtube download service. Please contact with our developers.'});
            }

            return res.status(200).json({message: convertedFilePath});
        } catch (e) {
            console.log(e);
            return res.status(404).json({message: e});
        }
    }
}