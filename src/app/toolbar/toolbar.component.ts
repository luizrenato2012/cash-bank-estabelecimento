import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private loginService : LoginService) { }

  ngOnInit() {
  }

  logoff() {
    this.loginService.logout();
  }

  getEstabelecimento() {
    let estabelecimento = this.loginService.getEstabelecimento() ;
    console.log(`get estabelecimento ${estabelecimento}`);
    return estabelecimento;
  }

  estaLogado() {
    let estabelecimento: any = this.loginService.getEstabelecimento();
    console.log(`cnpj- estabelcimento ${estabelecimento}`); 
    return estabelecimento.cnpj;
  }

  getUsuario() {
    let estabelecimento: any = this.loginService.getEstabelecimento();
    return estabelecimento ? estabelecimento.usuario.nome : ""; 
  }

}
