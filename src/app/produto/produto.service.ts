import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Produto } from './produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private db: AngularFirestore) { }

  pesquisaProdutos(argumento: string) {
    if (argumento) {
     return this.db.collection<Produto>("produtos" , 
         ref => ref.where("nome", "==", argumento).orderBy("id")).valueChanges();
      //  .subscribe(retorno => this.linhas = retorno);
    } else {
      return  this.db.collection<Produto>("produtos").valueChanges();
      //  .subscribe(retorno => this.linhas = retorno);
    }
  }
}
