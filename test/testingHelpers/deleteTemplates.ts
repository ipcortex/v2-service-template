import { testingPrisma } from "./dbConnection";

export const deleteTemplates = async (templateIds: string[]) => { 
    await testingPrisma.template.deleteMany({
      where: {
        id: {
          in: templateIds
        }
      }
    })
};