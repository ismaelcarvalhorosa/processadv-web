import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelefoneComponent } from './telefone.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [TelefoneComponent],
  exports: [TelefoneComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    ButtonModule
  ]
})
export class TelefoneModule { }
