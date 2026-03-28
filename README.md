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

- Listagem de cartoes disponiveis
- Adicao de cartoes ao carrinho
- Visualizacao e remocao de itens do carrinho

## Tecnologias Utilizadas

- Angular 21
- TypeScript
- SCSS
- Node.js
- pnpm
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

## Scripts Disponiveis

- `pnpm start`: sobe o servidor de desenvolvimento.
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

## Contexto Academico

Este projeto compoe o estudo comparativo entre abordagens arquiteturais no frontend:

- Monolito (este repositorio)
- Micro front-ends (repositorio comparativo)

O foco da analise e avaliar impacto em manutencao, evolucao e organizacao do codigo ao longo do desenvolvimento.
