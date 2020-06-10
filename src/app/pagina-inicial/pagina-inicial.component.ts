import { Component, OnInit } from '@angular/core';
import { AppBreadcrumbService } from '../estrutura/breadcrumb/app,breadcrumb.service';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css']
})
export class PaginaInicialComponent implements OnInit {

  constructor(private appBreadcrumbService: AppBreadcrumbService) {

this.appBreadcrumbService.tituloRota = 'Página Inicial';
}

  ngOnInit() {}
}
