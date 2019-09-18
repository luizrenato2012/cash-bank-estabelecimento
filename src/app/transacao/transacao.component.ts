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

  incluiTransacoes() {
    let transacao: any = {};
    transacao.cnpj= "1111111111";
    transacao.data = this.zeraHora(new Date());
    transacao.percentualCashBask=3.5;
    transacao.usuario={};
    transacao.usuario.cpf="69454766007";
    transacao.usuario.nome="Austrenoma Castro Srina";
    
    transacao.valorTransacao=5.49;

    this.transacaoService.inclui(transacao)
      .then( ()=> console.log("Transacao incluida com sucesso"))
      .catch(error=> console.log(error));
  }

  zeraHora( data: Date) {
    data.setHours(0);
    data.setMinutes(0);
    data.setSeconds(0);
    data.setMilliseconds(0);
    return data;

  }

  logout() {
    console.log(' iniciando logout');
    this.loginService.logout();
  }

}
