-- AlterTable
ALTER TABLE "paciente" ALTER COLUMN "idade" DROP NOT NULL;

-- AlterTable
ALTER TABLE "unidade_saude" ADD COLUMN     "email" TEXT,
ADD COLUMN     "horario_funcionamento" TEXT,
ADD COLUMN     "observacoes" TEXT,
ADD COLUMN     "tipo_id" UUID;

-- CreateTable
CREATE TABLE "tipo_unidade" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "codigo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tipo_unidade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tipo_unidade_codigo_key" ON "tipo_unidade"("codigo");

-- AddForeignKey
ALTER TABLE "unidade_saude" ADD CONSTRAINT "unidade_saude_tipo_id_fkey" FOREIGN KEY ("tipo_id") REFERENCES "tipo_unidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;
