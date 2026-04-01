import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CarrinhoState } from '@core/services/carrinho-state/carrinho-state';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly router = inject(Router);
  protected readonly carrinhoState = inject(CarrinhoState);

  protected readonly title = signal('monolito-cartoes');

  goToCart(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/carrinho']);
  }
}
