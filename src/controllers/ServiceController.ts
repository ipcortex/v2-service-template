import { Request, Response } from 'express';
import { Logger, HttpError } from "@ipcortex/commons"
import { ServiceModel } from '../model/ServiceModel'

// change the service name here
const logger = Logger("service-template-v2:ServiceController.ts");

export class ServiceController {
    public serviceModel;

    constructor() {
        this.serviceModel = new ServiceModel();
    }

    // The following are just examples of service route handlers 

    /*
    upsert = async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await this.serviceModel.upsert(req.body);
            res.status(200).json(result);
        } catch (e) {
            logger.error(e instanceof Error ? e.message : e);
            throw new HttpError('Server Error', 500, {e});
        }
    }

    get = async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await this.serviceModel.get(req.body.id);
            res.status(200).send(result);
        } catch (e) {
            logger.error(e instanceof Error ? e.message : e);
            throw new HttpError('Server Error', 500, {e});
        }
    }
    */
}