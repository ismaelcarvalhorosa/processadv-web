import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/components/common/messageservice';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopMenuModule } from './top-menu/top-menu.module';
import { SideMenuModule } from './side-menu/side-menu.module';
import { EstruturaModule } from './estrutura/estrutura.module';
import { LoginModule } from './seguranca/login/login.module';
import { LoginService } from './seguranca/login/login.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    EstruturaModule,
    TopMenuModule,
    SideMenuModule,
    ToastModule,
    LoginModule
  ],
  providers: [MessageService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
