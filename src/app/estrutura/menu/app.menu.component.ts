import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LoginService } from 'src/app/seguranca/login/login.service';
import { Usuarios } from 'src/app/programas/usuario/modelos/usuarios';

@Component({
  selector: 'app-menu',
  template: `
        <ul class="layout-menu">
            <li app-menuitem *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true"></li>
        </ul>
    `
})
export class AppMenuComponent implements OnInit {

  model: MenuItem[];

  constructor(private loginService: LoginService) { }

  usuario(): Usuarios {
    return this.loginService.user;
  }

  ngOnInit() {
    this.model = [
      { label: 'Página Inicial', icon: 'pi pi-fw pi-home', routerLink: '/inicio' },
      { label: 'Clientes', icon: 'pi pi-fw pi-chevron-circle-right', routerLink: '/cliente/pesquisa' },
      { label: 'Usuários', icon: 'pi pi-fw pi-users', routerLink: '/usuario/pesquisa' },
      { label: 'Cidades', icon: 'pi pi-fw pi-map-marker', routerLink: '/cidade/pesquisa' }];
  }
}
