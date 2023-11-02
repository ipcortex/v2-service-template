import { Request, Response } from 'express-serve-static-core';
import { Logger } from '@ipcortex/commons';
// import { plainToInstance } from 'class-transformer';
// import { validate } from 'class-validator';
// import { HelloWorldDTO } from '../dtos/HelloWorldDTO';
import { ServiceModel } from '../model/ServiceModel';
import { HttpError } from '@ipcortex/commons';

export class ServiceTemplateController {
  private logger = Logger('service-template-v2:ServiceTemplateController.ts');
  public serviceModel;

  constructor() {
    this.serviceModel = new ServiceModel();
  }

  getHelloWorld = (): string => {
    this.logger.info('Responding with Hello world');
    return this.serviceModel.getHelloWorld();
  };

  postHelloWorld = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = await this.serviceModel.postGetWorld(req.body);
      res.status(201).json({
        status: 'success',
        data,
      });
    } catch (e) {
      this.logger.error(e instanceof Error ? e.message : e);
      throw new HttpError('Server Error', 500, { e });
    }
  };
}
