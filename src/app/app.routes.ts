import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/cartoes/cartoes').then((m) => m.Cartoes),
  },
  {
    path: 'carrinho',
    loadComponent: () =>
      import('./features/carrinho/carrinho').then((m) => m.Carrinho),
  },
  {
    path: 'carrinho/:id',
    loadComponent: () =>
      import('./features/carrinho/carrinho').then((m) => m.Carrinho),
  },
];
