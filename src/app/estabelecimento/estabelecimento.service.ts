import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable, Observer } from 'rxjs';

import { Estabelecimento } from './estabelecimento';
import { LoginService } from '../login/login.service';
import { async } from 'rxjs/internal/scheduler/async';

@Injectable({
  providedIn: 'root'
})
export class EstabelecimentoService {

  constructor(private firebaseDb : AngularFirestore, private loginService: LoginService ) {}
  // estabelecimento : Estabelecimento;


  // busca (cnpj: string) {
  //   return this.firebaseDb.collection<Estabelecimento>("estabelecimento" , 
  //     ref => ref.where("cnpj","==",cnpj)).valueChanges()
  //       .subscribe( 
  //           // retorno => {this.estabelecimento = retorno[0];
  //           // return this.estabelecimento;
            
  //       });
  // }

  buscaPorUsuario(email:string) {
    console.log('buscando estabelcimento');
    return this.firebaseDb.collection<Estabelecimento>("estabelecimento" , 
      ref => ref.where("usuario.email","==",email )).valueChanges();
  }

  async getEstabelecimento(){
    console.log('getEstabelecimento');
    return this.buscaPorUsuario(this.loginService.getEmailUsuario());
    // if (this.estabelecimento==undefined || this.estabelecimento==null ) {
    //   this.buscaPorUsuario(this.loginService.getEmailUsuario())
    //     .subscribe(retorno=>  {
    //       console.log(`Retorno JSON.stringfy(${retorno})`);
    //       this.estabelecimento = retorno[0];
    //       return new Observable ((observer: Observer<any>)=> {
    //         if (this.estabelecimento==undefined || this.estabelecimento==null ) {
    //           observer.error('Estabalecimento nao encontrado');
    //         } else {
    //           observer.next(this.estabelecimento);
    //         }
    //       });
    //     });
    // } else { 
    //   return new Observable((observer: Observer<any>)=> {
    //     observer.next(this.estabelecimento);
    //   });
    // }
  }

}
