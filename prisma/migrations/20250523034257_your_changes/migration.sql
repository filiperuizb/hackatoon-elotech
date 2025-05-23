/*
  Warnings:

  - You are about to drop the column `conduta` on the `consulta` table. All the data in the column will be lost.
  - You are about to drop the column `diagnostico` on the `consulta` table. All the data in the column will be lost.
  - You are about to drop the column `sintomas` on the `consulta` table. All the data in the column will be lost.
  - You are about to drop the column `consulta_id` on the `prescricao` table. All the data in the column will be lost.
  - You are about to drop the column `medicamento` on the `prescricao` table. All the data in the column will be lost.
  - You are about to drop the column `posologia` on the `prescricao` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `consulta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `paciente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prontuario_id` to the `prescricao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `prescricao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `profissional_saude` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `template` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `unidade_saude` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "prescricao" DROP CONSTRAINT "prescricao_consulta_id_fkey";

-- AlterTable
ALTER TABLE "consulta" DROP COLUMN "conduta",
DROP COLUMN "diagnostico",
DROP COLUMN "sintomas",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "hora" VARCHAR(5),
ADD COLUMN     "observacoes" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Agendada',
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "paciente" ADD COLUMN     "alergias" TEXT,
ADD COLUMN     "altura" DECIMAL(3,2),
ADD COLUMN     "bairro" TEXT,
ADD COLUMN     "cep" VARCHAR(9),
ADD COLUMN     "cidade" TEXT,
ADD COLUMN     "complemento" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "endereco" TEXT,
ADD COLUMN     "estado" CHAR(2),
ADD COLUMN     "medicamentos_uso" TEXT,
ADD COLUMN     "nome_responsavel" TEXT,
ADD COLUMN     "numero" VARCHAR(10),
ADD COLUMN     "observacoes" TEXT,
ADD COLUMN     "peso" DECIMAL(5,2),
ADD COLUMN     "rg" VARCHAR(20),
ADD COLUMN     "telefone_contato" VARCHAR(20),
ADD COLUMN     "telefone_responsavel" VARCHAR(20),
ADD COLUMN     "tipo_sanguineo" VARCHAR(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "prescricao" DROP COLUMN "consulta_id",
DROP COLUMN "medicamento",
DROP COLUMN "posologia",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "data_fim" TIMESTAMP(3),
ADD COLUMN     "data_inicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dosagem" TEXT,
ADD COLUMN     "frequencia" TEXT,
ADD COLUMN     "medicamento_id" UUID,
ADD COLUMN     "medicamento_nome" TEXT,
ADD COLUMN     "observacoes" TEXT,
ADD COLUMN     "prontuario_id" UUID NOT NULL,
ADD COLUMN     "quantidade" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Ativa',
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "via_administracao" TEXT;

-- AlterTable
ALTER TABLE "profissional_saude" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "template" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "medicamentos_recomendados" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "unidade_saude" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "telefone" VARCHAR(20),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "prontuario" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "paciente_id" UUID NOT NULL,
    "profissional_id" UUID NOT NULL,
    "data_atendimento" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "queixa_principal" TEXT,
    "historia_doenca_atual" TEXT,
    "historia_patologica" TEXT,
    "historia_familiar" TEXT,
    "historia_social" TEXT,
    "exame_fisico" TEXT,
    "pressao_arterial" VARCHAR(10),
    "frequencia_cardiaca" VARCHAR(10),
    "temperatura" VARCHAR(10),
    "peso_atual" DECIMAL(5,2),
    "altura_atual" DECIMAL(3,2),
    "hipotese_diagnostica" TEXT,
    "diagnostico_definitivo" TEXT,
    "conduta" TEXT,
    "observacoes" TEXT,
    "retorno" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prontuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipo_procedimento" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nome" TEXT NOT NULL,
    "categoria" TEXT,
    "descricao" TEXT,
    "valor" DECIMAL(10,2),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tipo_procedimento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "procedimento" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tipo_procedimento_id" UUID NOT NULL,
    "nome" TEXT NOT NULL,
    "codigo" TEXT,
    "descricao" TEXT,
    "valor_padrao" DECIMAL(10,2),
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "procedimento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "procedimento_realizado" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "prontuario_id" UUID NOT NULL,
    "procedimento_id" UUID NOT NULL,
    "data_realizacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "observacoes" TEXT,
    "valor" DECIMAL(10,2),
    "status" TEXT NOT NULL DEFAULT 'Realizado',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "procedimento_realizado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medicamento" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nome" TEXT NOT NULL,
    "principio_ativo" TEXT,
    "concentracao" TEXT,
    "forma_farmaceutica" TEXT,
    "fabricante" TEXT,
    "codigo_barras" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "medicamento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tipo_procedimento_nome_key" ON "tipo_procedimento"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "procedimento_codigo_key" ON "procedimento"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "medicamento_nome_key" ON "medicamento"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "medicamento_codigo_barras_key" ON "medicamento"("codigo_barras");

-- AddForeignKey
ALTER TABLE "prontuario" ADD CONSTRAINT "prontuario_paciente_id_fkey" FOREIGN KEY ("paciente_id") REFERENCES "paciente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prontuario" ADD CONSTRAINT "prontuario_profissional_id_fkey" FOREIGN KEY ("profissional_id") REFERENCES "profissional_saude"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "procedimento" ADD CONSTRAINT "procedimento_tipo_procedimento_id_fkey" FOREIGN KEY ("tipo_procedimento_id") REFERENCES "tipo_procedimento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "procedimento_realizado" ADD CONSTRAINT "procedimento_realizado_prontuario_id_fkey" FOREIGN KEY ("prontuario_id") REFERENCES "prontuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "procedimento_realizado" ADD CONSTRAINT "procedimento_realizado_procedimento_id_fkey" FOREIGN KEY ("procedimento_id") REFERENCES "procedimento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prescricao" ADD CONSTRAINT "prescricao_prontuario_id_fkey" FOREIGN KEY ("prontuario_id") REFERENCES "prontuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prescricao" ADD CONSTRAINT "prescricao_medicamento_id_fkey" FOREIGN KEY ("medicamento_id") REFERENCES "medicamento"("id") ON DELETE SET NULL ON UPDATE CASCADE;
