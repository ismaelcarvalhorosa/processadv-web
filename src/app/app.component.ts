import { Component, OnInit } from '@angular/core';
import { BaseApp } from './estrutura/base-app';
import { LoginService } from './seguranca/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends BaseApp implements OnInit {

  constructor(private loginService: LoginService) {
    super();
  }

  ngOnInit(): void {
  }

  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }
}
