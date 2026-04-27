# 📝 TaskFlow - Organizador de Tarefas Full Stack
> Projeto acadêmico de gerenciamento de tarefas desenvolvido para a disciplina de **DevOps - UNIESP**.

## 👥 Equipe do Projeto
* **Carlos Manoel:** Líder de Projeto e Integração.
* **Pedro:** Desenvolvimento do Backend (Node.js & MongoDB).
* **Rodrigo:** Desenvolvimento do Frontend (UI/UX).
* **Rayssa:** Documentação Técnica e QA.

---

## 🏗️ Arquitetura e Infraestrutura
A aplicação utiliza uma arquitetura baseada em micro-serviços conteinerizados, garantindo isolamento e facilidade de deploy.

- **Frontend:** HTML5, CSS3 e JavaScript servidos via Nginx (Porta 3000).
- **Backend:** API REST em Node.js e Express (Porta 5000).
- **Banco de Dados:** MongoDB NoSQL para persistência (Porta 27017).
- **Gerenciamento:** Mongo Express para interface visual do banco (Porta 8081).
- **Orquestração:** Docker Compose para gerenciamento de containers.

---

## 🛠️ Como Executar o Projeto

Certifique-se de ter o **Docker Desktop** instalado.

1. No terminal, na raiz do projeto, execute:
   ```bash
   docker compose up -d --build

Acesse os serviços no seu navegador:

Aplicação: http://localhost:3000

Interface do Banco: http://localhost:8081

Usuário: admin | Senha: pass

📋 Funcionalidades (CRUD)
A aplicação permite o ciclo completo de gerenciamento de dados:

Create: Adição de tarefas com validação de campo obrigatório no Backend.

Read: Listagem dinâmica separada entre "Pendentes" e "Concluídas".

Update: Alteração de status (concluir/reabrir) e edição do texto da tarefa.

Delete: Exclusão definitiva de registros do banco de dados.

---------------------------------------------------------------------------------------

UNIESP - Sistemas para Internet - 2026