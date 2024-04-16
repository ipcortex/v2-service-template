/*
  Warnings:

  - Added the required column `parent_id` to the `templates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "templates" ADD COLUMN     "parent_id" UUID NOT NULL;
