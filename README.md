# Monolito - Aplicacao de Aquisicao de Cartoes

Este repositorio contem a implementacao de uma aplicacao web desenvolvida em arquitetura monolitica, como parte do Trabalho de Conclusao de Curso (TCC) em Engenharia de Software.

## Objetivo

A aplicacao foi desenvolvida com o objetivo de servir como base para comparacao com uma arquitetura baseada em micro front-ends, permitindo a analise de aspectos relacionados a desempenho, escalabilidade e organizacao estrutural.

## Arquitetura

A aplicacao segue o modelo de arquitetura monolitica, sendo estruturada em um unico projeto Angular, com organizacao interna baseada em modulos por funcionalidade.

Caracteristicas principais:

- Aplicacao unica (single application)
- Build e deploy unificados
- Modulos internos organizados por dominio
- Alto acoplamento entre as partes da aplicacao

## Funcionalidades

A aplicacao simula um sistema de aquisicao de cartoes, contendo as seguintes funcionalidades:

- Listagem de cartoes disponiveis com loading state
- Adicao de cartoes ao carrinho
- Visualizacao e remocao de itens do carrinho

## Timeline de Desenvolvimento

### Feature: Lista de Cartões (feature/lista-cartoes)

Atualizações recentes implementadas:

- **Modelo centralizado**: Interface `Cartao` extraída para `core/models/cartao.model.ts` para reutilização em todo o projeto
- **Variáveis SCSS**: Cores em variáveis globais para consistência visual (primary, white, text-muted, shadow)
- **Componente Card**: Template do card vinculado aos dados do input signal `cartao`
- **Formatação monetária**: Pipe currency configurado para BRL com locale pt-BR
- **Componente Loading**: Novo componente reutilizável em `shared/components/loading` com animação de pulsação
- **Signals**: Refatoração do componente Cartoes para usar signals (loading state, cartoes list)
- **Tipagem forte**: Remoção de `any` em favor de tipos explícitos

## Tecnologias Utilizadas

- Angular 21
- TypeScript
- SCSS
- Node.js
- pnpm
- json-server (mock de API local)
- Vitest (testes unitarios)

## Estrutura do Projeto

```text
monolito-cartoes/
|- src/
|  |- app/
|  |  |- app.ts
|  |  |- app.html
|  |  |- app.scss
|  |  |- app.routes.ts
|  |  |- app.config.ts
|  |  |- features/
|  |  |  |- cartoes/
|  |  |  |  |- cartoes.ts
|  |  |  |  |- cartoes.html
|  |  |  |  |- cartoes.scss
|  |  |  |  |- cartoes.spec.ts
|  |  |  |  |- components/
|  |  |  |  |  |- card-cartao/
|  |  |  |  |  |  |- card-cartao.ts
|  |  |  |  |  |  |- card-cartao.html
|  |  |  |  |  |  |- card-cartao.scss
|  |  |  |  |  |  |- card-cartao.spec.ts
|  |  |  |- carrinho/
|  |  |  |  |- carrinho.ts
|  |  |  |  |- carrinho.html
|  |  |  |  |- carrinho.scss
|  |  |  |  |- carrinho.spec.ts
|  |  |- core/
|  |  |  |- models/
|  |  |  |  |- cartao.model.ts
|  |  |  |- services/
|  |  |  |  |- lista-cartoes/
|  |  |  |  |  |- lista-cartoes.ts
|  |  |  |- data/
|  |  |  |  |- db.json
|  |  |- shared/
|  |  |  |- components/
|  |  |  |  |- loading/
|  |  |  |  |  |- loading.ts
|  |- main.ts
|  |- main.server.ts
|  |- server.ts
|  |- styles.scss
|- public/
|- angular.json
|- package.json
|- tsconfig.json
```

## Como Executar o Projeto

### Pre-requisitos

- Node.js 20+
- pnpm 10+

### Instalacao

```bash
pnpm install
```

### Ambiente de Desenvolvimento

```bash
pnpm start
```

A aplicacao ficara disponivel em `http://localhost:4200`.

### Ambiente de Desenvolvimento com Mock API

Para subir o frontend Angular e o mock server juntos:

```bash
pnpm dev
```

Servicos disponiveis:

- Frontend: `http://localhost:4200`
- Mock API (json-server): `http://localhost:3000`

Endpoints mock principais:

- `http://localhost:3000/cartoes`
- `http://localhost:3000/carrinho`

## Telas

### Tela de Cartoes

![Tela de Cartoes](docs/screenshots/cartoes.png)

### Tela de Carrinho

![Tela de Carrinho](docs/screenshots/carrinho.png)

> Observacao: caso as imagens ainda nao existam no repositorio, adicione os arquivos em `docs/screenshots/` com os nomes `cartoes.png` e `carrinho.png`.

## Scripts Disponiveis

- `pnpm start`: sobe o servidor de desenvolvimento.
- `pnpm predev`: libera as portas `4200` e `3000` antes de iniciar o ambiente completo.
- `pnpm dev`: sobe frontend Angular + mock API (`json-server`) em paralelo.
- `pnpm build`: gera o build da aplicacao.
- `pnpm watch`: gera build em modo observacao (development).
- `pnpm test`: executa os testes unitarios.

## Build de Producao

```bash
pnpm build
```

## Testes

```bash
pnpm test
```

## Padrões e Boas Práticas

### Componentes

- **Standalone Components**: Todos os componentes utilizam a API standalone (sem NgModules)
- **Signals**: Utilizados para gerenciar estado local e comunicação entre componentes
- **Input Signal**: Propriedades tipadas com `input()` e `input.required()` em lugar de `@Input`
- **Change Detection**: Strategy `OnPush` implícita com signals
- **Pipe Currency**: Formatação de valores monetários em BRL com locale pt-BR

### Estilos

- **SCSS Modules**: Variáveis reutilizáveis para cores e espaçamentos
- **Mixin de Estilos**: Reutilização de padrões comuns (ex: subtitle)
- **Object-fit**: Imagens centralizadas em containers fixos sem distorção

### Serviços

- **Injeção de Dependência**: Via `inject()` function em lugar de constructor injection
- **Tipagem**: Métodos de serviço retornam tipos explícitos (`Observable<Cartao[]>`)
- **Providência**: Singleton services com `providedIn: 'root'`

### Modelos

- **Interfaces Centralizadas**: Modelos em `core/models/` para reutilização em toda a aplicação
- **Type Safety**: Remoção de `any` em favor de tipos explícitos

## Contexto Academico

Este projeto compoe o estudo comparativo entre abordagens arquiteturais no frontend:

- Monolito (este repositorio)
- Micro front-ends (repositorio comparativo)

O foco da analise e avaliar impacto em manutencao, evolucao e organizacao do codigo ao longo do desenvolvimento.
