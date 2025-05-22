/*
  Warnings:

  - Added the required column `senha` to the `profissional_saude` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "profissional_saude" ADD COLUMN     "senha" TEXT NOT NULL;
