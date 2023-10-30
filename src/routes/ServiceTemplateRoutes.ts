import { type Express } from 'express';
import { CommonRoutesConfig } from '@ipcortex/commons';
import { ServiceTemplateController } from '../controllers/ServiceTemplateController';

export class ServiceTemplateRoutes extends CommonRoutesConfig {
  constructor(app: Express) {
    super(app, 'ServiceTemplateRoutes');
  }

  // 1. get helloworld. Returns 'helloworld' as a string
  // 2. post helloworld. Expects a name...saves this name to the database with an id.
  // responds with the appropriate status code for 'created'
  // 3. get helloworld/id. Returns 'helloworld' + name associated with this id
  // 4. post helloworld/id. Updates the name associated with the given id in the database.

  // In order to carry out the above requests, you will need to edit the DAOs, model and controller.
  // You will need to delete and redo the UpsertDTO
  // You will also need to create a prismaschema for the database

  // update the docs to be in line with these end points you are creating

  // make each request a pull request. Take one by one

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
