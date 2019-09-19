import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule, AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { LoginComponent } from './login/login.component';
import { TransacaoComponent } from './transacao/transacao.component';
import { AppRoutingModule } from './/app-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginService } from './login/login.service';
import { EstabelecimentoComponent } from './estabelecimento/estabelecimento.component';
import { ProdutoComponent } from './produto/produto.component';
import { ProdutoService } from './produto/produto.service';
import { environment } from 'src/environments/environment';
import { TimestampToDate } from './transacao/timestamp-to-date';
import { TesteComponent } from './teste/teste.component';
import { EstabelecimentoService } from './estabelecimento/estabelecimento.service';
import { HomeComponent } from './home/home.component';

import { MaterialModule } from './material/material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule } from '@angular/material';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    TimestampToDate,
    AppComponent,
    LoginComponent,
    TransacaoComponent,
    NotFoundComponent,
    EstabelecimentoComponent,
    ProdutoComponent,
    TesteComponent,
    ToolbarComponent,
    HomeComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.configFirebase),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule
  ],
  providers: [AngularFireStorage, 
               
              AngularFireModule, 
              AngularFireAuthModule, 
              ProdutoService, 
              EstabelecimentoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
