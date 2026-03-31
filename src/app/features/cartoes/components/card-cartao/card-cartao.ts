import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Cartao } from '../../../../core/models/cartao.model';

@Component({
  selector: 'app-card-cartao',
  imports: [CurrencyPipe],
  templateUrl: './card-cartao.html',
  styleUrl: './card-cartao.scss',
})
export class CardCartao {
  cartao = input.required<Cartao>();
}
