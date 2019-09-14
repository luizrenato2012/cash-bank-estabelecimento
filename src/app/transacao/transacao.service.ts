import { Injectable } from '@angular/core';


import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Transacao, DataFirebase } from './transacao';

@Injectable({
  providedIn: 'root'
})
export class TransacaoService {

  constructor(private db: AngularFirestore) { }
  private transacoes = [];

  pesquisa(dataInicial: Date, dataFinal:Date) {
    const CNPJ="1111111111";
    console.log("Pesquisando transacoes");

    let retorno = this.db.collection("transacoes", 
      ref => ref
                .orderBy("data")
                // .where("cnpj","==", CNPJ)
                //.startAt("data", new Date('2019-09-01'))
                // .startAt(dataInicial)
                // .endAt(dataFinal)
                  .where("data", ">=", dataInicial)
                  .where("data", "<=", dataFinal)
                ).valueChanges();
                
    return retorno;

      // .subscribe(retorno => {
      //   console.log(`Total de registros ${retorno.length});
      //   this.transacoes = retorno;
      // });

  }

  inclui(transacao: any , dataEntrada: Date ) {
    transacao.id = this.db.createId();
    transacao.data = dataEntrada;
    let collection : AngularFirestoreCollection  =this.db.collection("transacoes"); 
    return collection.doc(transacao.id).set(transacao);
  }

  totalliza(transacoes : any []) {
    if (!transacoes || transacoes.length==0) {
      return 0;
    }
    return transacoes.map(transacao => transacao.valorTransacao)
      .reduce( (total, atual) => total+atual);
  }
  
}
