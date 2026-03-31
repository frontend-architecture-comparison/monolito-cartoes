import { Component, inject, OnInit } from '@angular/core';
import { CardCartao } from "./components/card-cartao/card-cartao";
import { ListaCartoes } from '../../core/services/lista-cartoes/lista-cartoes';

@Component({
  selector: 'app-cartoes',
  standalone: true,
  imports: [CardCartao],
  templateUrl: './cartoes.html',
  styleUrl: './cartoes.scss',
})
export class Cartoes implements OnInit {

  private readonly cartoes = inject(ListaCartoes);

  ngOnInit(): void {
    this.getlistaCartoes();
  }

  getlistaCartoes() {
    this.cartoes.getlistaCartoes().subscribe({
      next: (cartoes) => {
        console.log('Cartões disponíveis:', cartoes);
      },
      error: (error) => {
        console.error('Error fetching cartoes:', error);
      }
    });
  }
}
