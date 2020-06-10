import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Cliente } from '../modelos/cliente';
import { environment } from 'src/environments/environment';
import { Cliente_obs } from '../modelos/cliente_obs';
import { ClienteContato } from '../modelos/cliente_contato';

@Injectable()
export class ClienteCrudService {

  constructor(private http: HttpClient) { }

  carregar(id: number) {
    const url = `${environment.apiURL}/cliente/${id}`;
    return this.http.get<Cliente>(url).pipe(
      tap(
        resultado => {
          if (resultado.data_nascimento) {
            resultado.data_nascimento = new Date(resultado.data_nascimento);
            resultado.data_nascimento.setDate(resultado.data_nascimento.getDate() + 1);
          }
          if (resultado.dib) {
            resultado.dib = new Date(resultado.dib);
            resultado.dib.setDate(resultado.dib.getDate() + 1);
          }
          if (resultado.der) {
            resultado.der = new Date(resultado.der);
            resultado.der.setDate(resultado.der.getDate() + 1);
          }
          if (resultado.dcb) {
            resultado.dcb = new Date(resultado.dcb);
            resultado.dcb.setDate(resultado.dcb.getDate() + 1);
          }
          if (resultado.ddb) {
            resultado.ddb = new Date(resultado.ddb);
            resultado.ddb.setDate(resultado.ddb.getDate() + 1);
          }
          if (resultado.dip) {
            resultado.dip = new Date(resultado.dip);
            resultado.dip.setDate(resultado.dip.getDate() + 1);
          }
          return of(resultado);
        }
      )
    );
  }

  incluir(cliente: Cliente) {
    const url = `${environment.apiURL}/cliente`;
    return this.http.post<number>(url, cliente).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }

  atualizar(cliente: Cliente) {
    const url = `${environment.apiURL}/cliente`;
    return this.http.put<Cliente>(url, cliente).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }

  deletar(id: number) {
    const url = `${environment.apiURL}/cliente/${id}`;
    return this.http.delete<any>(url).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }

  validarExclusao(codigo: any): Observable<any> {
    const url = `${environment.apiURL}/cliente/validarexclusao`;
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

  validarSalvar(cliente: Cliente): Observable<any> {
    if (!cliente.cliente_id) {
      cliente.cliente_id = 0;
    }
    const url = `${environment.apiURL}/cliente/validarcliente`;
    return this.http.post<Cliente>(url, cliente).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }

  // OBSERVAÇÕES

  carregarObs(id: number) {
    const url = `${environment.apiURL}/cliente_obs/${id}`;
    return this.http.get<Cliente_obs>(url).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }

  incluirObs(cliente_obs: Cliente_obs) {
    const url = `${environment.apiURL}/cliente_obs`;
    return this.http.post<Cliente_obs>(url, cliente_obs).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }

  atualizarObs(cliente_obs: Cliente_obs) {
    const url = `${environment.apiURL}/cliente_obs`;
    return this.http.put<Cliente_obs>(url, cliente_obs).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }

  // CONTATOS DO CLIENTE

  incluirContato(contato: ClienteContato) {
    const url = `${environment.apiURL}/cliente_contato`;
    return this.http.post<number>(url, contato).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }

  atualizarContato(contato: ClienteContato) {
    const url = `${environment.apiURL}/cliente_contato`;
    return this.http.put<ClienteContato>(url, contato).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }

  deletarContato(id: number) {
    const url = `${environment.apiURL}/cliente_contato/${id}`;
    return this.http.delete<any>(url).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }

  validarExclusaoContato(codigo: any): Observable<any> {
    const url = `${environment.apiURL}/cliente_contato/validarexclusao`;
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

  validarSalvarContato(contato: ClienteContato): Observable<any> {
    if (!contato.contato_id) {
      contato.contato_id = 0;
    }
    const url = `${environment.apiURL}/cliente_contato/validar`;
    return this.http.post<ClienteContato>(url, contato).pipe(
      tap(
        resultado => {
          return of(resultado);
        }
      )
    );
  }
}
