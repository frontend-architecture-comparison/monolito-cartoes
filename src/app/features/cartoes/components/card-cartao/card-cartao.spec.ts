import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCartao } from './card-cartao';

describe('CardCartao', () => {
  let component: CardCartao;
  let fixture: ComponentFixture<CardCartao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardCartao],
    }).compileComponents();

    fixture = TestBed.createComponent(CardCartao);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
