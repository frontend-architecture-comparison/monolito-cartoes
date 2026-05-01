import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { CarrinhoState } from '@core/services/carrinho-state/carrinho-state';
import { HeaderComponent } from '@shared/components/header/header';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, HeaderComponent],
    templateUrl: './app.html',
    styleUrls: ['./app.scss']
})
export class App implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  protected readonly carrinhoState = inject(CarrinhoState);
  private readonly subscriptions = new Subscription();
  private _title = '';
  private _isCarrinhoRoute = false;

  ngOnInit(): void {
    this.atualizarRota(this.router.url);

    this.subscriptions.add(
      this.router.events
        .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
        .subscribe(() => this.atualizarRota(this.router.url)),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  protected title(): string {
    return this._title;
  }

  protected isCarrinhoRoute(): boolean {
    return this._isCarrinhoRoute;
  }

  private atualizarRota(url: string): void {
    switch (true) {
      case url === '/':
      case url.startsWith('/home'):
        this._title = 'Home';
        break;
      case url.startsWith('/carrinho'):
        this._title = 'Carrinho';
        break;
      default:
        this._title = '';
        break;
    }

    this._isCarrinhoRoute = url.startsWith('/carrinho');
  }

  goToCart(): void {
    this.router.navigate(['/carrinho']);
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }
}
