import { type Express } from 'express';
import { CommonRoutesConfig } from '@ipcortex/commons';
import { ServiceTemplateController } from '../controllers/ServiceTemplateController';

export class ServiceTemplateRoutes extends CommonRoutesConfig {
  constructor(app: Express) {
    super(app, 'ServiceTemplateRoutes');
  }

  configureRoutes(): Express {
    const serviceTemplateController = new ServiceTemplateController();
    // below are some examples of route handlers

    this.app.route('/helloworld').get(serviceTemplateController.helloWorld);

    /*
        this.app
            .route('/endpoints')
            .post(
                validateRequest(UpsertDTO),
                serviceController.upsert
            );

        this.app.route('/endpoints/:enpointId')
            .get(
                serviceController.get
        );
        */
    return this.app;
  }
}
