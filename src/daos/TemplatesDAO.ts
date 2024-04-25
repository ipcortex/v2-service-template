import { UpsertTemplateDTO } from '../dtos/UpsertTemplateDTO';
import { Prisma, type Template, PrismaClient } from '@prisma/client';
import { plainToClass } from 'class-transformer';

export interface ExtendedTemplate extends Template {
    parentTemplateName?: string;
}

class TemplatesDAO {
    prismaClient: PrismaClient;

    constructor () {
        this.prismaClient = new PrismaClient();
    }

    async addTemplate(templateToAdd: UpsertTemplateDTO): Promise<Template> {
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

    async getTemplateById (id: string): Promise<Template> {
        return await this.prismaClient.template.findFirstOrThrow({where: { 
                id 
            }
        });
    } 

    async getTotalEndpointsEntries (params?: Prisma.TemplateWhereInput): Promise<number> {
        return await this.prismaClient.template.count({where: params});
    }

    async listTemplates (
        pageSize: number, page: number, 
        params?: Prisma.TemplateWhereInput, orderBy?: Prisma.TemplateOrderByWithRelationInput
    ): Promise<Template[]> {
          return await this.prismaClient.template.findMany({
              where: { 
                  ...params 
              },
              orderBy,
              take: pageSize,
              skip: pageSize * (page - 1)
          })
      }
}
// rename according to defined prisma model
export const templatesDAO = new TemplatesDAO();