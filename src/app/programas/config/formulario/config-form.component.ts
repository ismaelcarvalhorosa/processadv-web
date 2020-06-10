import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfigCrudService } from '../services/config-crud.service';
import { Config } from '../modelos/config';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Mensagem } from 'src/app/mensagem';

@Component({
  selector: 'app-config-form',
  templateUrl: './config-form.component.html',
  styleUrls: ['./config-form.component.css'],
  providers: [
    ConfigCrudService
  ]
})
export class ConfigFormComponent implements OnInit {
  formConfig: FormGroup;
  editando = false;
  msg: Mensagem;
  imageSrc = '';

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private messageService: MessageService,
              private configCrudService: ConfigCrudService,
              private http: HttpClient) {
    this.configurarFormulario();
  }

  ngOnInit() {
    this.verificarParametroRota();
  }

  configurarFormulario() {
    this.formConfig = this.formBuilder.group({
      configid: '',
      nome: '',
      endereco: '',
      contato: '',
      contador: '',
      logotipo: ''
    });
  }

  verificarParametroRota(): void {
    this.carregarConfig(1);
  }

  carregarConfig(id: number) {
    this.configCrudService.carregar(id).subscribe(
      config => {
        this.formConfig.get('nome').patchValue(config.nome);
        this.formConfig.get('endereco').patchValue(config.endereco);
        this.formConfig.get('contato').patchValue(config.contato);
        this.formConfig.get('contador').patchValue(config.contador);
        this.imageSrc = config.logotipo;
      });
    this.editando = true;
  }

  getConfigDoForm(): Config {
    return {
      nome: this.formConfig.get('nome').value,
      endereco: this.formConfig.get('endereco').value,
      contato: this.formConfig.get('contato').value,
      contador: this.formConfig.get('contador').value,
      logotipo: this.imageSrc
    };
  }

  salvar() {
    if (this.validarFormulario()) {
      const config: Config = this.getConfigDoForm();
      config.configid = 1;
      this.atualizarConfig(config);
      this.router.navigate(['/inicio']);
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Não é possível salvar as configurações!',
        detail: 'Verifique o preenchimento dos campos e tente novamente.'
      });
    }
  }

  atualizarConfig(config: Config) {
    this.configCrudService.atualizar(config).subscribe(
      confId => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso!',
          detail: `Configurações alteradas com sucesso!`
        });
      }
    );
  }

  validarFormulario() {
    this.formConfig.markAsDirty();
    this.formConfig.updateValueAndValidity();
    return this.formConfig.valid;
  }

  cancelar() {
    this.carregarConfig(1);
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
