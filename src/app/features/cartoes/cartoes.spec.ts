import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { Cartoes } from './cartoes';
import { ListaCartoes } from '../../core/services/lista-cartoes/lista-cartoes';

describe('Cartoes', () => {
  let component: Cartoes;
  let fixture: ComponentFixture<Cartoes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cartoes],
      providers: [
        {
          provide: ListaCartoes,
          useValue: {
            getlistaCartoes: () => of([]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Cartoes);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
