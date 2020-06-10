import { Component, OnInit, Injector } from '@angular/core';
import { ClientePesquisaService } from '../services/cliente-pesquisa.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ClienteCrudService } from '../services/cliente-crud.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { Cliente } from '../modelos/cliente';
import { Router } from '@angular/router';
import { Mensagem } from 'src/app/mensagem';
import { ProgramaBaseApp } from 'src/app/shared/programa-base/programa-base';

@Component({
  selector: 'app-cliente-pesquisa',
  templateUrl: './cliente-pesquisa.component.html',
  styleUrls: ['./cliente-pesquisa.component.css'],
  providers: [
    ClientePesquisaService,
    ClienteCrudService
  ]
})
export class ClientePesquisaComponent extends ProgramaBaseApp implements OnInit {
  clientes: any;
  formPesquisa: FormGroup;
  pesquisando = false;
  msg: Mensagem;

  constructor(private clientePesquisaService: ClientePesquisaService,
              private formBuilder: FormBuilder,
              private messageService: MessageService,
              private clienteCrudService: ClienteCrudService,
              private router: Router,
              protected injector: Injector) {
    super('Cliente / Pesquisa', injector);
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
    this.clientePesquisaService.pesquisar(valorPesquisa).subscribe(
      resultado => {
        this.clientes = resultado.data;
        this.pesquisando = false;
      }
    );
  }

  limparPesquisa() {
    this.formPesquisa.get('valorPesquisa').setValue('');
    this.pesquisar();
  }

  excluir(cliente: Cliente) {
    this.clienteCrudService.validarExclusao(cliente.cliente_id).subscribe(
      resultado => {
        this.msg = resultado;
        if (this.msg.mensagem !== '') {
          this.messageService.add({
            severity: 'warn',
            summary: 'Atenção!',
            detail: `${this.msg.mensagem}`
          });
        } else {
          const confirmacao = confirm('Deseja excluir o cliente ' + cliente.nome + '?');
          if (confirmacao) {
            this.clienteCrudService.deletar(cliente.cliente_id).subscribe(
              () => {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Sucesso!',
                  detail: `Cliente ${cliente.nome} excluído com sucesso!`
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
