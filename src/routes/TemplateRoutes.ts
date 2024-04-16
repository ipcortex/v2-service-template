import { type Express } from 'express';
import { 
    mergeRequestQueryBodyParams, 
    CommonRoutesConfig, 
    validateRequest 
} from '@ipcortex/commons';
import { TemplateController } from '../controllers/TemplateController';
import { UpsertTemplateDTO } from '../dtos/UpsertTemplateDTO';
import { ListTemplatesDTO } from '../dtos/ListTemplateDTO';

export class TemplateRoutes extends CommonRoutesConfig {
    constructor(app: Express) {
        super(app, 'TemplateRoutes');
    }

    configureRoutes(): Express {
        const templatesController = new TemplateController();

        this.app
            .route('/templates')
            .post(
                validateRequest(UpsertTemplateDTO),
                templatesController.addTemplate
            )
            .get(
                mergeRequestQueryBodyParams,
                validateRequest(ListTemplatesDTO),
                templatesController.listTemplates
            );

        this.app.route('/templates/:id')
            .post(
                mergeRequestQueryBodyParams,
                validateRequest(UpsertTemplateDTO),
                templatesController.updateTemplate
            )
            .get(
                mergeRequestQueryBodyParams,
                templatesController.getTemplate
            );
        
        return this.app;
    }
}