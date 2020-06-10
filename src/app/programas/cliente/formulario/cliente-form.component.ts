import { Component, OnInit, Injector } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';
import { ClienteCrudService } from '../services/cliente-crud.service';
import { ClientePesquisaService } from '../services/cliente-pesquisa.service';
import { Cliente } from '../modelos/cliente';
import { Mensagem } from 'src/app/mensagem';
import { EstadoCivil } from '../modelos/EstadoCivil';
import { Aposentado } from '../modelos/Aposentado';
import { Cliente_obs } from '../modelos/cliente_obs';
import { ProgramaBaseApp } from 'src/app/shared/programa-base/programa-base';
import { Tipo_Aposenta } from '../modelos/Tipo_Aposenta';
import { ClienteContato } from '../modelos/cliente_contato';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css'],
  providers: [
    ClienteCrudService,
    ClientePesquisaService
  ]
})
export class ClienteFormComponent extends ProgramaBaseApp implements OnInit {
  formCliente: FormGroup;
  editando = false;
  msg: Mensagem;
  textoEditor: string;
  ptBR;
  codCliente: number;
  codObservacao: number;
  estadosCivis: EstadoCivil[];
  estadoCivilSelecionado: EstadoCivil;
  aposentados: Aposentado[];
  aposentadoSelecionado: Aposentado;
  aposentadorias: Tipo_Aposenta[];
  aposentadoriaSelecionada: Tipo_Aposenta;
  docSelected = 'CPF';
  // contatos
  formContato: FormGroup;
  showContato = false;
  contatos: any;
  contatoAtual: ClienteContato;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private messageService: MessageService,
              private clientePesquisaService: ClientePesquisaService,
              private clienteCrudService: ClienteCrudService,
              protected injector: Injector) {
    super('Cliente / Cadastro', injector);
    this.configurarFormulario();
    this.configurarCalendar();
  }

  ngOnInit() {
    this.verificarParametroRota();
  }

  configurarCalendar() {
    this.ptBR = {
      firstDayOfWeek: 0, // iniciar semana no domingo
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
      dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthNamesShort: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
      today: 'Hoje',
      clear: 'Limpar'
    };
  }

  configurarFormulario() {
    this.formCliente = this.formBuilder.group({
      cliente_id: '',
      NOME: '',
      DATA_NASCIMENTO: '',
      RG: '',
      ORGAO: '',
      NACIONALIDADE: '',
      CPF: '',
      CNPJ: '',
      RAZAO_SOCIAL: '',
      ESTADO_CIVIL: '',
      CONJUGUE: '',
      PROFISSAO: '',
      PAI: '',
      MAE: '',
      APOSENTADO: '',
      TIPO_APOSENTA: '',
      NB: '',
      ESP: '',
      DIB: '',
      DER: '',
      DCB: '',
      DDB: '',
      NIT: '',
      RMI: '',
      SB: '',
      DIP: '',
      TC: '',
      MEU_INSS: '',
      APS: '',
      OP: '',
      ENDERECO: '',
      END_NRO: '',
      COMPLEMENTO: '',
      BAIRRO: '',
      CEP: '',
      EMAIL: '',
      TELEFONE: '',
      editor: '',
      docs: ''
    });
    this.formCliente.get("cliente_id").disable();
    this.estadosCivis = [
      { codigo: 0, estado: '' },
      { codigo: 1, estado: 'Solteiro (a)' },
      { codigo: 2, estado: 'Solteiro (a) com união estável' },
      { codigo: 3, estado: 'Casado (a)' },
      { codigo: 4, estado: 'Divorciado (a)' },
      { codigo: 5, estado: 'Viúvo (a)' },
      { codigo: 6, estado: 'Separado (a)' }
    ];
    this.estadoCivilSelecionado = { codigo: 0 };
    this.aposentados = [
      { codigo: 0, aposentado: 'Não' },
      { codigo: 1, aposentado: 'Sim' }
    ];
    this.aposentadoSelecionado = { codigo: 0 };
    this.aposentadorias = [
      { codigo: 0, tipo: '' },
      { codigo: 1, tipo: 'Amparo Social ao Idoso' },
      { codigo: 2, tipo: 'Amparo Social à Pessoa Portadora de Deficiência' },
      { codigo: 3, tipo: 'Auxílio-Acidente' },
      { codigo: 4, tipo: 'Auxílio-Doença' },
      { codigo: 5, tipo: 'Auxílio-Doença (acidente do trabalho)' },
      { codigo: 6, tipo: 'Auxílio-Reclusão' },
      { codigo: 7, tipo: 'Benefício Decorrente de Acidente de Qualquer Natureza ou Causa' },
      { codigo: 8, tipo: 'Especial' },
      { codigo: 9, tipo: 'Ex-Combatente' },
      { codigo: 10, tipo: 'Pensão Especial às Vítimas da Talidomida' },
      { codigo: 11, tipo: 'Pensão por Morte' },
      { codigo: 12, tipo: 'Pensão por Morte (acidente do trabalho)' },
      { codigo: 13, tipo: 'Por Idade' },
      { codigo: 14, tipo: 'Por Invalidez' },
      { codigo: 15, tipo: 'Por Invalidez (acidente do trabalho)' },
      { codigo: 16, tipo: 'Por Tempo de Contribuição' },
      { codigo: 17, tipo: 'Por Tempo de Contribuição de Professor' },
      { codigo: 18, tipo: 'Salário-Família' },
      { codigo: 19, tipo: 'Salário-Maternidade' }
    ];
    this.aposentadoriaSelecionada = { codigo: 0 };
    // contato
    this.formContato = this.formBuilder.group({
      descricao: ['', Validators.required],
      telefone: ['', Validators.required]
    });
  }

  verificarParametroRota(): void {
    const id = +this.route.snapshot.paramMap.get('cliente_id');
    if (id) {
      this.carregarCliente(id);
    } else {
      this.novo();
    }
  }

  getEstadoCivil(codigo: number): EstadoCivil {
    if (codigo === 0) {
      return { codigo: 0, estado: '' };
    } else if (codigo === 1) {
      return { codigo: 1, estado: 'Solteiro (a)' };
    } else if (codigo === 2) {
      return { codigo: 2, estado: 'Solteiro (a) com união estável' };
    } else if (codigo === 3) {
      return { codigo: 3, estado: 'Casado (a)' };
    } else if (codigo === 4) {
      return { codigo: 4, estado: 'Divorciado (a)' };
    } else if (codigo === 5) {
      return { codigo: 5, estado: 'Viúvo (a)' };
    } else if (codigo === 6) {
      return { codigo: 6, estado: 'Separado (a)' };
    }
  }

  getAposentado(codigo: number): Aposentado {
    if (codigo === 0) {
      return { codigo: 0, aposentado: 'Não' };
    } else if (codigo === 1) {
      return { codigo: 1, aposentado: 'Sim' };
    }
  }

  getAposentadoria(codigo: number): Tipo_Aposenta {
    if (codigo === 0) {
      return { codigo: 0, tipo: '' };
    } else if (codigo === 1) {
      return { codigo: 1, tipo: 'Amparo Social ao Idoso' };
    } else if (codigo === 2) {
      return { codigo: 2, tipo: 'Amparo Social à Pessoa Portadora de Deficiência' };
    } else if (codigo === 3) {
      return { codigo: 3, tipo: 'Auxílio-Acidente' };
    } else if (codigo === 4) {
      return { codigo: 4, tipo: 'Auxílio-Doença' };
    } else if (codigo === 5) {
      return { codigo: 5, tipo: 'Auxílio-Doença (acidente do trabalho)' };
    } else if (codigo === 6) {
      return { codigo: 6, tipo: 'Auxílio-Reclusão' };
    } else if (codigo === 7) {
      return { codigo: 7, tipo: 'Benefício Decorrente de Acidente de Qualquer Natureza ou Causa' };
    } else if (codigo === 8) {
      return { codigo: 8, tipo: 'Especial' };
    } else if (codigo === 9) {
      return { codigo: 9, tipo: 'Ex-Combatente' };
    } else if (codigo === 10) {
      return { codigo: 10, tipo: 'Pensão Especial às Vítimas da Talidomida' };
    } else if (codigo === 11) {
      return { codigo: 11, tipo: 'Pensão por Morte' };
    } else if (codigo === 12) {
      return { codigo: 12, tipo: 'Pensão por Morte (acidente do trabalho)' };
    } else if (codigo === 13) {
      return { codigo: 13, tipo: 'Por Idade' };
    } else if (codigo === 14) {
      return { codigo: 14, tipo: 'Por Invalidez' };
    } else if (codigo === 15) {
      return { codigo: 15, tipo: 'Por Invalidez (acidente do trabalho)' };
    } else if (codigo === 16) {
      return { codigo: 16, tipo: 'Por Tempo de Contribuição' };
    } else if (codigo === 17) {
      return { codigo: 17, tipo: 'Por Tempo de Contribuição de Professor' };
    } else if (codigo === 18) {
      return { codigo: 18, tipo: 'Salário-Família' };
    } else if (codigo === 19) {
      return { codigo: 19, tipo: 'Salário-Maternidade' };
    }
  }

  carregarCliente(id: number) {
    this.clienteCrudService.carregar(id).subscribe(
      cliente => {
        this.codCliente = cliente.cliente_id;
        this.formCliente.get('NOME').patchValue(cliente.nome);
        this.formCliente.get('DATA_NASCIMENTO').patchValue(cliente.data_nascimento);
        this.formCliente.get('RG').patchValue(cliente.rg);
        this.formCliente.get('ORGAO').patchValue(cliente.orgao);
        this.formCliente.get('NACIONALIDADE').patchValue(cliente.nacionalidade);
        if (cliente.cpf.length === 14) {
          this.formCliente.get('CNPJ').patchValue(cliente.cpf);
          this.docSelected = 'CNPJ';
        } else {
          this.formCliente.get('CPF').patchValue(cliente.cpf);
          this.docSelected = 'CPF';
        }
        this.formCliente.get('RAZAO_SOCIAL').patchValue(cliente.razao_social);
        this.estadoCivilSelecionado = this.getEstadoCivil(cliente.estado_civil);
        this.formCliente.get('CONJUGUE').patchValue(cliente.conjugue);
        this.formCliente.get('PROFISSAO').patchValue(cliente.profissao);
        this.formCliente.get('PAI').patchValue(cliente.pai);
        this.formCliente.get('MAE').patchValue(cliente.mae);
        this.aposentadoSelecionado = this.getAposentado(cliente.aposentado);
        this.aposentadoriaSelecionada = this.getAposentadoria(cliente.tipo_aposenta);
        this.onSelectAposentado();
        this.formCliente.get('NB').patchValue(cliente.nb);
        this.formCliente.get('ESP').patchValue(cliente.esp);
        this.formCliente.get('DIB').patchValue(cliente.dib);
        this.formCliente.get('DER').patchValue(cliente.der);
        this.formCliente.get('DCB').patchValue(cliente.dcb);
        this.formCliente.get('DDB').patchValue(cliente.ddb);
        this.formCliente.get('NIT').patchValue(cliente.nit);
        this.formCliente.get('RMI').patchValue(cliente.rmi);
        this.formCliente.get('SB').patchValue(cliente.sb);
        this.formCliente.get('DIP').patchValue(cliente.dip);
        this.formCliente.get('TC').patchValue(cliente.tc);
        this.formCliente.get('MEU_INSS').patchValue(cliente.meu_inss);
        this.formCliente.get('APS').patchValue(cliente.aps);
        this.formCliente.get('OP').patchValue(cliente.op);
        this.formCliente.get('ENDERECO').patchValue(cliente.endereco);
        this.formCliente.get('END_NRO').patchValue(cliente.end_nro);
        this.formCliente.get('COMPLEMENTO').patchValue(cliente.complemento);
        this.formCliente.get('BAIRRO').patchValue(cliente.bairro);
        this.formCliente.get('CEP').patchValue(cliente.cep);
        this.formCliente.get('EMAIL').patchValue(cliente.email);
        this.formCliente.get('TELEFONE').patchValue(cliente.telefone);
        this.clienteCrudService.carregarObs(cliente.cliente_id).subscribe(
          obs => {
            this.codObservacao = obs.observacao_id;
            this.textoEditor = obs.observacao;
          });
      });
    this.editando = true;
  }

  getClienteDoForm(): Cliente {
    let cli: Cliente;
    cli = {
      cliente_id: +this.route.snapshot.paramMap.get('id'),
      nome: this.formCliente.get('NOME').value,
      data_nascimento: this.formCliente.get('DATA_NASCIMENTO').value,
      rg: this.formCliente.get('RG').value,
      orgao: this.formCliente.get('ORGAO').value,
      nacionalidade: this.formCliente.get('NACIONALIDADE').value,
      cpf: this.formCliente.get('CPF').value,
      razao_social: this.formCliente.get('RAZAO_SOCIAL').value,
      estado_civil: this.estadoCivilSelecionado.codigo,
      conjugue: this.formCliente.get('CONJUGUE').value,
      profissao: this.formCliente.get('PROFISSAO').value,
      pai: this.formCliente.get('PAI').value,
      mae: this.formCliente.get('MAE').value,
      aposentado: this.aposentadoSelecionado.codigo,
      tipo_aposenta: this.aposentadoriaSelecionada.codigo,
      nb: this.formCliente.get('NB').value,
      esp: this.formCliente.get('ESP').value,
      dib: this.formCliente.get('DIB').value,
      der: this.formCliente.get('DER').value,
      dcb: this.formCliente.get('DCB').value,
      ddb: this.formCliente.get('DDB').value,
      nit: this.formCliente.get('NIT').value,
      rmi: this.formCliente.get('RMI').value,
      sb: this.formCliente.get('SB').value,
      dip: this.formCliente.get('DIP').value,
      tc: this.formCliente.get('TC').value,
      meu_inss: this.formCliente.get('MEU_INSS').value,
      aps: this.formCliente.get('APS').value,
      op: this.formCliente.get('OP').value,
      endereco: this.formCliente.get('ENDERECO').value,
      end_nro: this.formCliente.get('END_NRO').value,
      complemento: this.formCliente.get('COMPLEMENTO').value,
      bairro: this.formCliente.get('BAIRRO').value,
      cep: this.formCliente.get('CEP').value,
      email: this.formCliente.get('EMAIL').value,
      telefone: this.formCliente.get('TELEFONE').value
    };
    if (this.docSelected === 'CNPJ') {
      cli.cpf = this.formCliente.get('CNPJ').value;
    } else {
      cli.cpf = this.formCliente.get('CPF').value;
    }
    return cli;
  }

  getClienteObsDoForm(): Cliente_obs {
    return {
      observacao_id: this.codObservacao,
      cliente_id: this.codCliente,
      data: new Date(),
      status: 1,
      data_atualizacao: new Date(),
      observacao: this.textoEditor
    };
  }

  salvar() {
    if (this.validarFormulario()) {
      const cliente: Cliente = this.getClienteDoForm();
      this.clienteCrudService.validarSalvar(cliente).subscribe(
        resultado => {
          this.msg = resultado;
          if (cliente.cliente_id === 0) {
            cliente.cliente_id = null;
          }
          if (this.msg.mensagem !== '') {
            this.messageService.add({
              severity: 'warn',
              summary: 'Atenção!',
              detail: `${this.msg.mensagem}`
            });
          } else {
            if (cliente.cliente_id) {
              this.atualizarCliente(cliente);
            } else {
              this.incluirCliente(cliente);
            }
          }
        }
      );
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Não é possível salvar o cliente!',
        detail: 'Verifique o preenchimento dos campos e tente novamente.'
      });
    }
  }

  atualizarCliente(cliente: Cliente) {
    this.clienteCrudService.atualizar(cliente).subscribe(
      () => {
        const cliente_obs: Cliente_obs = this.getClienteObsDoForm();
        cliente_obs.cliente_id = cliente.cliente_id;
        this.atualizarClienteObs(cliente_obs);
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso!',
          detail: `Cliente ${cliente.nome} alterado com sucesso!`
        });
      }
    );
  }

  incluirCliente(cliente: Cliente) {
    this.clienteCrudService.incluir(cliente).subscribe(
      id => {
        this.codCliente = id;
        const cliente_obs: Cliente_obs = this.getClienteObsDoForm();
        cliente_obs.cliente_id = id;
        this.incluirClienteObs(cliente_obs);
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso!',
          detail: `Cliente ${cliente.nome} incluído com sucesso!`
        });
        this.novo();
      }
    );
  }

  atualizarClienteObs(cliente_obs: Cliente_obs) {
    this.clienteCrudService.atualizarObs(cliente_obs).subscribe(
      () => {}
    );
  }

  incluirClienteObs(cliente_obs: Cliente_obs) {
    this.clienteCrudService.incluirObs(cliente_obs).subscribe(
      () => {}
    );
  }

  validarFormulario() {
    this.formCliente.markAsDirty();
    this.formCliente.updateValueAndValidity();
    return this.formCliente.valid;
  }

  excluir() {
    const id = +this.route.snapshot.paramMap.get('id');
    const nome = this.formCliente.get('NOME').value;
    this.clienteCrudService.validarExclusao(id).subscribe(
      resultado => {
        this.msg = resultado;
        if (this.msg.mensagem !== '') {
          this.messageService.add({
            severity: 'warn',
            summary: 'Atenção!',
            detail: `${this.msg.mensagem}`
          });
        } else {
          const confirmacao = confirm('Deseja excluir o cliente ' + nome + '?');
          if (confirmacao) {
            this.clienteCrudService.deletar(id).subscribe(
              () => {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Sucesso!',
                  detail: `Cliente ${nome} excluído com sucesso!`
                });
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
    this.formCliente.reset({
      NOME: '',
      DATA_NASCIMENTO: '',
      RG: '',
      ORGAO: '',
      NACIONALIDADE: '',
      CPF: '',
      CNPJ: '',
      RAZAO_SOCIAL: '',
      ESTADO_CIVIL: '',
      CONJUGUE: '',
      PROFISSAO: '',
      PAI: '',
      MAE: '',
      APOSENTADO: '',
      TIPO_APOSENTA: '',
      NB: '',
      ESP: '',
      DIB: '',
      DER: '',
      DCB: '',
      DDB: '',
      NIT: '',
      RMI: '',
      SB: '',
      DIP: '',
      TC: '',
      MEU_INSS: '',
      APS: '',
      OP: '',
      ENDERECO: '',
      END_NRO: '',
      COMPLEMENTO: '',
      BAIRRO: '',
      CEP: '',
      EMAIL: '',
      TELEFONE: '',
      editor: '',
      docs: ''
    });
    this.router.navigate(['/cliente/novo']);
  }

  cancelar() {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carregarCliente(id);
    } else {
      this.novo();
    }
  }

  onSelectAposentado() {
    if (this.aposentadoSelecionado.codigo === 0) {
      this.formCliente.get('TIPO_APOSENTA').disable();
      this.aposentadoriaSelecionada = this.getAposentadoria(0);
    } else {
      this.formCliente.get('TIPO_APOSENTA').enable();
    }
  }

  // CONTATOS DO CLIENTE

  carregarContatos() {
    const cliente_id = this.formCliente.get('cliente_id').value;
    this.clientePesquisaService.pesquisarContato(cliente_id).subscribe(
      resultado => {
        this.contatos = resultado.data;
      }
    );
  }

  novoContato() {
    this.formContato.reset({
      descricao: '',
      telefone: ''
    });
    this.contatoAtual = {contato_id: 0};
    this.showContato = true;
  }

  editarContato(contato: ClienteContato) {
    this.formContato.get('descricao').patchValue(contato.descricao);
    this.formContato.get('telefone').patchValue(contato.telefone);
    this.contatoAtual = contato;
    this.showContato = true;
  }

  excluirContato(contato: ClienteContato) {
    const confirmacao = confirm(`Deseja excluir o contato?`);
    if (confirmacao) {
      this.clienteCrudService.deletarContato(contato.contato_id).subscribe(
        () => {
          this.carregarContatos();
        }
      );
    }
  }

  getContatoDoForm(): ClienteContato {
    return {
      contato_id: this.contatoAtual.contato_id,
      descricao: this.formContato.get('descricao').value,
      telefone: this.formContato.get('telefone').value
    };
  }

  salvarContato() {
    console.log("1");
    const contato: ClienteContato = this.getContatoDoForm();
    console.log("2");
    contato.cliente = this.getClienteDoForm();
    console.log("3");
    this.clienteCrudService.validarSalvarContato(contato).subscribe(
      resultado => {
        this.msg = resultado;
        if (contato.contato_id === 0) {
          contato.contato_id = null;
        }
        if (this.msg.mensagem !== '') {
          this.messageService.add({
            severity: 'warn',
            summary: 'Atenção!',
            detail: `${this.msg.mensagem}`
          });
        } else {
          if (contato.contato_id) {
            this.atualizarContato(contato);
          } else {
            this.incluirContato(contato);
          }
          this.carregarContatos();
          this.showContato = false;
        }
      }
    );
  }

  incluirContato(contato: ClienteContato) {
    this.clienteCrudService.incluirContato(contato).subscribe(
      () => {
        this.carregarContatos();
      },
      error => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Não foi possível salvar o contato!',
          detail: JSON.stringify(error)
        });
      }
    );
  }

  atualizarContato(contato: ClienteContato) {
    this.clienteCrudService.atualizarContato(contato).subscribe(
      () => {
        this.carregarContatos();
      }
    );
  }
}
