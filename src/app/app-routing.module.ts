import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./seguranca/login/login.module').then(mod => mod.LoginModule),
  },
  {
    path: 'cliente',
    loadChildren: () => import('./programas/cliente/cliente.module').then(mod => mod.ClienteModule),
  },
  {
    path: 'usuario',
    loadChildren: () => import('./programas/usuario/usuario.module').then(mod => mod.UsuarioModule),
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pagina-inicial/pagina-inicial.module').then(mod => mod.PaginaInicialModule),
  },
  { path: '',   redirectTo: '/inicio', pathMatch: 'full' },
  {
    path: '**',
    redirectTo: 'inicio'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
