/*
  Warnings:

  - You are about to drop the `endpoints` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "endpoints";

-- DropEnum
DROP TYPE "EndpointType";

-- CreateTable
CREATE TABLE "HelloWorld" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "HelloWorld_pkey" PRIMARY KEY ("id")
);
