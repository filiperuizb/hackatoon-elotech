-- CreateTable
CREATE TABLE "consulta" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "paciente_id" UUID,
    "profissional_id" UUID,
    "unidade_id" UUID,
    "data" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sintomas" TEXT,
    "diagnostico" TEXT,
    "conduta" TEXT,

    CONSTRAINT "consulta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paciente" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nome" TEXT NOT NULL,
    "data_nascimento" DATE NOT NULL,
    "sexo" CHAR(1),
    "cpf" VARCHAR(14),
    "telefone" VARCHAR(20),
    "email" TEXT,

    CONSTRAINT "paciente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prescricao" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "consulta_id" UUID,
    "medicamento" TEXT NOT NULL,
    "posologia" TEXT,
    "duracao" TEXT,

    CONSTRAINT "prescricao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profissional_saude" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nome" TEXT NOT NULL,
    "conselho_tipo" VARCHAR(10),
    "conselho_numero" VARCHAR(20),
    "especialidade" TEXT,
    "email" TEXT,

    CONSTRAINT "profissional_saude_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "template" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "titulo" TEXT NOT NULL,
    "sintomas_padrao" TEXT,
    "condutas_sugeridas" TEXT,
    "sazonalidade" TEXT,

    CONSTRAINT "template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unidade_saude" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nome" TEXT NOT NULL,
    "cnes" VARCHAR(20),
    "endereco" TEXT,
    "cidade" TEXT,
    "estado" CHAR(2),

    CONSTRAINT "unidade_saude_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "paciente_cpf_key" ON "paciente"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "unidade_saude_cnes_key" ON "unidade_saude"("cnes");

-- AddForeignKey
ALTER TABLE "consulta" ADD CONSTRAINT "consulta_paciente_id_fkey" FOREIGN KEY ("paciente_id") REFERENCES "paciente"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "consulta" ADD CONSTRAINT "consulta_profissional_id_fkey" FOREIGN KEY ("profissional_id") REFERENCES "profissional_saude"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "consulta" ADD CONSTRAINT "consulta_unidade_id_fkey" FOREIGN KEY ("unidade_id") REFERENCES "unidade_saude"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "prescricao" ADD CONSTRAINT "prescricao_consulta_id_fkey" FOREIGN KEY ("consulta_id") REFERENCES "consulta"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
