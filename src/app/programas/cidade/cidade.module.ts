import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CidadePesquisaComponent } from './pesquisa/cidade-pesquisa.component';
import { CidadeFormComponent } from './formulario/cidade-form.component';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';

const routes: Routes = [
  { path: 'pesquisa',  component: CidadePesquisaComponent },
  { path: 'novo',  component: CidadeFormComponent },
  { path: ':cidade_id',  component: CidadeFormComponent }
];

@NgModule({
  declarations: [
    CidadePesquisaComponent,
    CidadeFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    PanelModule,
    TableModule,
    ToastModule,
    AutoCompleteModule,
    CalendarModule
  ]
})
export class CidadeModule { }
