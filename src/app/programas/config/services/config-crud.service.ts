import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Config } from '../modelos/config';
import { environment } from 'src/environments/environment';

@Injectable()
export class ConfigCrudService {

  constructor(private http: HttpClient) { }

  carregar(id: number) {
    const url = `${environment.apiURL}/config/${id}`;
    return this.http.get<Config>(url).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }

  atualizar(config: Config) {
    const url = `${environment.apiURL}/config`;
    return this.http.put<Config>(url, config).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }
}
