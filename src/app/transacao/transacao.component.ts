import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { TransacaoService } from './transacao.service';
import { EstabelecimentoService } from '../estabelecimento/estabelecimento.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { EstabelecimentoCacheService } from '../estabelecimento/estabelecimento-cache.service';
import { Estabelecimento } from '../estabelecimento/estabelecimento';

@Component({
  selector: 'app-transacao',
  templateUrl: './transacao.component.html',
  styleUrls: ['./transacao.component.css']
})
export class TransacaoComponent implements OnInit {

  title = 'app';
  argumento="";
  dataInicial: Date;
  dataFinal: Date;
  displayedColumns = ["cnpj", "data", "cpf", "nome", "valorTransacao", "percentualCashBack","valorCashBack","situacao"];

  transacao : any = {};
  dataTransacao : Date;

  transacoes = [];
  valorTotal : number;
  situacao:string;

  constructor( private loginService: LoginService, 
              private transacaoService: TransacaoService,
              private estabelecimentoService : EstabelecimentoService,
              private estabelecimentoCache : EstabelecimentoCacheService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  async pesquisa(form: NgForm) {
    console.log(`pesquisando ${this.situacao}`);
    let estabelecimento: Estabelecimento = await this.estabelecimentoCache.getEstabelecimento();
    
    this.transacaoService.pesquisa(this.dataInicial, this.dataFinal, this.situacao, estabelecimento.cnpj)
      .subscribe(retorno =>  {
                this.transacoes = retorno;
                let mensagem = `Encontradas ${this.transacoes.length} transações!`;
                this.snackBar.open(mensagem, "Pesquisar", {
                  duration: 2000
                });
                this.valorTotal = this.transacaoService.totaliza(this.transacoes);
              },
              error => {
                console.log(error);
                this.snackBar.open("Erro ao pesquisar transações", "Pesquisar", {
                  duration: 2000
                });
              });
  }

  inclui() {
    console.log('incluindo transacao');
    this.transacao.data = this.dataTransacao;
    this.transacaoService.inclui(this.transacao)
      .then( ()=> {
        console.log("Transacao incluida com sucesso");
        this.transacao={};
      })
      .catch(error=> console.log("Erro ao incluir\n "+ error)) ;
  }

  logout() {
    console.log(' iniciando logout');
    this.loginService.logout();
  }

}
