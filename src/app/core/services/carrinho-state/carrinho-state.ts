import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoState {
  quantidade = signal(0);

  adicionarItem(): void {
    this.quantidade.update((valorAtual) => valorAtual + 1);
  }
}
