import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

interface Cartao {
  id: number;
  img: string;
  nome: string;
  limiteTotal: number;
  limitePromocional: number;
  anuidade: number;
}

@Injectable({
  providedIn: 'root',
})
export class ListaCartoes {

  private url_api: string = 'http://localhost:3000/cartoes';
  private readonly http = inject(HttpClient);

  getlistaCartoes() {
    return this.http.get<Cartao[]>(this.url_api);
  }
}
