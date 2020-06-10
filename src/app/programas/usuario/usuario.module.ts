import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioPesquisaComponent } from './pesquisa/usuario-pesquisa.component';
import { UsuarioFormComponent } from './formulario/usuario-form.component';
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
  { path: 'pesquisa',  component: UsuarioPesquisaComponent },
  { path: 'novo',  component: UsuarioFormComponent },
  { path: ':usuario_id',  component: UsuarioFormComponent }
];

@NgModule({
  declarations: [
    UsuarioPesquisaComponent,
    UsuarioFormComponent
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
export class UsuarioModule { }
