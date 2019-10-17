import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EstabelecimentoService } from '../estabelecimento/estabelecimento.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  usuario:string='';
  nomeEstabelecimento: string='';
  cnpj: string='';
  estabelecimento:any = {};

  constructor(private loginService : LoginService, 
              private activatecRoute: ActivatedRoute ) { }
  
  ngOnInit(): void {
    this.estabelecimento = this.activatecRoute.snapshot.data.estabelecimento;
    this.nomeEstabelecimento = this.estabelecimento.nome;
    this.cnpj = this.estabelecimento.cnpj;
    this.usuario = this.estabelecimento.usuario.nome;
  }

}
