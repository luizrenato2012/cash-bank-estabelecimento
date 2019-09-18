import { Injectable } from '@angular/core';


import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Transacao, DataFirebase } from './transacao';

const CNPJ_1="1111111111";

@Injectable({
  providedIn: 'root'
})
export class TransacaoService {

  constructor(private db: AngularFirestore) { }
  private transacoes = [];

  //TODO passar parametro de CNPJ
  pesquisa(dataInicial: Date, dataFinal:Date) {
    // console.log("Pesquisando transacoes");

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
  }

  pesquisaDiaAtual() {
    console.log("Pesquisando transacoes");
    let  dataAtual = new Date();
    dataAtual.setHours(0);
    dataAtual.setMinutes(0);
    dataAtual.setSeconds(0);
    dataAtual.setMilliseconds(0);

    return this.db.collection("transacoes", 
      ref => ref.where("data", "==", dataAtual))
        .valueChanges();
  }

  inclui(transacao: any ) {
    transacao.id = this.db.createId();
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
