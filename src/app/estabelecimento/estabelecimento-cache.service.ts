import { Injectable } from '@angular/core';
import { Estabelecimento } from './estabelecimento';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstabelecimentoCacheService {

  estabelecimento: Observable< Estabelecimento[]>;

  constructor() { }

  getEstabelecimento(): Observable<Estabelecimento[]>{
    return this.estabelecimento;
  }

  setEstabelecimento(estab : Observable<Estabelecimento[]>) {
    this.estabelecimento = estab;
  }


  anula() {
    this.estabelecimento = null;
  }
}
