import { Template } from ".prisma/client";
import { testingPrisma } from "./dbConnection";


export const createTestingTemplate = async (template: any): Promise<Template> => {
  return await testingPrisma.template.create({
    data: template
  });
};