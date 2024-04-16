import { PrismaClient } from "@prisma/client";

export const testingPrisma = new PrismaClient();

export const disconnectPrisma = testingPrisma.$disconnect;