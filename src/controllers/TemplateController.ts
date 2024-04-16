import { Request, Response } from 'express';
import { TemplateModel } from '../model/TemplateModel'
import { ListTemplatesDTO } from '../dtos/ListTemplateDTO';
import { plainToInstance } from 'class-transformer';

export class TemplateController {
    public templateModel;

    constructor() {
        this.templateModel = new TemplateModel();
    }

    addTemplate = async (req: Request, res: Response): Promise<void> => {
        const result = await this.templateModel.addTemplate(req.body);
        res.status(201).json(result);
    }

    updateTemplate = async (req: Request, res: Response): Promise<void> => {
        const result = await this.templateModel.updateTemplate(req.body);
        res.status(200).json(result);
    }

    getTemplate = async (req: Request, res: Response): Promise<void> => {
        const result = await this.templateModel.getTemplate(req.body.id);
        res.status(200).json(result);
    }

    listTemplates = async (req: Request, res: Response): Promise<void> => {
        const result = await this.templateModel.listTemplates(
            plainToInstance(ListTemplatesDTO, req.body, { exposeUnsetFields: false })
        );
        res.status(200).json(result);
    }

}