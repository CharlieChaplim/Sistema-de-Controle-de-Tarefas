# TaskFlow

TaskFlow é um sistema simples de controle de tarefas pessoais, desenvolvido em Angular 17 e TypeScript.

O projeto funciona em memória, sem backend, e permite cadastrar, listar, editar, excluir, filtrar e concluir tarefas.

## Funcionalidades implementadas

- Cadastrar nova tarefa com título, descrição, categoria e prioridade.
- Listar todas as tarefas em cards.
- Editar tarefa existente.
- Excluir tarefa com confirmação.
- Marcar tarefa como concluída ou pendente.
- Registrar data de conclusão ao concluir uma tarefa.
- Limpar data de conclusão ao desmarcar uma tarefa.
- Filtrar por categoria.
- Filtrar por prioridade.
- Filtrar por status.
- Buscar por título ou descrição.
- Dashboard com total de tarefas, pendentes, concluídas e contagem por prioridade.

## Tecnologias utilizadas

- Angular 17
- TypeScript
- HTML
- CSS
- Services
- Components
- Routing
- Data Binding
- Diretivas

## Como instalar e rodar

1. Clone o repositório:

```bash
git clone LINK_DO_REPOSITORIO
```

2. Entre na pasta do projeto:

```bash
cd taskflow
```

3. Instale as dependências:

```bash
npm install
```

4. Execute o projeto:

```bash
ng serve
```

5. Abra no navegador:

```bash
http://localhost:4200
```

## Estrutura principal

```text
src/app/
├── models/
│   └── tarefa.model.ts
├── services/
│   └── tarefa.service.ts
├── pages/
│   ├── dashboard/
│   ├── tarefa-lista/
│   └── tarefa-form/
├── app.component.ts
├── app.component.html
├── app.component.css
└── app.routes.ts
```

## Observação

Os dados ficam apenas em memória. Ao recarregar a página, as tarefas voltam para a lista inicial de exemplo.
