import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Usuarios } from '../modelos/usuarios';
import { environment } from 'src/environments/environment';

@Injectable()
export class UsuarioCrudService {

  constructor(private http: HttpClient) {
  }

  carregar(id: number) {
    const url = `${environment.apiURL}/usuarios/${id}`;
    return this.http.get<Usuarios>(url).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }

  incluir(usuario: Usuarios) {
    const url = `${environment.apiURL}/usuarios`;
    return this.http.post<Usuarios>(url, usuario).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }

  atualizar(usuario: Usuarios) {
    const url = `${environment.apiURL}/usuarios`;
    return this.http.put<Usuarios>(url, usuario).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }

  deletar(id: number) {
    const url = `${environment.apiURL}/usuarios/${id}`;
    return this.http.delete<any>(url).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }

  validarExclusao(codigo: any): Observable<any> {
    const url = `${environment.apiURL}/usuarios/validarexclusao`;
    const options = {
      params: new HttpParams().set('codigo', codigo)
    };
    return this.http.get<any>(url, options).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }

  validarSalvar(usuario: Usuarios): Observable<any> {
    if (!usuario.usuario_id) {
      usuario.usuario_id = 0;
    }
    const url = `${environment.apiURL}/usuarios/validar`;
    return this.http.post<Usuarios>(url, usuario).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }
}
