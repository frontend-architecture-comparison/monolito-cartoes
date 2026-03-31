import { Component } from '@angular/core';
import { CardCartao } from "./components/card-cartao/card-cartao";

@Component({
  selector: 'app-cartoes',
  standalone: true,
  imports: [CardCartao],
  templateUrl: './cartoes.html',
  styleUrl: './cartoes.scss',
})
export class Cartoes {}
