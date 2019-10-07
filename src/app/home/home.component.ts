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
  //  console.log('onInit HomeComponent');
    let estabelecimento : any = {};
    console.log(`snapshot ${JSON.stringify(this.activatecRoute.snapshot.data)}`);
    
    this.activatecRoute.snapshot.data.estabelecimento
      .subscribe( (retorno:any) => {
      //  console.log('onInit subscribe ${JSON.stringify(retorno)}');
        this.estabelecimento=  retorno[0];
        this.nomeEstabelecimento = this.estabelecimento.nome;
        this.cnpj = this.estabelecimento.cnpj;
        this.usuario = this.estabelecimento.usuario.nome;
      })
    console.log(`estabelecimento ${JSON.stringify(this.estabelecimento)}`);
  }

}
