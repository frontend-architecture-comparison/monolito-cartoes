import { CommonModule } from '@angular/common';
import { Component, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { catchError, map, of, switchMap } from 'rxjs';
import { Cartao } from '@core/models/cartao.model';
import { ListaCartoes } from '@core/services/lista-cartoes/lista-cartoes';
import { CarrinhoState } from '@core/services/carrinho-state/carrinho-state';
import { LojaCarrinho } from './carrinho.model';
import { LojaCarrinhoCard } from './components/loja-carrinho-card/loja-carrinho-card';

@Component({
    selector: 'app-carrinho',
    standalone: true,
    imports: [CommonModule, LojaCarrinhoCard],
    templateUrl: './carrinho.html',
    styleUrls: ['./carrinho.scss']
})
export class Carrinho implements OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly listaCartoes = inject(ListaCartoes);
  private readonly carrinhoState = inject(CarrinhoState);
  private readonly subscriptions = new Subscription();
  private ultimoIdProcessado: string | null = null;

  private _loading = true;
  private _erro = false;
  private _cartoesSelecionados: Cartao[] = [];

  constructor() {
    this.subscriptions.add(
      this.route.paramMap
        .pipe(
          map((params) => params.get('id')),
          switchMap((id) => {
            if (id && id !== this.ultimoIdProcessado) {
              this.ultimoIdProcessado = id;
              this.carrinhoState.adicionarItem(id);
            }

            const idsSelecionados = Object.keys(this.carrinhoState.itens());

            if (idsSelecionados.length === 0) {
              this._erro = false;
              this._loading = false;
              this._cartoesSelecionados = [];
              return of([] as Cartao[]);
            }

            this._loading = true;
            this._erro = false;

            return this.listaCartoes.getlistaCartoes().pipe(
              map((cartoes) =>
                cartoes.filter((cartao) =>
                  idsSelecionados.includes(String(cartao.id)),
                ),
              ),
              catchError((error) => {
                console.error('Erro ao carregar cartao selecionado:', error);
                this._erro = true;
                return of([] as Cartao[]);
              }),
            );
          }),
        )
        .subscribe((cartoes) => {
          this._cartoesSelecionados = cartoes;
          this._loading = false;
        }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loading(): boolean {
    return this._loading;
  }

  erro(): boolean {
    return this._erro;
  }

  cartoesSelecionados(): Cartao[] {
    return this._cartoesSelecionados;
  }

  lojas(): LojaCarrinho[] {
    const cartoes = this._cartoesSelecionados;
    const itensCarrinho = this.carrinhoState.itens();
    const idsSelecionados = Object.keys(itensCarrinho);

    if (cartoes.length === 0 || idsSelecionados.length === 0) {
      return [];
    }

    return cartoes
      .filter((cartao) => idsSelecionados.includes(String(cartao.id)))
      .map((cartao) => {
      const quantidade = itensCarrinho[String(cartao.id)];

      return {
        nome: cartao.nome,
        itens: [
          {
            nome: cartao.nome,
            imagem: cartao.img,
            limiteTotal: cartao.limiteTotal,
            limitePromocional: cartao.limitePromocional,
            anuidade: cartao.anuidade,
            quantidade: quantidade ?? 0,
          },
        ],
      };
    });
  }

  totalSelecionado(): number {
    return this.lojas().reduce(
      (total, loja) => total + loja.itens.reduce((soma, item) => soma + item.anuidade * item.quantidade * 12, 0),
      0,
    );
  }

  itensSelecionados(): number {
    return this.lojas().reduce(
      (total, loja) => total + loja.itens.reduce((soma, item) => soma + item.quantidade, 0),
      0,
    );
  }

  formatarMoeda(valor: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(valor);
  }

  atualizarQuantidade(cartaoId: string | number, novaQuantidade: number): void {
    this.carrinhoState.atualizarQuantidade(cartaoId, novaQuantidade);
  }

  onQuantidadeAlterada(evento: { lojaIndex: number; novaQuantidade: number }): void {
    const cartoes = this._cartoesSelecionados.filter((cartao) =>
      Object.keys(this.carrinhoState.itens()).includes(String(cartao.id)),
    );

    if (cartoes[evento.lojaIndex]) {
      this.carrinhoState.atualizarQuantidade(cartoes[evento.lojaIndex].id, evento.novaQuantidade);
    }
  }

  onItemRemovido(lojaIndex: number): void {
    const cartoes = this._cartoesSelecionados.filter((cartao) =>
      Object.keys(this.carrinhoState.itens()).includes(String(cartao.id)),
    );

    if (cartoes[lojaIndex]) {
      this.carrinhoState.removerItem(cartoes[lojaIndex].id);
    }
  }
}
