import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Cidade } from '../modelos/cidade';
import { environment } from 'src/environments/environment';

@Injectable()
export class CidadeCrudService {

  constructor(private http: HttpClient) {
  }

  carregar(id: number) {
    const url = `${environment.apiURL}/cidade/${id}`;
    return this.http.get<Cidade>(url).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }

  incluir(cidade: Cidade) {
    const url = `${environment.apiURL}/cidade`;
    return this.http.post<Cidade>(url, cidade).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }

  atualizar(cidade: Cidade) {
    const url = `${environment.apiURL}/cidade`;
    return this.http.put<Cidade>(url, cidade).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }

  deletar(id: number) {
    const url = `${environment.apiURL}/cidade/${id}`;
    return this.http.delete<any>(url).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }

  validarExclusao(codigo: any): Observable<any> {
    const url = `${environment.apiURL}/cidade/validarexclusao`;
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

  validarSalvar(cidade: Cidade): Observable<any> {
    if (!cidade.cidade_id) {
      cidade.cidade_id = 0;
    }    
    const url = `${environment.apiURL}/cidade/validarcidade`;
    return this.http.post<Cidade>(url, cidade).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );    
  }
}
