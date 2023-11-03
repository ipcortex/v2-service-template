import { type Express } from 'express';
import { CommonRoutesConfig, validateRequest } from '@ipcortex/commons';
import { HelloWorldDTO } from '../dtos/HelloWorldDTO';
import { ServiceTemplateController } from '../controllers/ServiceTemplateController';

export class ServiceTemplateRoutes extends CommonRoutesConfig {
  constructor(app: Express) {
    super(app, 'ServiceTemplateRoutes');
  }

  configureRoutes(): Express {
    const serviceTemplateController = new ServiceTemplateController();

    this.app
      .route('/helloWorld')
      .get(serviceTemplateController.getHelloWorld)
      .post(
        validateRequest(HelloWorldDTO),
        serviceTemplateController.postHelloWorld,
      );

    this.app
      .route('/helloWorld/:id')
      .get(serviceTemplateController.getHelloWorldById)
      .post(
        validateRequest(HelloWorldDTO),
        serviceTemplateController.postHelloWorld,
      )
      .patch(serviceTemplateController.updateHelloWorldById);

    return this.app;
  }
}
