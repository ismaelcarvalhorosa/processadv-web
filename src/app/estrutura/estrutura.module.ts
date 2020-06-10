import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppBreadcrumbComponent } from './breadcrumb/app.breadcrumb.component';
import { AppMenuComponent } from './menu/app.menu.component';
import { AppMenuitemComponent } from './menu/app.menuitem.component';
import { AppTopBarComponent } from './topbar/app.topbar.component';
import { UserDetailComponent } from './topbar/user-detail/user-detail.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    AppBreadcrumbComponent,
    AppMenuComponent,
    AppMenuitemComponent,
    AppTopBarComponent,
    UserDetailComponent
  ],
  exports: [
    AppBreadcrumbComponent,
    AppMenuComponent,
    AppMenuitemComponent,
    AppTopBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule
  ]
})
export class EstruturaModule { }
