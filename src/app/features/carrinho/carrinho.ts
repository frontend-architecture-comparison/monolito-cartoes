import { computed, Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, map, of, switchMap } from 'rxjs';
import { Cartao } from '@core/models/cartao.model';
import { ListaCartoes } from '@core/services/lista-cartoes/lista-cartoes';
import { CarrinhoState } from '@core/services/carrinho-state/carrinho-state';
import { LojaCarrinhoCardModule } from './components/loja-carrinho-card/loja-carrinho-card.module';
import { LojaCarrinho } from './carrinho.model';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [LojaCarrinhoCardModule],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.scss',
})
export class Carrinho {
  private readonly route = inject(ActivatedRoute);
  private readonly listaCartoes = inject(ListaCartoes);
  private readonly carrinhoState = inject(CarrinhoState);

  readonly loading = signal(true);
  readonly erro = signal(false);
  readonly cartoesSelecionados = signal<Cartao[]>([]);

  readonly lojas = computed<LojaCarrinho[]>(() => {
    const cartoes = this.cartoesSelecionados();
    const itensCarrinho = this.carrinhoState.itens();

    if (cartoes.length === 0) {
      return [];
    }

    return cartoes.map((cartao) => {
      const quantidade = itensCarrinho[String(cartao.id)] ?? 1;

      return {
        nome: cartao.nome,
        itens: [
          {
            nome: cartao.nome,
            imagem: cartao.img,
            limiteTotal: cartao.limiteTotal,
            limitePromocional: cartao.limitePromocional,
            anuidade: cartao.anuidade,
            quantidade,
          },
        ],
      };
    });
  });

  readonly totalSelecionado = computed(() =>
    this.lojas().reduce(
      (total, loja) => total + loja.itens.reduce((soma, item) => soma + item.anuidade * item.quantidade * 12, 0),
      0,
    ),
  );

  readonly itensSelecionados = computed(() =>
    this.lojas().reduce(
      (total, loja) => total + loja.itens.reduce((soma, item) => soma + item.quantidade, 0),
      0,
    ),
  );

  constructor() {
    this.route.paramMap
      .pipe(
        map((params) => params.get('id')),
        switchMap((id) => {
          if (id) {
            this.carrinhoState.adicionarItem(id);
          }

          const idsSelecionados = Object.keys(this.carrinhoState.itens());

          if (idsSelecionados.length === 0) {
            this.erro.set(false);
            this.loading.set(false);
            this.cartoesSelecionados.set([]);
            return of([] as Cartao[]);
          }

          this.loading.set(true);
          this.erro.set(false);

          return this.listaCartoes.getlistaCartoes().pipe(
            map((cartoes) =>
              cartoes.filter((cartao) =>
                idsSelecionados.includes(String(cartao.id)),
              ),
            ),
            catchError((error) => {
              console.error('Erro ao carregar cartao selecionado:', error);
              this.erro.set(true);
              return of([] as Cartao[]);
            }),
          );
        }),
        takeUntilDestroyed(),
      )
      .subscribe((cartoes) => {
        this.cartoesSelecionados.set(cartoes);
        this.loading.set(false);
      });
  }

  formatarMoeda(valor: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(valor);
  }
}
