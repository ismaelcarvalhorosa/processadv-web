import { Component, OnInit, ComponentFactoryResolver, Injector } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';
import { UsuarioCrudService } from '../services/usuario-crud.service';
import { UsuarioPesquisaService } from '../services/usuario-pesquisa.service';
import { Usuarios } from '../modelos/usuarios';
import { ProgramaBaseApp } from 'src/app/shared/programa-base/programa-base';
import { Mensagem } from 'src/app/mensagem';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css'],
  providers: [
    UsuarioCrudService,
    UsuarioPesquisaService
  ]
})
export class UsuarioFormComponent extends ProgramaBaseApp implements OnInit {
  formUsuario: FormGroup;
  editando = false;
  msg: Mensagem;
  imageSrc = '';

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private messageService: MessageService,
              private usuarioPesquisaService: UsuarioPesquisaService,
              private usuarioCrudService: UsuarioCrudService,
              protected injector: Injector) {
    super('Usuário / Cadastro', injector);
    this.configurarFormulario();
  }

  ngOnInit() {
    this.verificarParametroRota();
  }

  MostrarMensagem(severidade: any, titulo: any, mensagem: any) {
    this.messageService.add({
      severity: severidade,
      summary: titulo,
      detail: mensagem
    });
  }

  configurarFormulario() {
    this.formUsuario = this.formBuilder.group({
      usuario_id: '',
      usuario_nome: ['', Validators.required],
      usuario_login: ['', Validators.required],
      usuario_senha: ['', Validators.required],
      logo: ''
    });
    this.formUsuario.get('usuario_id').disable();
  }

  verificarParametroRota(): void {
    const usuario_id = +this.route.snapshot.paramMap.get('usuario_id');
    if (usuario_id) {
      this.carregarUsuario(usuario_id);
    } else {
      this.novo();
    }
  }

  carregarUsuario(usuario_id: number) {
    this.usuarioCrudService.carregar(usuario_id).subscribe(
      usuario => {
        this.formUsuario.get('usuario_id').patchValue(usuario.usuario_id);
        this.formUsuario.get('usuario_nome').patchValue(usuario.usuario_nome);
        this.formUsuario.get('usuario_login').patchValue(usuario.usuario_login);
        this.formUsuario.get('usuario_senha').patchValue(usuario.usuario_senha);
        this.imageSrc = usuario.logo;
        this.editando = true;
      }
    );
  }

  getUsuarioDoForm(): Usuarios {
    const user: Usuarios = {
      usuario_id: this.formUsuario.get('usuario_id').value,
      usuario_nome: this.formUsuario.get('usuario_nome').value,
      usuario_login: this.formUsuario.get('usuario_login').value,
      usuario_senha: this.formUsuario.get('usuario_senha').value,
      logo: this.imageSrc
    };
    return user;
  }

  salvar() {
    if (this.validarFormulario()) {
      const usuario: Usuarios = this.getUsuarioDoForm();
      this.usuarioCrudService.validarSalvar(usuario).subscribe(
        resultado => {
          this.msg = resultado;
          if (usuario.usuario_id === 0) {
            usuario.usuario_id = null;
          }
          if (this.msg.mensagem !== '') {
            this.MostrarMensagem('warn', 'Atenção!', `${this.msg.mensagem}`);
          } else {
            if (usuario.usuario_id) {
              this.atualizarUsuario(usuario);
            } else {
              this.incluirUsuario(usuario);
            }
          }
        }
      );
    } else {
      this.MostrarMensagem('warn', 'Não é possível salvar o Usuário!', 'Verifique o preenchimento dos campos e tente novamente.');
    }
  }

  atualizarUsuario(usuario: Usuarios) {
    this.usuarioCrudService.atualizar(usuario).subscribe(
      usuarioId => {
        this.MostrarMensagem('success', 'Sucesso!', `Usuário ${usuario.usuario_nome} alterado com sucesso!`);
      }
    );
  }

  incluirUsuario(usuario: Usuarios) {
    this.usuarioCrudService.incluir(usuario).subscribe(
      usuarioId => {
        this.MostrarMensagem('success', 'Sucesso!', `Usuário ${usuario.usuario_nome} incluído com sucesso!`);
        this.novo();
      }
    );
  }

  validarFormulario() {
    this.formUsuario.markAsDirty();
    this.formUsuario.updateValueAndValidity();
    return this.formUsuario.valid;
  }

  excluir() {
    const id = this.formUsuario.get('usuario_id').value;
    const nome = this.formUsuario.get('usuario_nome').value;
    this.usuarioCrudService.validarExclusao(id).subscribe(
      resultado => {
        this.msg = resultado;
        if (this.msg.mensagem !== '') {
          this.MostrarMensagem('warn', 'Atenção!', `${this.msg.mensagem}`);
        } else {
          const confirmacao = confirm('Deseja excluir o Usuário ' + nome + '?');
          if (confirmacao) {
            this.usuarioCrudService.deletar(id).subscribe(
              () => {
                this.MostrarMensagem('success', 'Sucesso!', `Usuário ${nome} excluído com sucesso!`);
                this.novo();
              }
            );
          }
        }
      }
    );
  }

  novo() {
    this.editando = false;
    this.formUsuario.reset({
      usuario_id: '',
      usuario_nome: '',
      usuario_login: '',
      usuario_senha: '',
      logo: ''
    });
    this.router.navigate(['/usuario/novo']);
  }

  cancelar() {
    const usuario_id = this.formUsuario.get('usuario_id').value;
    if (usuario_id) {
      this.carregarUsuario(usuario_id);
    } else {
      this.novo();
    }
  }

  handleInputChange(e) {
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    const pattern = /image-*/;
    const reader = new FileReader();
    if (!file.type.match(pattern)) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Formato inválido!',
        detail: `Formato de imagem inválido!`
      });
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    const reader = e.target;
    this.imageSrc = reader.result;
  }
}
