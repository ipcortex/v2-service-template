import { Template } from ".prisma/client";
import { Prisma } from "@prisma/client";
import { testingPrisma } from "./dbConnection";


export const createTestingTemplate = async (template?: Partial<Prisma.TemplateCreateInput>): Promise<Template> => {
  const data: Prisma.TemplateCreateInput = {
    parentId: 'a020cd53-c518-4338-ba69-9d3c37d22892',
    name: 'Template 1',
    type: 'TEMPLATE_A',
    ...template
  };
  
  return await testingPrisma.template.create({
    data
  });
};