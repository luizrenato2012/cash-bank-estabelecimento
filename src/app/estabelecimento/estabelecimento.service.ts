import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable, Observer } from 'rxjs';

import { Estabelecimento } from './estabelecimento';
import { LoginService } from '../login/login.service';
import { EstabelecimentoCacheService } from './estabelecimento-cache.service';
import undefined = require('firebase/empty-import');
import { RepositionScrollStrategy } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class EstabelecimentoService {

  constructor(private firebaseDb : AngularFirestore, 
              private loginService: LoginService,
              private estabCache : EstabelecimentoCacheService ) {
    console.log("-> criando EstabelecimentoService");
  }
  
  getListaEstabelecimento(): Observable<Estabelecimento[]> {
   let email = this.loginService.getEmailUsuario();
   let estab: any = {};
   return this.firebaseDb.collection<Estabelecimento>("estabelecimento" , 
     ref => ref.where("usuario.email","==",email )).valueChanges(); 
 }

  buscaPorUsuario(email:string): Observable<Estabelecimento[]> {
    // console.log('buscando estabelcimento');
    return this.firebaseDb.collection<Estabelecimento>("estabelecimento" , 
      ref => ref.where("usuario.email","==",email )).valueChanges();
  }

   getEstabelecimento(): Observable<Estabelecimento[]>{

    let email = this.loginService.getEmailUsuario();
    // console.log(`getEstabelecimento -> email ${email}`);
    return this.buscaPorUsuario(email);
  }

  // getEstabelecimentoCache() {
  //   let lista :Observable<Estabelecimento[]> = this.estabCache.getEstabelecimento();

  //   return new Observable<Estabelecimento[]>( 
  //     (observer:Observer<Estabelecimento[]>) =>{
  //       lista.subscribe((retorno: Estabelecimento[])=>{
  //         if (retorno==null || retorno.length==0) {
  //           observer.next(this.buscaPorUsuario(email));
  //         } else {

  //         }
  //       });
  //   });
  // }

}
