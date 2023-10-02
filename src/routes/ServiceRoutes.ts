import { type Express } from 'express';
import { CommonRoutesConfig , validateRequest } from '@ipcortex/commons';
import { ServiceController } from '../controllers/ServiceController';
// uncomment below and import the defined DTO
import { /*UpsertDTO*/ } from '../dtos/UpsertDTO';

export class ServiceRoutes extends CommonRoutesConfig {
    constructor(app: Express) {
        super(app, 'ServiceRoutes');
    }

    configureRoutes(): Express {
        const serviceController = new ServiceController();
        // below are some examples of route handlers
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