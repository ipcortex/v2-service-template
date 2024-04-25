import { disconnectPrisma } from './dbConnection';
import { deleteTemplates } from './deleteTemplates';

export const createdTemplates: string[] = [];

export async function cleanup() {
    process.stdout.write("Running cleanup...\n");
    await deleteTemplates(createdTemplates);
    disconnectPrisma();
    process.stdout.write("Cleanup completed.\n");
}