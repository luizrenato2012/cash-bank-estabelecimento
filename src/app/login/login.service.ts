import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { EstabelecimentoService } from '../estabelecimento/estabelecimento.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _mensagemLogin:string='';
  private estabelecimento: any = {};

  constructor(private fireAuth :AngularFireAuth, 
              private router: Router,
              private estabelecimentoService : EstabelecimentoService) {
    console.log('criando login');
    this.user = this.fireAuth.user;    
   }

  user : Observable<firebase.User>;

  login(email: string, password: string) {
    let erroConexao = {
      codigo :"auth/network-request-failed",
      descricao : "Erro ao conectar"
    }
    return new Promise( (resolve, reject) => {
      this.fireAuth.auth.signInWithEmailAndPassword(email, password)
        .then(userCredential=>{
          localStorage.user = userCredential.user.uid;
          this._mensagemLogin="";

          console.log("Pesquisanfo estabelecimento ");
          this.estabelecimentoService.buscaPorUsuario(email)
            .subscribe(retorno => {
              console.log(`Estabelecimento ${JSON.stringify(retorno)}`);
              this.estabelecimento = retorno.length == 0 ? {} : retorno[0];
            });

          this.router.navigate(['home']);
        }).catch(error=>{
          console.log('Erro ao obter credenciais:\n'+error);
          this._mensagemLogin= error.code==erroConexao.codigo ?  erroConexao.descricao :
             "Login/senha invalido(s)!";
          reject(this._mensagemLogin);
          //this.router.navigate(['/login']);
        })
        .catch(error=> {
          console.log('Erro no login:\n'+error);
          this._mensagemLogin="Ocorreu um erro ao fazer login, tente novamente.";
          reject(this._mensagemLogin);
          //this.router.navigate(['/login']);
        });
    }) ;
  } "auth/network-request-failed"

  logout() {
    this.fireAuth.auth.signOut();
    localStorage.removeItem("user");
    this.estabelecimento={};
    this.router.navigate(['/login']);
  }

  getMensagemLogin() {
    console.log('retornandon ' + this._mensagemLogin);
    return this._mensagemLogin;
  }

  setMensagemLogin(msg: string) {
    this._mensagemLogin=msg;
  }

  getEstabelecimento() {
    if (!this.estabelecimento.cnpj) {
      console.log('Dados do estabelecimento invalidos');
    }
    console.log(`Estabelecimento ${JSON.stringify(this.estabelecimento)}`);
    return this.estabelecimento;
  }

}
