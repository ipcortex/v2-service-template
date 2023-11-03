import { Request, Response } from 'express-serve-static-core';
import { Logger } from '@ipcortex/commons';
import { HelloWorldModel } from '../model/ServiceTemplateModel';
import { HttpError } from '@ipcortex/commons';

export class ServiceTemplateController {
  private logger = Logger('service-template-v2:ServiceTemplateController.ts');
  public serviceModel;

  constructor() {
    this.serviceModel = new HelloWorldModel();
  }

  getHelloWorld = (): string => {
    this.logger.info('Responding with Hello world');
    return this.serviceModel.getHelloWorld();
  };

  getHelloWorldById = async (req: Request, res: Response): Promise<void> => {
    try {
      this.logger.info('Getting Hello world by ID');
      const data = await this.serviceModel.getHelloWorldById(req.params.id);
      res.status(200).json({
        status: 'success',
        data,
      });
    } catch (e) {
      this.logger.error(e instanceof Error ? e.message : e);
      throw new HttpError('Server Error', 500, { e });
    }
  };

  updateHelloWorldById = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log(req.body);
      this.logger.info('Updating Hello world by ID');
      const data = await this.serviceModel.updateHelloWorldById(
        req.body,
        req.params.id,
      );
      res.status(200).json({
        status: 'success',
        data,
      });
    } catch (e) {
      this.logger.error(e instanceof Error ? e.message : e);
      throw new HttpError('Server Error', 500, { e });
    }
  };

  postHelloWorld = async (req: Request, res: Response): Promise<void> => {
    try {
      this.logger.info('Creating Hello world entry');
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
