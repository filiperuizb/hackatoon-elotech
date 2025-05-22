# 🗺️ Roadmap do MVP – SPA

## ✅ Fase 1 – Planejamento e Estruturação

**Tecnologias principais:**

- Next.js (Fullstack – API + Frontend)
- PostgreSQL (Neon Free)
- Prisma ORM

- Subir o commit com o prisma configurado
- Documentar roadmap e divisão de tarefas no README.md

---

## 🧱 Fase 2 – Banco de Dados e ORM

- Modelar entidades principais:
  - Paciente
  - ProfissionalSaude
  - Consulta
  - Template
  - Prescricao
  - UnidadeSaude
- Criar arquivo `schema.prisma` com os modelos
- Rodar `npx prisma migrate dev` para gerar o banco no Neon
- Preencher o banco com dados fake (Seed opcional)

---

## 🛠️ Fase 3 – Backend

- Criar API REST em `/api` com Next.js:
  - `POST /pacientes`
  - `GET /pacientes/:id`
  - `POST /consultas`
  - `GET /consultas/:pacienteId`
  - `GET /templates?sintoma=...`
- Conectar API ao banco via Prisma
- Tratar erros e retornos padronizados (status, JSON)

---

## 🎨 Fase 4 – Frontend

- Login do profissional (mockado com localStorage)
- Tela de busca/cadastro de paciente
- Tela de nova consulta com:
  - Formulário inteligente (templates adaptativos)
  - Campos essenciais
  - Reconhecimento de voz (Web Speech API)
- Tela de histórico por paciente
- Tela de dashboard simples com gráficos (produtividade, sintomas)

---

## 🚀 Fase 5 – Funcionalidades Inteligentes

- Sugestões automáticas de conduta (baseadas em sintomas)
- Templates sazonais (gripe, dengue)
- Reconhecimento de voz (dictation e transcrição)
- Offline first com sincronização simulada (localStorage ou IndexedDB)
