import { CurrencyPipe } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Cartao } from '@core/models/cartao.model';
import { CarrinhoState } from '@core/services/carrinho-state/carrinho-state';
import { ModalComponent } from '@shared/components/modal/modal';

@Component({
  selector: 'app-card-cartao',
  standalone: true,
  imports: [CurrencyPipe, ModalComponent],
  templateUrl: './card-cartao.html',
  styleUrl: './card-cartao.scss',
})
export class CardCartao {
  private readonly router = inject(Router);
  private readonly carrinhoState = inject(CarrinhoState);

  cartao = input.required<Cartao>();
  modalAberto = signal(false);

  abrirModal(): void {
    this.modalAberto.set(true);
  }

  fecharModal(): void {
    this.modalAberto.set(false);
  }

  selectCartao(): void {
    alert(`Cartão selecionado: ${this.cartao().nome}`);
    this.fecharModal();
  }

  irParaCarrinho(): void {
    this.carrinhoState.adicionarItem();
    this.fecharModal();
    this.router.navigate(['/carrinho']);
  }
}
