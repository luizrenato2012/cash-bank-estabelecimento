import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TransacaoComponent } from './transacao/transacao.component';
import { Routes, RouterModule } from '@angular/router';
import { ProdutoComponent } from './produto/produto.component';
import { TesteComponent } from './teste/teste.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeResolve } from './home/home.resolve';
//import { RouterModule } from '@angular/router'

const routes : Routes = [
  { path: '' , component : LoginComponent },
  { path: 'login' , component : LoginComponent },
  { path: 'home' ,  component : HomeComponent , 
    children : [
      { path: 'pesquisa' ,  component : TransacaoComponent },
      { path: 'dashboard' ,  component : DashboardComponent }
    ],
    resolve : {
      estabelecimento : HomeResolve
    }
  },
  { path: '**' ,     component : NotFoundComponent },
  { path: 'teste' ,  component : TesteComponent },
  { path: '', redirectTo: 'home/dashboard', pathMatch: 'full'},
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports :[
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
