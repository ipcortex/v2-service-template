import { UpsertTemplateDTO } from '../dtos/UpsertTemplateDTO';
import { ListTemplatesDTO } from '../dtos/ListTemplateDTO';
import { templatesDAO, ExtendedTemplate } from '../daos/TemplatesDAO';

export class TemplateModel {
  
  async addTemplate(template: UpsertTemplateDTO): Promise<ExtendedTemplate> {
    return await templatesDAO.addTemplate(template);
  }

  async updateTemplate(template: UpsertTemplateDTO): Promise<ExtendedTemplate> {
      return await templatesDAO.updateTemplate(template);
  }

  async getTemplate(id: string) : Promise<ExtendedTemplate> {
      return await templatesDAO.getTemplateById(id);
  }

  async listTemplates({ page, pageSize, params, orderBy }: ListTemplatesDTO): Promise<{ templates: ExtendedTemplate[], pagesAvailable: number, results: number }> {
      return await templatesDAO.listTemplates(pageSize, params, orderBy, page);
  }
}