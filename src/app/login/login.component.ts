import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { EstabelecimentoCacheService } from '../estabelecimento/estabelecimento-cache.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email='';
  password='';
  mensagem='';

  constructor(private loginService : LoginService,
              private estabelecimentoService : EstabelecimentoCacheService) { }

  ngOnInit() {
    this.mensagem= this.loginService.getMensagemLogin();
    this.estabelecimentoService.apaga();
  }

  login() {
    console.log('Executando login');
    this.loginService.setMensagemLogin("");
    this.loginService.login(this.email, this.password)
      .catch(error => {
        this.mensagem = error;
      });

  }

  limpaMensagem() {
    this.mensagem="";
  }

}
