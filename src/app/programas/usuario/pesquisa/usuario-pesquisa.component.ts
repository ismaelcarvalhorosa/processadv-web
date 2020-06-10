import { Component, OnInit, Injector } from '@angular/core';
import { UsuarioPesquisaService } from '../services/usuario-pesquisa.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Usuarios } from '../modelos/usuarios';
import { MessageService } from 'primeng/components/common/messageservice';
import { UsuarioCrudService } from '../services/usuario-crud.service';
import { ProgramaBaseApp } from 'src/app/shared/programa-base/programa-base';
import { Mensagem } from 'src/app/mensagem';

@Component({
  selector: 'app-usuario-pesquisa',
  templateUrl: './usuario-pesquisa.component.html',
  styleUrls: ['./usuario-pesquisa.component.css'],
  providers: [
    UsuarioPesquisaService,
    UsuarioCrudService
  ]
})
export class UsuarioPesquisaComponent extends ProgramaBaseApp implements OnInit {
  usuarios: any;
  formPesquisa: FormGroup;
  pesquisando = false;
  msg: Mensagem;

  constructor(private usuarioPesquisaService: UsuarioPesquisaService,
              private formBuilder: FormBuilder,
              private messageService: MessageService,
              private usuarioCrudService: UsuarioCrudService,
              protected injector: Injector) {
    super('Usuários / Pesquisa', injector);
    this.formPesquisa = this.formBuilder.group({
      valorPesquisa: ['']
    });
  }

  ngOnInit() {
    this.pesquisar();
  }

  pesquisar() {
    this.pesquisando = true;
    const valorPesquisa = this.formPesquisa.get('valorPesquisa').value;
    this.usuarioPesquisaService.pesquisar(valorPesquisa).subscribe(
      resultado => {
        this.usuarios = resultado.data;
        this.pesquisando = false;
      }
    );
  }

  limparPesquisa() {
    this.formPesquisa.get('valorPesquisa').setValue('');
    this.pesquisar();
  }

  excluir(usuario: Usuarios) {
    this.usuarioCrudService.validarExclusao(usuario.usuario_id).subscribe(
      resultado => {
        this.msg = resultado;
        if (this.msg.mensagem !== '') {
          this.messageService.add({
            severity: 'warn',
            summary: 'Atenção!',
            detail: `${this.msg.mensagem}`
          });
        } else {
          const confirmacao = confirm('Deseja excluir o usuário ' + usuario.usuario_nome + '?');
          if (confirmacao) {
            this.usuarioCrudService.deletar(usuario.usuario_id).subscribe(
              () => {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Sucesso!',
                  detail: `Usuário ${usuario.usuario_nome} excluído com sucesso!`
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
