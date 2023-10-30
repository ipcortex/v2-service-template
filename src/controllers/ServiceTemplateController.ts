import { Logger } from '@ipcortex/commons';
import { ServiceModel } from '../model/ServiceModel';

export class ServiceTemplateController {
  public serviceModel;
  private logger = Logger('service-template-v2:ServiceTemplateController.ts');

  constructor() {
    this.serviceModel = new ServiceModel();
  }

  helloWorld = (): string => {
    this.logger.info('Responding with Hello world');
    return 'Hello world';
  };

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
