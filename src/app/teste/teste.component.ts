import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Estabelecimento } from '../estabelecimento/estabelecimento';
import { Observable } from 'rxjs';
import { EstabelecimentoService } from '../estabelecimento/estabelecimento.service';

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

  displayedColumns: string[] = ['item', 'cost'];
  transactions: Transaction[]; 

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }


  constructor(private db : AngularFirestore, private estabelecimentoService: EstabelecimentoService) { }

  teste() {
    this.transactions =  [
      {item: 'Beach ball', cost: 4},
      {item: 'Towel', cost: 5},
      {item: 'Frisbee', cost: 2},
      {item: 'Sunscreen', cost: 4},
      {item: 'Cooler', cost: 25},
      {item: 'Swim suit', cost: 15},
    ];
    // let email="mauro@vestebem.com.br";
    // let cnpj="1111111111";
    // return this.db.collection<Estabelecimento>("estabelecimento" , 
    //     // ref => ref.where("cnpj","==",cnpj ))
    //    ref => ref.where("usuario.email","==",email))
    //             .valueChanges()
    //             .subscribe(retorno=> {
    //     console.log(`retorno ${retorno}`);
    //   });
  }


}
