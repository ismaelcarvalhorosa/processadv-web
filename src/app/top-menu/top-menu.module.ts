import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopMenuComponent } from './top-menu.component';
import { RouterModule } from '@angular/router';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';

@NgModule({
  declarations: [TopMenuComponent, UserDetailComponent],
  exports: [TopMenuComponent, UserDetailComponent],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    PanelModule
  ]
})
export class TopMenuModule { }
