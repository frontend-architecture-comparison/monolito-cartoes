import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ListaCartoes } from './lista-cartoes';

describe('ListaCartoes', () => {
  let service: ListaCartoes;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ListaCartoes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
