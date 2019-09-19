import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { TransacaoService } from './transacao.service';
import { EstabelecimentoService } from '../estabelecimento/estabelecimento.service';

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
  displayedColumns = ["data", "cpf", "nome", "percentualCashBack","valorTransacao"];

  transacao : any = {};
  dataTransacao : Date;

  transacoes = [];
  valorTotal : number

  constructor( private loginService: LoginService, 
              private transacaoService: TransacaoService,
              private estabelecimentoService : EstabelecimentoService) { }

  ngOnInit() {
  }

  pesquisa() {
    //console.log(`pesquisando ${this.dataInicial} - ${this.dataFinal}`);
    this.transacaoService.pesquisa(this.dataInicial, this.dataFinal)
      .subscribe(retorno =>  {
                this.transacoes = retorno;
                this.valorTotal = this.transacaoService.totalliza(this.transacoes);
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
