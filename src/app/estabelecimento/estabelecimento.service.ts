import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Estabelecimento } from './estabelecimento';

@Injectable({
  providedIn: 'root'
})
export class EstabelecimentoService {

  constructor(private firebaseDb : AngularFirestore ) {}
  estabelecimento : Estabelecimento;


  busca (cnpj: string) {
    return this.firebaseDb.collection<Estabelecimento>("estabelecimento" , 
      ref => ref.where("cnpj","==",cnpj)).valueChanges()
        .subscribe( 
            retorno => {this.estabelecimento = retorno[0];
            return this.estabelecimento;
        });
  }

  buscaPorUsuario(email:string) {
    return this.firebaseDb.collection<Estabelecimento>("estabelecimento" , 
      ref => ref.where("usuario.email","==",email )).valueChanges();
  }
}
