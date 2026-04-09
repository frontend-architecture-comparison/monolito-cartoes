import { CurrencyPipe } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Cartao } from '@core/models/cartao.model';
import { ModalComponent } from '@shared/components/modal/modal';

@Component({
    selector: 'app-card-cartao',
    imports: [CurrencyPipe, ModalComponent],
    templateUrl: './card-cartao.html',
    styleUrls: ['./card-cartao.scss']
})
export class CardCartao {
  private readonly router = inject(Router);

  cartao = input.required<Cartao>();
  modalAberto = signal(false);

  redirectToCarrinho(): void {
    this.router.navigate(['/carrinho', this.cartao().id]);
  }

  abrirModal(): void {
    this.modalAberto.set(true);
  }

  fecharModal(): void {
    this.modalAberto.set(false);
  }

  selectCartao(): void {
    this.irParaCarrinho();
  }

  irParaCarrinho(): void {
    this.fecharModal();
    this.router.navigate(['/carrinho', this.cartao().id]);
  }
}
