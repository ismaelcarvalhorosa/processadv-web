import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginaInicialComponent } from './pagina-inicial.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '',  component: PaginaInicialComponent }
];

@NgModule({
  declarations: [PaginaInicialComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PaginaInicialModule { }
