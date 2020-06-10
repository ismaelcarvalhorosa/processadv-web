import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ClientePesquisaComponent } from './pesquisa/cliente-pesquisa.component';
import { ClienteFormComponent } from './formulario/cliente-form.component';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';
import { TabViewModule } from 'primeng/tabview';
import { EditorModule } from 'primeng/editor';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DialogModule } from 'primeng/dialog';

const routes: Routes = [
  { path: 'pesquisa',  component: ClientePesquisaComponent },
  { path: 'novo',  component: ClienteFormComponent },
  { path: ':id',  component: ClienteFormComponent }
];

@NgModule({
  declarations: [
    ClientePesquisaComponent,
    ClienteFormComponent
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
    InputMaskModule,
    CalendarModule,
    TabViewModule,
    EditorModule,
    RadioButtonModule,
    DialogModule
  ]
})
export class ClienteModule { }
