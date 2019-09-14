import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email='';
  password='';
  mensagem='';

  constructor(private loginService : LoginService) { }

  ngOnInit() {
    this.mensagem= this.loginService.getMensagemLogin();
  }

  login() {
    console.log('Executando login');
    this.loginService.setMensagemLogin("");
    this.loginService.login(this.email, this.password)
      .catch(error => {
        this.mensagem = error;
      });

  }

}
