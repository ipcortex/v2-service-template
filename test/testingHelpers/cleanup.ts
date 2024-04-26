import { deleteTemplates } from './deleteTemplates';

export const createdTemplates: string[] = [];

export async function cleanup() {
    process.stdout.write("  Running cleanup...\n");
    await deleteTemplates(createdTemplates);
    process.stdout.write("  Cleanup completed.\n");
}