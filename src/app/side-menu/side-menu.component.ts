import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
  items: MenuItem[];

  constructor() { }

  ngOnInit() {
    this.items = [{
      label: 'Cadastros',
      items: [
        { label: 'Página Inicial', icon: 'pi pi-fw pi-home', routerLink: '/inicio' },
        { label: 'Clientes', icon: 'pi pi-fw pi-chevron-circle-right', routerLink: '/cliente/pesquisa' }
      ]
    }];
  }
}
