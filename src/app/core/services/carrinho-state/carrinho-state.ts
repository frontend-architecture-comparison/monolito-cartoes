import { Injectable } from '@angular/core';
import { Cartao } from '@core/models/cartao.model';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoState {
  private itensState: Record<string, number> = {};

  itens(): Record<string, number> {
    return this.itensState;
  }

  quantidade(): number {
    return Object.values(this.itensState).reduce((total, quantidadeItem) => total + quantidadeItem, 0);
  }

  adicionarItem(cartaoId: Cartao['id']): void {
    const id = String(cartaoId);

    this.itensState = {
      ...this.itensState,
      [id]: (this.itensState[id] ?? 0) + 1,
    };
  }

  removerItem(cartaoId: Cartao['id']): void {
    const id = String(cartaoId);

    const novoItens = { ...this.itensState };
    delete novoItens[id];
    this.itensState = novoItens;
  }

  atualizarQuantidade(cartaoId: Cartao['id'], quantidade: number): void {
    const id = String(cartaoId);

    if (quantidade <= 0) {
      this.removerItem(cartaoId);
    } else {
      this.itensState = {
        ...this.itensState,
        [id]: quantidade,
      };
    }
  }
}
