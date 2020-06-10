import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Usuarios } from 'src/app/programas/usuario/modelos/usuarios';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  navigateTo: string;

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private loginService: LoginService,
              private messageService: MessageService,
              private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      login: this.fb.control('', [Validators.required]),
      senha: this.fb.control('', [Validators.required])
    });
  }

  usuario(): Usuarios {
    return this.loginService.user;
  }

  login() {
    const user: Usuarios = {
      usuario_id: null,
      usuario_login: this.loginForm.get('login').value,
      usuario_senha: this.loginForm.get('senha').value,
      logo: null
    };
    this.loginService.login(user).subscribe(
      resultado => {
        if (this.loginService.user.usuario_id == null) {
          this.messageService.add({
            severity: 'warn',
            summary: 'Atenção!',
            detail: 'Usuário e senha inválidos, favor informar corretamente!'
          });
        } else {
          setTimeout(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Login efetuado com sucesso!',
              detail: `Bem-vindo ao PROCESSADV ${this.usuario().usuario_nome}`
            });
            this.router.navigate([`/inicio`]);
          }, 1000);
        }
      }
    );
  }
}
