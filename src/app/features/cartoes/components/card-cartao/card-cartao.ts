import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Cartao } from '@core/models/cartao.model';
import { ModalComponent } from '@shared/components/modal/modal';

@Component({
    selector: 'app-card-cartao',
    standalone: true,
    imports: [CurrencyPipe, ModalComponent],
    templateUrl: './card-cartao.html',
    styleUrls: ['./card-cartao.scss']
})
export class CardCartao {
  private readonly router = inject(Router);

  @Input() cartao!: Cartao;
  modalAberto = false;
  @Output() readonly cartaoSelecionado = new EventEmitter<void>();

  redirectToCarrinho(): void {
    this.router.navigate(['/carrinho', this.cartao.id]);
  }

  abrirModal(): void {
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
  }

  selectCartao(): void {
    this.irParaCarrinho();
  }

  irParaCarrinho(): void {
    this.fecharModal();
    this.router.navigate(['/carrinho', this.cartao.id]);
    this.cartaoSelecionado.emit();
  }
}
