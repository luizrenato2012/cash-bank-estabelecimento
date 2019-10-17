import { Component, OnInit } from '@angular/core';
import { TransacaoService } from '../transacao/transacao.service';
import { Estabelecimento } from '../estabelecimento/estabelecimento';
import { LoginService } from '../login/login.service';
import { EstabelecimentoCacheService } from '../estabelecimento/estabelecimento-cache.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  transacoes : any [] = [];
  displayedColumns = ["data", "cpf", "nome", "percentualCashBack","valorTransacao"];

  saldoDia:number=0;
  saldoTotal: number=0;
  dataAtual: Date;

  constructor(private transacaoService : TransacaoService, 
              private loginService: LoginService,
              private estabelecimentoCache: EstabelecimentoCacheService ) {}
    
  ngOnInit(): void {
    this.dataAtual = new Date();
      this.buscaTransacoesDoDia();
  }

  async buscaTransacoesDoDia() {

    let estabelecimento : Estabelecimento = await this.estabelecimentoCache.getEstabelecimento(true);
    this.saldoTotal = estabelecimento.saldo;

    this.transacaoService.pesquisaTransacoesHoje(estabelecimento.cnpj)
      .subscribe((retorno: any[])=>{
        this.transacoes = retorno;
        this.saldoDia = this.transacaoService.totalliza(this.transacoes);
      });

  }

  teste() {
    let email = this.loginService.getEmailUsuario();
    console.log(`email: ${email}`);
  }
}
