import { computed, Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, map, of, switchMap } from 'rxjs';
import { Cartao } from '@core/models/cartao.model';
import { ListaCartoes } from '@core/services/lista-cartoes/lista-cartoes';
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

  readonly loading = signal(true);
  readonly erro = signal(false);
  readonly cartaoSelecionado = signal<Cartao | null>(null);

  readonly lojas = computed<LojaCarrinho[]>(() => {
    const cartao = this.cartaoSelecionado();

    if (!cartao) {
      return [];
    }

    return [
      {
        nome: cartao.nome,
        itens: [
          {
            nome: cartao.nome,
            imagem: cartao.img,
            limiteTotal: cartao.limiteTotal,
            limitePromocional: cartao.limitePromocional,
            anuidade: cartao.anuidade,
            quantidade: 1,
          },
        ],
      },
    ];
  });

  readonly totalSelecionado = computed(() =>
    this.lojas().reduce(
      (total, loja) => total + loja.itens.reduce((soma, item) => soma + item.anuidade * item.quantidade * 12, 0),
      0,
    ),
  );

  readonly itensSelecionados = computed(() =>
    this.lojas().reduce((total, loja) => total + loja.itens.length, 0),
  );

  constructor() {
    this.route.paramMap
      .pipe(
        map((params) => params.get('id')),
        switchMap((id) => {
          if (!id) {
            this.erro.set(false);
            this.loading.set(false);
            this.cartaoSelecionado.set(null);
            return of(null);
          }

          this.loading.set(true);
          this.erro.set(false);

          return this.listaCartoes.getCartaoPorId(id).pipe(
            catchError((error) => {
              console.error('Erro ao carregar cartao selecionado:', error);
              this.erro.set(true);
              return of(null);
            }),
          );
        }),
        takeUntilDestroyed(),
      )
      .subscribe((cartao) => {
        this.cartaoSelecionado.set(cartao);
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
