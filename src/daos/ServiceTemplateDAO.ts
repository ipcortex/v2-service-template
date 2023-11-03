import { HelloWorldDTO } from '../dtos/HelloWorldDTO';
import { PrismaClient } from '@prisma/client';
import { plainToClass } from 'class-transformer';

class helloWorldDAO {
  prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = new PrismaClient();
  }

  getHelloWorld(): string {
    return 'Hello world';
  }

  async createHelloWorld(helloWorldExample: HelloWorldDTO): Promise<any> {
    const { name } = plainToClass(HelloWorldDTO, helloWorldExample);

    return await this.prismaClient.helloWorld.create({
      data: {
        name,
      },
    });
  }

  async getHelloWorldById(id: string): Promise<any> {
    return await this.prismaClient.helloWorld.findFirstOrThrow({
      where: {
        id,
      },
    });
  }

  async updateHelloWorldById(
    helloWorldExample: HelloWorldDTO,
    id: string,
  ): Promise<any> {
    return await this.prismaClient.helloWorld.update({
      data: {
        name: helloWorldExample.name,
      },
      where: {
        id,
      },
    });
  }
}

export const HelloWorldDAO = new helloWorldDAO();
