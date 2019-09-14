import { Component, OnInit } from '@angular/core';
import { ProdutoService } from './produto.service';
import { Produto } from './produto';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  argumento="";
  linhas : Produto [] = [];
  constructor(private service: ProdutoService) { }


  ngOnInit() {
  }

  pesquisa() {
    console.log(`pesquisando ${this.argumento}`);
    this.service.pesquisaProdutos(this.argumento)
      .subscribe(retorno => this.linhas=retorno);
  }

}
