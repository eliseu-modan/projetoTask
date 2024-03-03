/*
  Warnings:

  - Added the required column `dataConcluided` to the `CreateMessages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CreateMessages" ADD COLUMN     "dataConcluided" TIMESTAMP(3) NOT NULL;
