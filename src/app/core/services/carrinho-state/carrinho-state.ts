import { computed, Injectable, signal } from '@angular/core';
import { Cartao } from '@core/models/cartao.model';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoState {
  readonly itens = signal<Record<string, number>>({});
  readonly quantidade = computed(() =>
    Object.values(this.itens()).reduce((total, quantidadeItem) => total + quantidadeItem, 0),
  );

  adicionarItem(cartaoId: Cartao['id']): void {
    const id = String(cartaoId);

    this.itens.update((itensAtuais) => ({
      ...itensAtuais,
      [id]: (itensAtuais[id] ?? 0) + 1,
    }));
  }
}
