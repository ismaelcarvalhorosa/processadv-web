import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppBreadcrumbService {

    private titulo = '';
    changeTitulo = new EventEmitter<string>();

    constructor() {
        console.log('novo AppBreadcrumbService()');
    }

    set tituloRota(titulo: string) {
        this.titulo = titulo;
        this.changeTitulo.emit(this.titulo);
    }

    get tituloRota(): string {
        return this.titulo;
    }

}
