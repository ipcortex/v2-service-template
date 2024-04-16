import { UpsertTemplateDTO } from '../dtos/UpsertTemplateDTO';
import { Prisma, type Template, PrismaClient } from '@prisma/client';
import { HttpError } from '@ipcortex/commons';
import { plainToClass } from 'class-transformer';

export interface ExtendedTemplate extends Template {
    parentTemplateName?: string;
}

class TemplatesDAO {
    prismaClient: PrismaClient;

    constructor () {
        this.prismaClient = new PrismaClient();
    }

    async addTemplate(templateToAdd: UpsertTemplateDTO): Promise<ExtendedTemplate> {
        const {
            parentId,
            name,
            type
        } = plainToClass(UpsertTemplateDTO, templateToAdd);

        // insert the Template
        const addedTemplate = await this.prismaClient.template.create({
            data: {
                parentId,
                name,
                type
            },
        });
        return this.getTemplateById(addedTemplate.id);
    }

    async updateTemplate(templateToUpdate: UpsertTemplateDTO): Promise<Template> {
        const { 
            id,
            parentId,
            name,
            type
        } = templateToUpdate;

        const updatedTemplate = await this.prismaClient.template.update({
            data: {                     
                parentId,
                name,
                type
            },
            where: {
                id
            }
        });
        return this.getTemplateById(updatedTemplate.id);
    }

    async getTemplateById (id: string): Promise<ExtendedTemplate> {
        const template = await this.prismaClient.template.findFirstOrThrow({
            where: { 
                id 
            }
        });

        // Fetch parentTemplateName for the template
        const [parentTemplate] = await Promise.all([
            template.parentId
                ? this.prismaClient.template.findFirstOrThrow({
                    where: { id: template.parentId }
                })
                : null
            // Add more queries here for other related entities
        ]);

        return {
            ...template,
            parentTemplateName: parentTemplate?.name || 'Not set'
        };
    } 

    async listTemplates(
        pageSize: number, params?: Prisma.TemplateWhereInput,
        sortBy?: Prisma.TemplateOrderByWithRelationInput, page: number = 1
    ): Promise<{ templates: ExtendedTemplate[], pagesAvailable: number, results: number }> {
        const entriesForQuery = await this.prismaClient.template.count({
            where: { 
                ...params 
            }
        });
  
        const pagesAvailable = Math.ceil(entriesForQuery / pageSize);
  
        if (page > pagesAvailable) {
            throw new HttpError(`No templates on page ${page}. Only ${pagesAvailable} pages are available`, 404);
        }
  
        page = page - 1;
  
        const orderBy = [];
  
        for (const key in sortBy) {
                orderBy.push({
                [key]: sortBy[key as keyof Prisma.TemplateOrderByWithRelationInput]
            });
        }
  
        const templates = await this.prismaClient.template.findMany({
            take: pageSize,
            skip: pageSize * page,
            where: {
            ...params
            },
            orderBy
        });
        
        // Fetch parentTemplateName for each template
        const extendedTemplatesPromises = templates.map(async (template) => {
            const [parentTemplate] = await Promise.all([
                template.parentId
                    ? this.prismaClient.template.findFirstOrThrow({
                        where: { id: template.parentId }
                    })
                    : null
                // Add more queries here for other related entities
            ]);

            return {
                ...template,
                parentTemplateName: parentTemplate?.name || 'Not set'
            };
        });

        const extendedTemplates = await Promise.all(extendedTemplatesPromises);

        return { templates: extendedTemplates, pagesAvailable, results: entriesForQuery };
    }
}
// rename according to defined prisma model
export const templatesDAO = new TemplatesDAO();