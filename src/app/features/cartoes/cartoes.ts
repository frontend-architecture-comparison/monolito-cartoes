import { Component, effect, inject, signal } from '@angular/core';
import { CardCartao } from "./components/card-cartao/card-cartao";
import { ListaCartoes } from '../../core/services/lista-cartoes/lista-cartoes';
import { Cartao } from '@core/models/cartao.model';
import { LoadingComponent } from '../../shared/components/loading/loading';

@Component({
  selector: 'app-cartoes',
  standalone: true,
  imports: [CardCartao, LoadingComponent],
  templateUrl: './cartoes.html',
  styleUrl: './cartoes.scss',
})
export class Cartoes {

  private readonly cartoesService = inject(ListaCartoes);

  loading = signal(true);
  cartoes = signal<Cartao[]>([]);

  constructor() {
    effect(() => {
      this.cartoesService.getlistaCartoes().subscribe({
        next: (cartoes) => {
          this.cartoes.set(cartoes);
          this.loading.set(false);
        },
        error: (error) => {
          console.error('Error fetching cartoes:', error);
          this.loading.set(false);
        },
      });
    });
  }
}
