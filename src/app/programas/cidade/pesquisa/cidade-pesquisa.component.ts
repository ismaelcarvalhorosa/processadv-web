import { Component, OnInit, Injector } from '@angular/core';
import { CidadePesquisaService } from '../services/cidade-pesquisa.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Cidade } from '../modelos/cidade';
import { MessageService } from 'primeng/components/common/messageservice';
import { CidadeCrudService } from '../services/cidade-crud.service';
import { Usuarios } from '../../usuario/modelos/usuarios';
import { ProgramaBaseApp } from 'src/app/shared/programa-base/programa-base';
import { LoginService } from 'src/app/seguranca/login/login.service';
import { Mensagem } from 'src/app/mensagem';

@Component({
  selector: 'app-cidade-pesquisa',
  templateUrl: './cidade-pesquisa.component.html',
  styleUrls: ['./cidade-pesquisa.component.css'],
  providers: [
    CidadePesquisaService,
    CidadeCrudService
  ]
})
export class CidadePesquisaComponent extends ProgramaBaseApp implements OnInit {
  cidades: any;
  formPesquisa: FormGroup;
  pesquisando = false;
  msg: Mensagem;

  constructor(private cidadePesquisaService: CidadePesquisaService,
              private formBuilder: FormBuilder,
              private messageService: MessageService,
              private cidadeCrudService: CidadeCrudService,
              private loginService: LoginService,
              
              protected injector: Injector) {
    super('Cidade/ Pesquisa', injector);
    this.formPesquisa = this.formBuilder.group({
      valorPesquisa: ['']
    });
  }

  ngOnInit() {
    this.pesquisar();
  }

  usuario(): Usuarios {
    return this.loginService.user;
  }

  pesquisar() {
    this.pesquisando = true;
    const valorPesquisa = this.formPesquisa.get('valorPesquisa').value;
    this.cidadePesquisaService.pesquisar(valorPesquisa).subscribe(
      resultado => {
        this.cidades = resultado.data;
        this.pesquisando = false;
      }
    );
  }

  limparPesquisa() {
    this.formPesquisa.get('valorPesquisa').setValue('');
    this.pesquisar();
  }

  excluir(cidade: Cidade) {
    this.cidadeCrudService.validarExclusao(cidade.cidade_id).subscribe(
      resultado => {
        this.msg = resultado;
        if (this.msg.mensagem !== '') {
          this.messageService.add({
            severity: 'warn',
            summary: 'Atenção!',
            detail: `${this.msg.mensagem}`
          });
        } else {
          const confirmacao = confirm('Deseja excluir o cidade ' + cidade.cidade_nome + '?');
          if (confirmacao) {
            this.cidadeCrudService.deletar(cidade.cidade_id).subscribe(
              () => {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Sucesso!',
                  detail: `Cidade ${cidade.cidade_nome} excluído com sucesso!`
                });
                this.pesquisar();
              }
            );
          }
        }
      }
    );
  }
}
