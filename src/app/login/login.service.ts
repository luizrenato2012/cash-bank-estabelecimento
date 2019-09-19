import { Injectable, OnInit } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  private _mensagemLogin:string='';
  private emailUsuario: string;
  user : Observable<firebase.User>;
  
  constructor(private fireAuth :AngularFireAuth, 
    private router: Router) {
      console.log('-> criando  LoginService');
      this.user = this.fireAuth.user;    
    }
    

  login(email: string, password: string) {
    let erroConexao = {
      codigo :"auth/network-request-failed",
      descricao : "Erro ao conectar"
    }
    return new Promise( (resolve, reject) => {
      this.fireAuth.auth.signInWithEmailAndPassword(email, password)
        .then(userCredential=>{
          localStorage.user = userCredential.user.uid;
          localStorage.email = email; //TODO colocar em outro tipo de armazenamento

          this._mensagemLogin="";
          this.emailUsuario = email;
          this.router.navigate(['home/dashboard']);
        }).catch(error=>{
          console.log('Erro ao obter credenciais:\n'+error);
          this._mensagemLogin= error.code==erroConexao.codigo ?  erroConexao.descricao :
             "Login/senha invalido(s)!";
          reject(this._mensagemLogin);
        })
        .catch(error=> {
          console.log('Erro no login:\n'+error);
          this._mensagemLogin="Ocorreu um erro ao fazer login, tente novamente.";
          reject(this._mensagemLogin);
        });
    }) ;
  }

  logout() {
    this.fireAuth.auth.signOut();
    localStorage.removeItem("user");
    localStorage.removeItem("email");
    this.router.navigate(['/login']);
  }

  getMensagemLogin() {
    return this._mensagemLogin;
  }

  setMensagemLogin(msg: string) {
    this._mensagemLogin=msg;
  }

  getEmailUsuario() {
    return this.emailUsuario;
  }

}
