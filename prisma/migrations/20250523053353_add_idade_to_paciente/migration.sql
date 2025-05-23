/*
  Warnings:

  - Added the required column `idade` to the `paciente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "paciente" ADD COLUMN     "idade" INTEGER NOT NULL;
