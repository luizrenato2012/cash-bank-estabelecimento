import { Component, OnInit } from '@angular/core';
import { Estabelecimento } from '../estabelecimento/estabelecimento';
import { Observable, Observer, from } from 'rxjs';
import { TransacaoService } from '../transacao/transacao.service';
import { map, first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

import { HttpClient } from '@angular/common/http';
import { EstabelecimentoCacheService } from '../estabelecimento/estabelecimento-cache.service';
import { registerContentQuery } from '@angular/core/src/render3/instructions';

export interface Produto {
  id: number;
  descricao : string;
  preco:number;
}

export class Registro {
  id:string;
  cnpj: string;
  data : Date;
  hora: Date;

  valorCashBack: number;
  percentualCashBack: string;
  valorTransacao: string;

  situacao: any;
  usuario: any;
} 

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.css']
})
export class TesteComponent  {

  valor1:number = 5;
  valor2:number = 12.3;
  valor3:number = 55.234;

  transacao : any = {};
  dataTransacao: Date;
  valorTransacao : string;
  percentualCashBack: string;

  constructor( private transacaoService: TransacaoService,
              private snackBar: MatSnackBar,
              private httpClient : HttpClient,
              private estabCache : EstabelecimentoCacheService) {
                this.transacao.usuario={};
               }
  

  async grava() {
    let estabelecimento = await this.estabCache.getEstabelecimento();
    this.transacao.cnpj = estabelecimento.cnpj;
    this.transacao.hora = new Date();
    Object.assign(this.transacao.hora, this.transacao.data);
    this.transacao.data = this.zeraHora(this.dataTransacao);
    this.transacao.situacao = { "codigo": "PENDENTE", "dataAtualizacao": new Date() };
    
    this.transacao.valorTransacao = parseInt(this.valorTransacao);
    this.transacao.percentualCashBack = parseInt( this.percentualCashBack);

    this.transacao.valorCashBack = (this.transacao.valorTransacao / 100) * this.transacao.percentualCashBack;

    alert(`Gravando ${JSON.stringify(this.transacao)}`);
    this.transacaoService.inclui(this.transacao).then(
      (retorno) => {
        this.snackBar.open("Registro gravado com suceso", "Teste", {duration: 2000});
      }, (error) => {
        console.log(`Erro ao gravar \n${error}`);
        this.snackBar.open("Erro na gravação", "Teste", {duration: 2000});
      });
  }

  incluiTransacoes() {
    let transacao: any = {};
    transacao.cnpj= "1111111111";
    transacao.data = this.zeraHora(new Date());
    transacao.percentualCashBask=3.5;
    transacao.usuario={};
    transacao.usuario.cpf="05580935072";
    transacao.usuario.nome="Estilio Sanio";
    
    transacao.valorTransacao=10.49;

    this.transacaoService.inclui(transacao)
      .then( ()=> { 
                console.log("Transacao incluida com sucesso");
                this.limpaTransacao();
              })
      .catch(error=> console.log(error));
  }

  limpaTransacao() {
    this.transacao = {};
    this.transacao.usuario={};
    this.valorTransacao="";
    this.percentualCashBack="";
  }

  zeraHora( data: Date) {
    data.setHours(0);
    data.setMinutes(0);
    data.setSeconds(0);
    data.setMilliseconds(0);
    return data;
  }

  array = [1,2,3,4,5];

  testeMap() {

    from (this.array).subscribe( (x)=> {
      console.log(x);
    });

    let obs: Observable<number> = Observable.create( (observer: Observer<number>)=>{
      this.array.forEach( i => observer.next(i));
      observer.complete();
    });

    obs.pipe(
      map( i=> i *10 )
    ).subscribe( 
      retorno=> console.log(retorno), 
      (error)=> console.error(error), 
      ()=> {
        console.log('Completado');
    });

    obs.pipe(
      first(),
    ).subscribe( retorno => console.log(retorno));

  }

  teste() {
    this.testeCache();
  }
  
  async testeCache() {
    try {
      console.log('1 - Iniciando cache ');

      let retorno : Estabelecimento = await this.estabCache.getEstabelecimento();

      alert(`2 - Finalizando cache ${JSON.stringify(retorno)}`);
    } catch(error) {
      console.error (`erro em teste cache ${error}`);
    }
  }

  async testeEnvioHttpSicrono() {
    console.log('1 - chamando envio');
    let retorno: Produto[] = await this.getProdutoAsync();
    console.log(`4 - Retorno ${JSON.stringify(retorno)}`);
    console.log(`5 - Finalizado!`);
    alert(`Resultado:\n ${JSON.stringify(retorno)}`);

  }
  
  getProdutoAsync() {
    console.log(">>> 2 - enviando teste async");
    let url="http://localhost:3000/produtos";
    return this.httpClient.get<Produto[]>(url).toPromise();
  }

}
