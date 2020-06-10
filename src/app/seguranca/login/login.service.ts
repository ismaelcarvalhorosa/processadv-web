import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router, NavigationEnd} from '@angular/router';
import { Usuarios } from 'src/app/programas/usuario/modelos/usuarios';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoginService {
    user: Usuarios;
    lastUrl: string;

    constructor(private http: HttpClient, private router: Router) {
    }

    isLoggedIn(): boolean {
      if (this.user === undefined) {
        return false;
      } else if (this.user.usuario_id === undefined) {
        return false;
      } else {
        return this.user.usuario_id > 0;
      }
    }

    login(usuario: Usuarios): Observable<Usuarios> {
      const url = `${environment.apiURL}/usuarios/login`;
      return this.http.post<Usuarios>(url, usuario).pipe(
        tap(
          user => {
            this.user = user;
          }
        )
      );
  }

    handleLogin(path: string = this.lastUrl) {
        this.router.navigate(['/login', btoa(path)]);
    }

    logout() {
        this.user = undefined;
      }
}
