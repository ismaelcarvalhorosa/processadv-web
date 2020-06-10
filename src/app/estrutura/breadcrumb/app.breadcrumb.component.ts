import { Component } from '@angular/core';
import { AppBreadcrumbService } from './app,breadcrumb.service';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './app.breadcrumb.component.html'
})
export class AppBreadcrumbComponent {

    tituloRota = '';

    constructor(private appBreadcrumbService: AppBreadcrumbService) {
        this.appBreadcrumbService.changeTitulo.subscribe(
            tituloRota => {
                this.tituloRota = tituloRota;
            }
        );
    }

}
