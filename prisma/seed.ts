import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

async function seed() {
    await prisma.template.upsert({
        where: {id: "a020cd53-c518-4338-ba69-9d3c37d22892"},
        update: {},
        create: {
            id: "a020cd53-c518-4338-ba69-9d3c37d22892",
            parentId: 'a020cd53-c518-4338-ba69-9d3c37d22892',
            type: 'TEMPLATE_A',
            name: "Seeded first Template"
        }
    })  
};

seed()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    });