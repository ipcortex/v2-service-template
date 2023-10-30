"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.definedPrismaModelDAO = void 0;
// uncomment below and import the model you defined in the prisma schema
const client_1 = require("@prisma/client");
// rename according to defined prisma model
// also rename this file accordingly
class DefinedPrismaModelDAO {
    constructor() {
        this.prismaClient = new client_1.PrismaClient();
    }
}
// rename according to defined prisma model
exports.definedPrismaModelDAO = new DefinedPrismaModelDAO();
