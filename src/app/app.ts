import { computed, Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
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
  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => this.router.url),
    ),
    { initialValue: this.router.url },
  );

  protected readonly title = computed(() => {
    const url = this.currentUrl();

    switch (true) {
      case url === '/':
      case url.startsWith('/home'):
        return 'Home';
      case url.startsWith('/carrinho'):
        return 'Carrinho';
      default:
        return '';
    }
  });

  goToCart(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/carrinho']);
  }
}
