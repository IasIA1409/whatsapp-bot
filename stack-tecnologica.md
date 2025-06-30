
# Stack Tecnológica – CRM com IA, WhatsApp e Funil de Vendas

Este documento descreve a stack tecnológica escolhida para o desenvolvimento do CRM com IA humanizada, integração com WhatsApp e gestão de funil de vendas. Cada tecnologia foi selecionada com base em critérios de escalabilidade, facilidade de integração, segurança e performance.

---

## 🔧 Backend – Python (FastAPI)
- **Motivo da escolha**: Leve, rápido, altamente compatível com OpenAI e fácil de integrar com bancos relacionais e não-relacionais.
- **Alternativas consideradas**: Node.js, Django.
- **Vantagens**: Performance elevada com código limpo, integração nativa com OpenAPI/Swagger, ótimo suporte para APIs REST.

---

## 🗄️ Banco de Dados Relacional – PostgreSQL
- **Motivo da escolha**: Ideal para estrutura de dados com integridade (leads, usuários, estágios).
- **Vantagens**: Suporte a JSON, consultas complexas, segurança avançada.
- **Uso no projeto**: Leads, usuários, movimentações no funil, credenciais.

---

## 📄 Banco de Dados Não Relacional – MongoDB
- **Motivo da escolha**: Flexível para armazenar logs de conversas da IA e mensagens do WhatsApp.
- **Vantagens**: Escalável, ótimo para dados semi-estruturados e leitura rápida.
- **Uso no projeto**: Armazenamento de logs, histórico de atendimento, dados da IA.

---

## 🤖 Inteligência Artificial – OpenAI GPT-4 + Dialogflow
- **Motivo da escolha**:
  - GPT-4 para conversas mais humanizadas e contextuais.
  - Dialogflow para intents rápidas, específicas e classificações simples.
- **Vantagens**: Redução de tempo de resposta, maior personalização no atendimento.
- **Uso no projeto**: Atendimento automatizado, análise de sentimentos, triagem de leads.

---

## 💬 Integração com WhatsApp – Twilio API
- **Motivo da escolha**: API oficial aprovada pelo Meta, confiável e com ampla documentação.
- **Vantagens**: Confiabilidade, suporte a envio/recebimento de mídia, fácil integração com backend.
- **Uso no projeto**: Canal principal de atendimento e captação de leads.

---

## 🧩 Frontend – React.js + Material UI
- **Motivo da escolha**: Framework moderno, eficiente para construção de SPAs com ótima experiência de usuário.
- **Vantagens**: Componentização, reatividade, vasta comunidade.
- **Uso no projeto**: Dashboard, gerenciamento de leads, visualização de funil e chat em tempo real.

---

## 🔐 Autenticação – Firebase Auth + JWT
- **Motivo da escolha**: Firebase oferece autenticação segura e fácil de integrar com múltiplos providers.
- **Vantagens**: Escalável, seguro, autenticação via email, senha, Google, etc.
- **Uso no projeto**: Controle de acesso a usuários e restrição de permissões.

---

## ☁️ Hospedagem – Firebase (Frontend) + AWS EC2 (Backend)
- **Motivo da escolha**: Combinação de baixo custo com escalabilidade e controle.
- **Vantagens**:
  - Firebase: Deploy simples e gratuito para pequenas aplicações.
  - AWS EC2: Controle total do ambiente de backend, indicado para APIs robustas.
- **Uso no projeto**: Disponibilizar o sistema online com performance estável.

---

## ⚙️ CI/CD e Infraestrutura – Docker + GitHub Actions
- **Motivo da escolha**: Padronizar ambiente de desenvolvimento e automação de deploy.
- **Vantagens**: Facilidade de testes, consistência entre dev/staging/prod.
- **Uso no projeto**: Automatizar builds, testes e deploy contínuo.

