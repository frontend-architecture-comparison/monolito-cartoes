# Monolito - Aplicacao de Aquisicao de Cartoes

Repositorio contendo a implementacao de uma aplicacao web desenvolvida em arquitetura monolitica, como parte do Trabalho de Conclusao de Curso (TCC) em Engenharia de Software.

## Objetivo

A aplicacao foi desenvolvida como base para comparacao com uma arquitetura baseada em micro front-ends, permitindo analise de aspectos relacionados a desempenho, escalabilidade e organizacao estrutural.

## Arquitetura

A aplicacao segue o modelo de arquitetura monolitica, estruturada em um unico projeto Angular com organizacao interna baseada em modulos por funcionalidade (feature-based).

**Caracteristicas principais:**

- Aplicacao unica (single application)
- Build e deploy unificados
- Modulos internos organizados por dominio
- Componentes reutilizaveis em camadas compartilhadas
- Alto acoplamento entre as partes da aplicacao

### Organizacao em Camadas

#### **Core** (`src/app/core/`)
Camada responsavel pela logica de negocio e acesso a dados:
- **Models**: Definicoes de interfaces (`Cartao`, `ItemCarrinho`, `LojaCarrinho`)
- **Services**: 
  - `ListaCartoes` - Busca e filtro de cartoes disponiveis
  - `CarrinhoState` - Gerenciamento do estado do carrinho
- **Data**: Mock database (`db.json`) com dados de cartoes

#### **Features** (`src/app/features/`)
Modulos de funcionalidades especificas:

**Cartoes** (`cartoes/`)
- Listagem de cartoes disponiveis
- Componente `CardCartao` para exibicao individual
- Modal de confirmacao de selecao
- Loading state durante carregamento

**Carrinho** (`carrinho/`)
- Visualizacao de itens selecionados
- Componente `LojaCarrinhoCard` para renderizacao de lojas
- Calculo automatico de totais
- Persistencia de carrinho

#### **Shared** (`src/app/shared/`)
Componentes e utilitarios reutilizaveis:
- **Loading** - Componente com animacao de carregamento
- **Modal** - Componente generico para dialogos

## Funcionalidades

A aplicacao simula um sistema de aquisicao de cartoes com:

- Listagem paginada de cartoes disponiveis com loading state
- Selecao e adicao de cartoes ao carrinho
- Modal de confirmacao com detalhes completos do cartao
- Visualizacao do carrinho com itens selecionados agrupados por loja
- Calculo automatico de totais e quantidade de itens
- Formatacao monetaria em BRL com Intl.NumberFormat
- Navegacao entre telas (home → carrinho → checkout)
- Roteamento lazy-loaded para optimal performance
- Tipagem forte com TypeScript
- Componentes standalone (Angular 21)

## Tecnologias Utilizadas

| Tecnologia | Versao | Proposito |
|-----------|--------|----------|
| Angular | 21 | Framework frontend |
| TypeScript | ~5.9 | Linguagem de programacao |
| SCSS | - | Pre-processador CSS |
| RxJS | ~7.8 | Programacao reativa |
| Node.js | 20+ | Runtime JavaScript |
| pnpm | 10+ | Gerenciador de pacotes |
| json-server | - | Mock de API REST local |
| Vitest | ^4.0 | Testes unitarios |
| Express | ^5.1 | Server-side rendering |



## Estrutura do Projeto

```
monolito-cartoes/
├── src/
│   ├── app/
│   │   ├── app.ts                          # Componente raiz
│   │   ├── app.html                        # Template raiz
│   │   ├── app.scss                        # Estilos globais
│   │   ├── app.config.ts                   # Configuracao da app
│   │   ├── app.routes.ts                   # Roteamento principal
│   │   │
│   │   ├── core/                           # Camada de negocio
│   │   │   ├── models/
│   │   │   │   └── cartao.model.ts         # Interface Cartao
│   │   │   ├── services/
│   │   │   │   ├── lista-cartoes/
│   │   │   │   │   ├── lista-cartoes.ts
│   │   │   │   │   └── lista-cartoes.spec.ts
│   │   │   │   └── carrinho-state/
│   │   │   │       └── carrinho-state.ts   # Gerenciamento de estado
│   │   │   └── data/
│   │   │       └── db.json                 # Mock data
│   │   │
│   │   ├── features/                       # Funcionalidades
│   │   │   ├── cartoes/
│   │   │   │   ├── cartoes.ts              # Componente principal
│   │   │   │   ├── cartoes.html
│   │   │   │   ├── cartoes.scss
│   │   │   │   ├── cartoes.spec.ts
│   │   │   │   ├── cartoes-module.ts
│   │   │   │   └── components/
│   │   │   │       └── card-cartao/        # Card individual
│   │   │   │           ├── card-cartao.ts
│   │   │   │           ├── card-cartao.html
│   │   │   │           ├── card-cartao.scss
│   │   │   │           └── card-cartao.spec.ts
│   │   │   │
│   │   │   └── carrinho/
│   │   │       ├── carrinho.ts             # Componente carrinho
│   │   │       ├── carrinho.html
│   │   │       ├── carrinho.scss
│   │   │       ├── carrinho.spec.ts
│   │   │       ├── carrinho.model.ts       # Tipos carrinho
│   │   │       ├── carrinho-module.ts
│   │   │       └── components/
│   │   │           └── loja-carrinho-card/ # Card de loja
│   │   │               ├── loja-carrinho-card.ts
│   │   │               ├── loja-carrinho-card.html
│   │   │               ├── loja-carrinho-card.scss
│   │   │               └── loja-carrinho-card.module.ts
│   │   │
│   │   └── shared/                         # Componentes compartilhados
│   │       └── components/
│   │           ├── loading/
│   │           │   ├── loading.ts
│   │           │   ├── loading.html
│   │           │   └── loading.scss
│   │           └── modal/
│   │               ├── modal.ts
│   │               ├── modal.html
│   │               └── modal.scss
│   │
│   ├── main.ts                             # Entry point
│   ├── main.server.ts                      # SSR entry point
│   ├── server.ts                           # Express server
│   └── styles.scss                         # Styles globais
│
├── public/                                 # Assets estaticos
│   └── *.png                               # Screenshots
│
├── angular.json                            # Configuracao Angular CLI
├── package.json                            # Dependencias e scripts
├── tsconfig.json                           # Configuracao TypeScript
├── tsconfig.app.json                       # Config TypeScript app
├── tsconfig.spec.json                      # Config TypeScript tests
├── pnpm-lock.yaml                          # Lock de dependencias
└── README.md                               # Este arquivo
```

## Como Executar o Projeto

### Pre-requisitos

- Node.js 20+
- pnpm 10+

### Instalacao de Dependencias

```bash
pnpm install
```

### Desenvolvimento

**Apenas frontend (Angular):**
```bash
pnpm start
```
Acesse: `http://localhost:4200`

**Frontend + Mock API (recomendado):**
```bash
pnpm dev
```
- Frontend: `http://localhost:4200`
- Mock API: `http://localhost:3000`

### Build de Producao

```bash
pnpm build
```

Gera a build otimizada em `dist/monolito-cartoes/`

### Server-Side Rendering

```bash
pnpm start:ssr
```

### Testes

Executar testes unitarios:
```bash
pnpm test
```

**Arquivos de teste:**
- `app.spec.ts` - Testes do componente raiz
- `lista-cartoes.spec.ts` - Testes do servico
- `cartoes.spec.ts` - Testes do componente cartoes
- `carrinho.spec.ts` - Testes do componente carrinho
- `card-cartao.spec.ts` - Testes do card

## Scripts Disponiveis

| Script | Descricao |
|--------|-----------|
| `pnpm start` | Sobe servidor de desenvolvimento |
| `pnpm build` | Gera build de producao |
| `pnpm watch` | Build em modo observacao |


## Fluxo de Dados

```
┌─────────────────────────────────────────────────────────────┐
│                     App (Root Component)                     │
│                  Gerencia navegacao global                   │
└────────────────────────┬────────────────────────────────────┘
                         │
            ┌────────────┴────────────┐
            ▼                         ▼
      ┌──────────────┐         ┌──────────────┐
      │ Cartoes      │         │ Carrinho     │
      │ (home)       │         │ (details)    │
      └────────┬─────┘         └────┬─────────┘
               │                    │
               ▼                    ▼
        ┌─────────────┐      ┌─────────────┐
        │CardCartao   │      │LojaCarrinho │
        │Component    │      │ Card Componet
        └──────┬──────┘      └─────────────┘
               │
         ┌─────┴──────┐
         ▼            ▼
    ┌────────┐  ┌─────────┐
    │ Modal  │  │ Loading │
    │Shared  │  │ Shared  │
    └────────┘  └─────────┘

SERVICES:
  ┌──────────────────────────────────────┐
  │ ListaCartoes (Core Service)          │
  │ - Busca de cartoes                   │
  │ - Filtros e paginacao                │
  └──────────────────────────────────────┘
  
  ┌──────────────────────────────────────┐
  │ CarrinhoState (Core Service)         │
  │ - Gerenciamento de estado            │
  │ - Calculo de totais                  │
  └──────────────────────────────────────┘
```

## Componentes Principais

### Cartoes Feature

**`Cartoes` (Container)**
- Responsavel por buscar e listar cartoes
- Gerencia loading state
- Usa servico `ListaCartoes`

**`CardCartao` (Presentational)**
- Exibe um cartao individual
- Modal de confirmacao integrado
- Formatacao de valores monetarios

### Carrinho Feature

**`Carrinho` (Container)**
- Busca dados do carrinho pela rota
- Calcula totais e quantidade de itens
- Renderiza lista de lojas

**`LojaCarrinhoCard` (Presentational)**
- Exibe loja com seus itens
- Renderiza grid de produtos
- Calcula subtotais

### Shared Components

**`Loading`**
- Animacao de carregamento reutilizavel
- Customizavel com mensagem

**`Modal`**
- Dialogo generico reutilizavel
- Slots para conteudo customizado
- Controle de abertura/fechamento

## Roteamento

A aplicacao usa roteamento lazy-loaded para otimizar o bundle:

```typescript
path: 'home'              → Cartoes (lazy-loaded)
path: 'carrinho'          → Carrinho vazio
path: 'carrinho/:id'      → Carrinho com items do cartao selecionado
path: ''                  → Redirect para 'home'
```

## Dados Mock

**API Local (json-server):**
```
GET /cartoes       - Lista de cartoes disponiveis
GET /cartoes/:id   - Cartao especifico
```

**Estrutura Cartao:**
```typescript
{
  id: string;
  nome: string;
  img: string;
  limiteTotal: number;
  limitePromocional: number;
  anuidade: number;
}
```

## Padroes Utilizados

- **Signals** - State management moderno do Angular
- **Services** - Separacao de responsabilidades
- **Standalone Components** - Componentes modernos sem NgModule
- **Lazy Loading** - Carregamento sob demanda de features
- **Strong Typing** - TypeScript com tipos explicitos
- **Reactive Programming** - RxJS para operacoes assincronas
- **Feature-Based Organization** - Estrutura por funcionalidade
- **DRY** - Componentes reutilizaveis (Card, Modal, Loading)

## Testes

A aplicacao inclui testes unitarios com Vitest:

```bash
# Executar todos os testes
pnpm test

# Modo watch
pnpm test --watch

# Com coverage
pnpm test --coverage
```

## Telas

### Home - Lista de Cartoes
![Tela de Cartoes](public/lista-cartoes.png)

### Carrinho
![Tela de Carrinho](public/carrinho.png)

## Contexto Academico

Este projeto compoe o estudo comparativo entre abordagens arquiteturais no frontend:

- **Monolito** (este repositorio) - Aplicacao unica
- **Micro Front-ends** (repositorio comparativo) - Multiplas aplicacoes

O foco da analise e avaliar o impacto em manutencao, evolucao e organizacao do codigo ao longo do desenvolvimento.

## Versao

- **Angular**: 21
- **TypeScript**: 5.9
- **Node**: 20+
- **pnpm**: 10+

## Contribuicao

Este e um projeto academico de TCC. Para duvidas ou sugestoes, consulte a documentacao do projeto.

## Contato

Para informacoes sobre este projeto, entre em contato com o desenvolvedor responsavel pelo TCC.

---

**Ultima atualizacao:** Abril de 2026
