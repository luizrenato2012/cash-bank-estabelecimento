import { Injectable } from '@angular/core';


import { AngularFirestore, AngularFirestoreCollection, QueryFn } from '@angular/fire/firestore';

const CNPJ_1="1111111111";

@Injectable({
  providedIn: 'root'
})
export class TransacaoService {

  constructor(private db: AngularFirestore) {
  }

  private transacoes = [];

  //TODO passar parametro de CNPJ
  pesquisa(dataInicial: Date, dataFinal:Date, situacao:string, cnpj: string) {
    console.log("Pesquisando transacoes");
    let queryFnTodas = (ref) => ref
    .orderBy("data")
    .where("data", ">=", dataInicial)
    .where("data", "<=", dataFinal)
    .where("cnpj", "==", cnpj);

    let queryFnsituacao = (ref) => ref
      .orderBy("data")
      .where("data", ">=", dataInicial)
      .where("data", "<=", dataFinal)
      .where("situacao.codigo", "==", situacao)
      .where("cnpj", "==", cnpj);

    let retorno = this.db.collection("transacoes", ( 
        situacao=='TODAS' ? queryFnTodas : queryFnsituacao )
      ).valueChanges();  

    return retorno;
  }

  // pesquisaDiaAtual() {
  //   let  dataAtual = new Date();
  //   dataAtual.setHours(0);
  //   dataAtual.setMinutes(0);
  //   dataAtual.setSeconds(0);
  //   dataAtual.setMilliseconds(0);

  //   return this.db.collection("transacoes", 
  //     ref => ref.where("data", "==", dataAtual))
  //       .valueChanges();
  // }

  pesquisaTransacoesHoje(cnpj: string) {
    let  dataAtual = new Date();
    dataAtual.setHours(0);
    dataAtual.setMinutes(0);
    dataAtual.setSeconds(0);
    dataAtual.setMilliseconds(0);

    return this.db.collection("transacoes", 
      ref => ref.where(
          "data", "==", dataAtual)
          .where("cnpj","==", cnpj))
        .valueChanges();
  }

  inclui(transacao: any ) {
    transacao.id = this.db.createId();
    let collection : AngularFirestoreCollection  =this.db.collection("transacoes"); 
    return collection.doc(transacao.id).set(transacao);
  }

  async setaHora()  {
    let listaIds : string[] = []; 
    let transacoes : any[] = [];
    console.log('inclui hora');
   let hora =new Date();

    let collection :  AngularFirestoreCollection  = this.db.collection("transacoes");
    collection.valueChanges()
      .subscribe(retorno=>  
        retorno.forEach(transacao => {
          console.log(' alterando Data');
          Object.assign(hora, transacao.data.toDate());
          transacao.hora = hora;
          //  collection.doc(transacao.id).update(transacao);
    }));
    
  }

  totalliza(transacoes : any []) {
    if (!transacoes || transacoes.length==0) {
      return 0;
    }
    return transacoes.map(transacao => transacao.valorTransacao)
      .reduce( (total, atual) => total+atual);
  }
  
}
