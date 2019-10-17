import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable, Observer, pipe } from 'rxjs';

import { Estabelecimento } from './estabelecimento';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class EstabelecimentoService {

  constructor(private firebaseDb : AngularFirestore, 
              private loginService: LoginService) {
    console.log("-> criando EstabelecimentoService");
  }
  
  getListaEstabelecimento(): Observable<Estabelecimento[]> {
   let email = this.loginService.getEmailUsuario();
   let estab: any = {};
   return this.firebaseDb.collection<Estabelecimento>("estabelecimento" , 
     ref => ref.where("usuario.email","==",email )).valueChanges(); 
 }

 getEstabelecimento(): Observable<Estabelecimento[]>{

  let email = localStorage.email;  //this.loginService.getEmailUsuario();
  if (!email) throw new Error("Email invalido");
  // console.log(`getEstabelecimento -> email ${email}`);
  return this.buscaPorUsuario(email);
}

  buscaPorUsuario(email:string): Observable<Estabelecimento[]> {
    // console.log('buscando estabelcimento');
    return this.firebaseDb.collection<Estabelecimento>("estabelecimento" , 
      ref => ref.where("usuario.email","==",email )).valueChanges();
  }

  buscaPorUsuarioAsync(email:string) {
    return this.firebaseDb.collection<Estabelecimento>("estabelecimento" , 
      ref => ref.where("usuario.email","==",email )).valueChanges().toPromise();
  }

}
