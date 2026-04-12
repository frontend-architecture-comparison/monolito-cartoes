#!/usr/bin/env bash
set -euo pipefail

REPO="frontend-architecture-comparison/monolito-cartoes"

if ! command -v gh >/dev/null 2>&1; then
  echo "Erro: gh CLI nao encontrado. Instale com: brew install gh"
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "Erro: voce nao esta autenticada no GitHub CLI. Rode: gh auth login"
  exit 1
fi

labels=(
  "planejamento"
  "fase-3"
  "fase-4"
  "fase-5"
  "fase-6"
  "entrega"
  "mfe"
  "monolito"
  "cartoes"
  "carrinho"
  "testes"
  "metricas"
  "escrita"
  "revisao"
)

for label in "${labels[@]}"; do
  gh label create "$label" --repo "$REPO" --color "1F6FEB" --description "Acompanhamento TCC" 2>/dev/null || true
done

gh issue create --repo "$REPO" --title "Roadmap TCC | Indice geral" --label "planejamento" --body-file .github/issue-bodies/roadmap-tcc.md
gh issue create --repo "$REPO" --title "Fase 3 | Implementacao MFE | 10/04 a 25/04" --label "fase-3,mfe,monolito,cartoes,carrinho" --body-file .github/issue-bodies/fase-3-mfe.md
gh issue create --repo "$REPO" --title "Fase 4 | Testes e metricas | 26/04 a 15/05" --label "fase-4,testes,metricas" --body-file .github/issue-bodies/fase-4-testes-metricas.md
gh issue create --repo "$REPO" --title "Fase 5 | Escrita tecnica | 16/05 a 31/05" --label "fase-5,escrita" --body-file .github/issue-bodies/fase-5-escrita.md
gh issue create --repo "$REPO" --title "Fase 6 | Revisao final | 01/06 a 06/06" --label "fase-6,revisao" --body-file .github/issue-bodies/fase-6-revisao-final.md
gh issue create --repo "$REPO" --title "Entrega | Orientador e entrega oficial | 07/06 a 16/06" --label "entrega,planejamento" --body-file .github/issue-bodies/entrega-final.md

echo "Issues criadas com sucesso em $REPO"