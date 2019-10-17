import { Injectable } from '@angular/core';
import { Estabelecimento } from './estabelecimento';
import { Observable, Observer } from 'rxjs';
import { EstabelecimentoService } from './estabelecimento.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EstabelecimentoCacheService {

  estabelecimento:  Estabelecimento;

  constructor(private estabelecimentoService :EstabelecimentoService,
              private firebaseDb : AngularFirestore) { 
    console.log('>>> Criando cache estabelecimento');
  }

  async getEstabelecimento(refresh? : boolean) {
    try {
      // console.log(">> INICIO getEstabelecimento");
      if (this.estabelecimento && !refresh) {
        console.log(`>>> retornando o proprio estabelecimento`);
        return this.estabelecimento;
      }

      console.log(`>>> buscando estabelecimento`);
      let email = localStorage.getItem("email");  
      
      let lista: Estabelecimento[] = await this.busca2(email);
      this.estabelecimento = lista[0];
      // console.log(">> FIM getEstabelecimento");     
      return this.estabelecimento;   
    } catch ( error) {
      console.log(`Erro ao buscar estabelecimento\n ${error}`);
    }
  }

  async busca2(email:string) {
    return await this.firebaseDb.collection<Estabelecimento>("estabelecimento" , 
              ref => ref.where("usuario.email","==",email ))
              .valueChanges()
              .pipe( take(1))
              .toPromise();
  }

  // async getEstabelecimentoOld() {
  //   try {

  //     let email = localStorage.getItem("email");  
  //     console.log(` email ${email}`);
  //     return await this.firebaseDb.collection<Estabelecimento>("estabelecimento" , 
  //             ref => ref.where("usuario.email","==",email ))
  //             .valueChanges()
  //             .pipe( take(1))
  //             .toPromise();
  //   } catch ( error) {
  //     console.log(`Erro ao buscar estabelecimento\n ${error}`);
  //   }
  // }

  apaga() {
    this.estabelecimento = null;
  }
}
