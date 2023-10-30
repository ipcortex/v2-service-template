// uncomment below and import the defined DTO
import /*UpsertDTO*/ "../dtos/UpsertDTO";
// uncomment below and import the model you defined in the prisma schema
import { /*type DefinedPrismaModel,*/ PrismaClient } from "@prisma/client";
// import { plainToClass } from 'class-transformer';

// rename according to defined prisma model
// also rename this file accordingly
class DefinedPrismaModelDAO {
  prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = new PrismaClient();
  }
  // below are just examples of data handlers
  /*
    async add (definedPrismaModel: UpsertDTO): Promise<DefinedPrismaModel> {
        const {
            list,
            of,
            needed,
            fields
        } = plainToClass(UpsertDTO, definedPrismaModel);

        return await this.prismaClient.definedPrismaModel.create({
            data: {
                list,
                of,
                needed,
                fields
            },
        });
    }

    async getById (id: string): Promise<DefinedPrismaModel> {
        return await this.prismaClient.definedPrismaModel.findFirstOrThrow({
            where: { 
                id 
            },
        });
    }
    */
}
// rename according to defined prisma model
export const definedPrismaModelDAO = new DefinedPrismaModelDAO();
