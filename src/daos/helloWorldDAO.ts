import { HelloWorldDTO } from './../dtos/HelloWorldDTO';
import { PrismaClient } from '@prisma/client';
import { plainToClass } from 'class-transformer';

class helloWorldDAO {
  prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = new PrismaClient();
  }

  async createHelloWorld(helloWorldExample: HelloWorldDTO): Promise<any> {
    const { name } = plainToClass(HelloWorldDTO, helloWorldExample);

    return await this.prismaClient.helloWorld.create({
      data: {
        name,
      },
    });
  }
}

export const HelloWorldDAO = new helloWorldDAO();
