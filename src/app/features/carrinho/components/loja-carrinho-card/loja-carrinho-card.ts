import { Component, input } from '@angular/core';
import { LojaCarrinho } from '../../carrinho.model';

@Component({
  selector: 'app-loja-carrinho-card',
  standalone: false,
  templateUrl: './loja-carrinho-card.html',
  styleUrl: './loja-carrinho-card.scss',
})
export class LojaCarrinhoCard {
  loja = input.required<LojaCarrinho>();

  formatarMoeda(valor: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(valor);
  }
}