import { CommonModule } from '@angular/common';
import { Component, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { CardCartao } from "./components/card-cartao/card-cartao";
import { ListaCartoes } from '../../core/services/lista-cartoes/lista-cartoes';
import { Cartao } from '@core/models/cartao.model';
import { LoadingComponent } from '../../shared/components/loading/loading';

@Component({
    selector: 'app-cartoes',
    standalone: true,
    imports: [CommonModule, CardCartao, LoadingComponent],
    templateUrl: './cartoes.html',
    styleUrls: ['./cartoes.scss']
})
export class Cartoes implements OnDestroy {

  private readonly cartoesService = inject(ListaCartoes);
  private readonly subscriptions = new Subscription();
  private _loading = true;
  private _cartoes: Cartao[] = [];

  constructor() {
    this.subscriptions.add(
      this.cartoesService.getlistaCartoes().subscribe({
        next: (cartoes) => {
          this._cartoes = cartoes;
          this._loading = false;
        },
        error: (error) => {
          console.error('Error fetching cartoes:', error);
          this._loading = false;
        },
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loading(): boolean {
    return this._loading;
  }

  cartoes(): Cartao[] {
    return this._cartoes;
  }
}
