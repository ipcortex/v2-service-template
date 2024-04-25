import { Prisma, Template } from '@prisma/client';
import { HttpError } from '@ipcortex/commons';
import { UpsertTemplateDTO } from '../dtos/UpsertTemplateDTO';
import { ListTemplatesDTO } from '../dtos/ListTemplateDTO';
import { templatesDAO } from '../daos/TemplatesDAO';

export class TemplateModel {
  
  async addTemplate(template: UpsertTemplateDTO): Promise<Template> {
    return await templatesDAO.addTemplate(template);
  }

  async updateTemplate(template: UpsertTemplateDTO): Promise<Template> {
      return await templatesDAO.updateTemplate(template);
  }

  async getTemplate(id: string) : Promise<Template> {
      return await templatesDAO.getTemplateById(id);
  }

  async listTemplates(
    page: number, pageSize: number,
    params?: Prisma.TemplateWhereInput, orderBy?: Prisma.TemplateOrderByWithRelationInput) {
    const resultCount = await templatesDAO.getTotalTemplatesEntries(params);
    const pagesAvailable = Math.ceil(resultCount / pageSize);

    if(page > pagesAvailable) {
      throw new HttpError(`No templates on page ${page}. Only ${pagesAvailable} pages are available`, 404);
    }

    const sortBy: Prisma.TemplateOrderByWithRelationInput[] = [];

    for (const key in orderBy) {
      sortBy.push({
        [key]: orderBy[key as keyof Prisma.TemplateOrderByWithRelationInput]
      });
    }

    const results = await templatesDAO.listTemplates(pageSize, page, params, orderBy);

    if(!results.length) {
      throw new HttpError(`No endpoints found`, 404);
    }

    return {templates: results, page, pageSize, resultCount: resultCount, pagesAvailable};
  }
}