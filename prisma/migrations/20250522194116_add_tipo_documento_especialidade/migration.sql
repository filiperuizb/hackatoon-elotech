/*
  Warnings:

  - You are about to drop the column `conselho_numero` on the `profissional_saude` table. All the data in the column will be lost.
  - You are about to drop the column `conselho_tipo` on the `profissional_saude` table. All the data in the column will be lost.
  - You are about to drop the column `especialidade` on the `profissional_saude` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `profissional_saude` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "profissional_saude" DROP COLUMN "conselho_numero",
DROP COLUMN "conselho_tipo",
DROP COLUMN "especialidade",
ADD COLUMN     "data_nascimento" DATE,
ADD COLUMN     "documento_numero" VARCHAR(20),
ADD COLUMN     "especialidade_id" UUID,
ADD COLUMN     "tipo_documento_id" UUID;

-- CreateTable
CREATE TABLE "tipo_documento" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nome" TEXT NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "tipo_documento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "especialidade" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nome" TEXT NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "especialidade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tipo_documento_nome_key" ON "tipo_documento"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "especialidade_nome_key" ON "especialidade"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "profissional_saude_email_key" ON "profissional_saude"("email");

-- AddForeignKey
ALTER TABLE "profissional_saude" ADD CONSTRAINT "profissional_saude_tipo_documento_id_fkey" FOREIGN KEY ("tipo_documento_id") REFERENCES "tipo_documento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profissional_saude" ADD CONSTRAINT "profissional_saude_especialidade_id_fkey" FOREIGN KEY ("especialidade_id") REFERENCES "especialidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;
