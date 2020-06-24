import { Component, OnInit, ComponentFactoryResolver, Injector } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';
import { CidadeCrudService } from '../services/cidade-crud.service';
import { CidadePesquisaService } from '../services/cidade-pesquisa.service';
import { Cidade } from '../modelos/cidade';
import { Usuarios } from '../../usuario/modelos/usuarios';
import { LoginService } from 'src/app/seguranca/login/login.service';
import { ProgramaBaseApp } from 'src/app/shared/programa-base/programa-base';
import { Mensagem } from 'src/app/mensagem';

@Component({
  selector: 'app-cidade-form',
  templateUrl: './cidade-form.component.html',
  styleUrls: ['./cidade-form.component.css'],
  providers: [
    CidadeCrudService,
    CidadePesquisaService
  ]
})
export class CidadeFormComponent extends ProgramaBaseApp implements OnInit {
  ufs = [];
  formCidade: FormGroup;
  editando = false;
  msg: Mensagem;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private messageService: MessageService,
              private cidadePesquisaService: CidadePesquisaService,
              private cidadeCrudService: CidadeCrudService,
              protected injector: Injector) {
    super('Cidade / Cadastro', injector);
    this.configurarFormulario();
  }

  ngOnInit() {
    this.carregarUfs();
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
    this.formCidade = this.formBuilder.group({
      cidade_id: '',
      cidade_nome: ['', Validators.required],
      cidade_uf: ['', Validators.required],            
    });
    this.formCidade.get('cidade_id').disable();
  }

  carregarUfs(){
    this.cidadePesquisaService.listarUFs().subscribe(
      ufs => {
        this.ufs = ufs;        
      }
    );
  }

  verificarParametroRota(): void {
    const id = +this.route.snapshot.paramMap.get('cidade_id');
    if (id) {
      this.carregarCidade(id);
    } else {
      this.novo();
    }    
  }

  carregarCidade(cidade_id: number) {
    this.cidadeCrudService.carregar(cidade_id).subscribe(
      cidade => {
        this.formCidade.get('cidade_id').patchValue(cidade.cidade_id);
        this.formCidade.get('cidade_nome').patchValue(cidade.cidade_nome);
        this.formCidade.get('cidade_uf').patchValue({
          key: cidade.cidade_uf
        });        
        this.editando = true;
      }
    );
  }

  getCidadeDoForm(): Cidade {
    const user: Cidade = {
      cidade_id: this.formCidade.get('cidade_id').value,
      cidade_nome: this.formCidade.get('cidade_nome').value,
      cidade_uf: this.formCidade.get('cidade_uf').value.key           
    };
    return user;
  }

  salvar() {
    if (this.validarFormulario()) {
      const cidade: Cidade = this.getCidadeDoForm();
      this.cidadeCrudService.validarSalvar(cidade).subscribe(
        resultado => {
          this.msg = resultado;
          if (cidade.cidade_id === 0) {
            cidade.cidade_id = null;            
          }          
          if (this.msg.mensagem !== '') {
            this.messageService.add({
              severity: 'warn',
              summary: 'Atenção!',
              detail: `${this.msg.mensagem}`
            });
          } else {
            if (cidade.cidade_id) {
              this.atualizarCidade(cidade);
            } else {
              this.incluirCidade(cidade);
            }
          }
        }        
      );
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Não é possível salvar a Cidade!',
        detail: 'Verifique o preenchimento dos campos e tente novamente.'
      });
    }
  }

  atualizarCidade(cidade: Cidade) {
    this.cidadeCrudService.atualizar(cidade).subscribe(
      cidadeId => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso!',
          detail: `Cidade ${cidade.cidade_nome} alterada com sucesso!`
        });
      }  
    );
  }

  incluirCidade(cidade: Cidade) {
    this.cidadeCrudService.incluir(cidade).subscribe(
      cidadeId => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso!',
          detail: `Cidade ${cidade.cidade_nome} incluído com sucesso!`
        });
        this.novo();        
      }
    );
  }

  validarFormulario() {
    this.formCidade.markAsDirty();
    this.formCidade.updateValueAndValidity();
    return this.formCidade.valid;        
  }

  excluir() {
    const id = this.formCidade.get('cidade_id').value;
    const nome = this.formCidade.get('cidade_nome').value;
    this.cidadeCrudService.validarExclusao(id).subscribe(
      resultado => {
        this.msg = resultado;
        if (this.msg.mensagem !== '') {
          this.MostrarMensagem('warn', 'Atenção!', `${this.msg.mensagem}`);
        } else {
          const confirmacao = confirm('Deseja excluir o Cidade ' + nome + '?');
          if (confirmacao) {
            this.cidadeCrudService.deletar(id).subscribe(
              () => {
                this.MostrarMensagem('success', 'Sucesso!', `Cidade ${nome} excluído com sucesso!`);
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
    this.formCidade.reset({
      cidade_id: '',
      cidade_nome: '',
      cidade_UF: {  
        key: 'PR'    
      }      
    });    
    this.router.navigate(['/cidade/novo']);
  }

  cancelar() {
    const cidade_id = this.formCidade.get('cidade_id').value;
    if (cidade_id) {
      this.carregarCidade(cidade_id);
    } else {
      this.novo();
    }
  }
}
