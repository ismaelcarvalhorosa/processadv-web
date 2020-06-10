import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../../app.component';
import { LoginService } from 'src/app/seguranca/login/login.service';
import { Usuarios } from 'src/app/programas/usuario/modelos/usuarios';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  imageSrc = '';

  @Input() app: AppComponent;

  constructor(private loginService: LoginService,
              private router: Router) { }

  ngOnInit() {
    this.imageSrc = this.usuario().logo;
  }

  usuario(): Usuarios {
    return this.loginService.user;
  }

  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  login() {
    this.loginService.handleLogin();
  }

  logout(event) {
    event.preventDefault();
    this.app.fecharMenuTopBar();
    this.loginService.logout();
    this.router.navigate(['/login/login']);
  }

  edituser(event) {
    event.preventDefault();
    this.app.fecharMenuTopBar();
    this.router.navigate(['/usuario/' + this.usuario().usuario_id]);
  }
}
