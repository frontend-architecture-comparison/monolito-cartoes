import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  title = input('');
  showBack = input(false);
  cartQuantidade = input(0);

  homeClicked = output<void>();
  cartClicked = output<void>();

  onHomeClick(): void {
    this.homeClicked.emit();
  }

  onCartClick(): void {
    this.cartClicked.emit();
  }
}
