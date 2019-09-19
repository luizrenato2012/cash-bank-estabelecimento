import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Estabelecimento } from '../estabelecimento/estabelecimento';
import { Observable } from 'rxjs';
import { EstabelecimentoService } from '../estabelecimento/estabelecimento.service';
import { TransacaoService } from '../transacao/transacao.service';

export interface Transaction {
  item: string;
  cost: number;
}

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.css']
})
export class TesteComponent  {

  valor1:number = 5;
  valor2:number = 12.3;
  valor3:number = 55.234;

  constructor( private transacaoService: TransacaoService) { }


  incluiTransacoes() {
    let transacao: any = {};
    transacao.cnpj= "1111111111";
    transacao.data = this.zeraHora(new Date());
    transacao.percentualCashBask=3.5;
    transacao.usuario={};
    transacao.usuario.cpf="05580935072";
    transacao.usuario.nome="Estilio Sanio";
    
    transacao.valorTransacao=10.49;

    this.transacaoService.inclui(transacao)
      .then( ()=> console.log("Transacao incluida com sucesso"))
      .catch(error=> console.log(error));
  }

  zeraHora( data: Date) {
    data.setHours(0);
    data.setMinutes(0);
    data.setSeconds(0);
    data.setMilliseconds(0);
    return data;

  }


}
