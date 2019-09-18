import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { TransacaoService } from '../transacao/transacao.service';
import { EstabelecimentoService } from '../estabelecimento/estabelecimento.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',

  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  transacoes : any [] = [];
  displayedColumns = ["data", "cpf", "nome", "percentualCashBack","valorTransacao"];

  saldoDia:number=0;
  
  constructor(private transacaoService : TransacaoService, 
    private estabelecimentoService : EstabelecimentoService) {}
    
  ngOnInit(): void {
      this.buscaTransacoesDoDia();
  }

  buscaTransacoesDoDia() {
    this.transacaoService.pesquisaDiaAtual()
      .subscribe( retorno => {
          this.transacoes = retorno;
          this.saldoDia = this.transacaoService.totalliza(this.transacoes);
        },
        error => {
          console.log("Erro ao buscas transacoes");
          console.log(JSON.stringify(error));
        }
        );
  }
}
