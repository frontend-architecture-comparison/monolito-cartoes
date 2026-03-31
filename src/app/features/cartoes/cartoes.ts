import { Component, inject, OnInit } from '@angular/core';
import { CardCartao } from "./components/card-cartao/card-cartao";
import { ListaCartoes } from '../../core/services/lista-cartoes/lista-cartoes';
import { Cartao } from '../../core/models/cartao.model';

@Component({
  selector: 'app-cartoes',
  standalone: true,
  imports: [CardCartao],
  templateUrl: './cartoes.html',
  styleUrl: './cartoes.scss',
})
export class Cartoes implements OnInit {

  private readonly cartoesService = inject(ListaCartoes);

  cartoes: Cartao[] = [];

  ngOnInit(): void {
    this.getlistaCartoes();
  }

  getlistaCartoes() {
    this.cartoesService.getlistaCartoes().subscribe({
      next: (cartoes) => {
        console.log('Cartões disponíveis:', cartoes);
        this.cartoes = cartoes;
      },
      error: (error) => {
        console.error('Error fetching cartoes:', error);
      }
    });
  }
}
