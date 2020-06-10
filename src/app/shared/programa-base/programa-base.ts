import { Injector } from '@angular/core';
import { AppBreadcrumbService } from 'src/app/estrutura/breadcrumb/app,breadcrumb.service';

export class ProgramaBaseApp {

    titulo: string;
    appBreadcrumbService: AppBreadcrumbService;

    constructor(titulo: string, protected injector: Injector) {
        this.titulo = titulo;
        this.appBreadcrumbService = injector.get(AppBreadcrumbService);
        this.appBreadcrumbService.tituloRota = this.titulo;
    }

}