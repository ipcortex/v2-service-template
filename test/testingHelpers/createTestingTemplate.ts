import { Template, TemplateType, Prisma } from ".prisma/client";
import { testingPrisma } from "./dbConnection";


export const createTestingTemplate = async (templateType: TemplateType): Promise<Template> => {
  const data: Prisma.TemplateCreateInput = {
    parentId: "a020cd53-c518-4338-ba69-9d3c37d22892",
    name: "Test Template",
    type: templateType
  };

  return await testingPrisma.template.create({
    data
  });
};