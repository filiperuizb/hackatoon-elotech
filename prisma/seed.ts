import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

async function main() {
  const tiposDocumento = [
    { nome: 'CRM', descricao: 'Conselho Regional de Medicina' },
    { nome: 'CRO', descricao: 'Conselho Regional de Odontologia' },
    { nome: 'COREN', descricao: 'Conselho Regional de Enfermagem' },
    { nome: 'CREFITO', descricao: 'Conselho Regional de Fisioterapia e Terapia Ocupacional' },
    { nome: 'CRP', descricao: 'Conselho Regional de Psicologia' },
    { nome: 'CRF', descricao: 'Conselho Regional de Farmácia' },
    { nome: 'CREFONO', descricao: 'Conselho Regional de Fonoaudiologia' },
    { nome: 'CRN', descricao: 'Conselho Regional de Nutrição' },
  ]

  for (const doc of tiposDocumento) {
    await prisma.tipo_documento.upsert({
      where: { nome: doc.nome },
      update: {},
      create: doc,
    })
  }

  const especialidades = [
    { nome: 'Clínica Geral', descricao: 'Atendimento geral de pacientes' },
    { nome: 'Cardiologia', descricao: 'Especialidade que trata de doenças do coração' },
    { nome: 'Dermatologia', descricao: 'Especialidade que trata de doenças da pele' },
    { nome: 'Pediatria', descricao: 'Especialidade que trata de crianças' },
    { nome: 'Ortopedia', descricao: 'Especialidade que trata do sistema musculoesquelético' },
    { nome: 'Ginecologia', descricao: 'Especialidade que trata da saúde feminina' },
    { nome: 'Urologia', descricao: 'Especialidade que trata do sistema urinário e reprodutor masculino' },
    { nome: 'Neurologia', descricao: 'Especialidade que trata do sistema nervoso' },
    { nome: 'Oftalmologia', descricao: 'Especialidade que trata dos olhos' },
    { nome: 'Otorrinolaringologia', descricao: 'Especialidade que trata de ouvido, nariz e garganta' },
    { nome: 'Psiquiatria', descricao: 'Especialidade que trata de transtornos mentais' },
    { nome: 'Endocrinologia', descricao: 'Especialidade que trata do sistema endócrino' },
    { nome: 'Gastroenterologia', descricao: 'Especialidade que trata do sistema digestivo' },
    { nome: 'Pneumologia', descricao: 'Especialidade que trata do sistema respiratório' },
    { nome: 'Reumatologia', descricao: 'Especialidade que trata de doenças reumáticas' },
    { nome: 'Oncologia', descricao: 'Especialidade que trata de câncer' },
    { nome: 'Hematologia', descricao: 'Especialidade que trata de doenças do sangue' },
    { nome: 'Nefrologia', descricao: 'Especialidade que trata dos rins' },
    { nome: 'Geriatria', descricao: 'Especialidade que trata de idosos' },
    { nome: 'Infectologia', descricao: 'Especialidade que trata de doenças infecciosas' },
  ]

  for (const esp of especialidades) {
    await prisma.especialidade.upsert({
      where: { nome: esp.nome },
      update: {},
      create: esp,
    })
  }

  const tiposUnidade = [
    { codigo: 'UBS', nome: 'Unidade Básica de Saúde', descricao: 'Porta de entrada do SUS' },
    { codigo: 'ESF', nome: 'Estratégia Saúde da Família', descricao: 'Modelo de atenção primária' },
    { codigo: 'UPA', nome: 'Unidade de Pronto Atendimento', descricao: 'Atendimento de urgência e emergência' },
    { codigo: 'CAPS', nome: 'Centro de Atenção Psicossocial', descricao: 'Cuidado em saúde mental' },
    { codigo: 'HOSPITAL', nome: 'Hospital', descricao: 'Unidade de atendimento de alta complexidade' },
    { codigo: 'POLICLINICA', nome: 'Policlínica', descricao: 'Atendimento especializado' },
    { codigo: 'OUTRO', nome: 'Outro', descricao: 'Outros tipos de unidade de saúde' },
  ]

  for (const tipo of tiposUnidade) {
    await prisma.tipo_unidade.upsert({
      where: { codigo: tipo.codigo },
      update: {},
      create: tipo,
    })
  }

  console.log('Seed concluído com sucesso!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })