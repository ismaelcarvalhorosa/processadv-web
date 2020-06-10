import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-telefone',
  templateUrl: './telefone.component.html',
  styleUrls: ['./telefone.component.css'],
  providers: [
    MessageService
  ]
})
export class TelefoneComponent implements OnInit {

  @Input() telefones = [];

  tiposTelefone = [
    { label: 'Celular', value: 'CELULAR'},
    { label: 'Fixo', value: 'FIXO'},
    { label: 'Trabalho', value: 'TRABALHO'}
  ];

  formTelefone: FormGroup;

  constructor(private formBuilder: FormBuilder, private messageService: MessageService) {
    this.configurarFormTelefone();
  }

  ngOnInit() {
    this.novo();
  }

  configurarFormTelefone() {
    this.formTelefone = this.formBuilder.group({
      id: '',
      numero: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
      tipo: ['', Validators.required]
    });
  }

  novo() {
    this.formTelefone.reset({
      tipo: this.tiposTelefone[0].value
    });
  }

  adicionarTelefone() {
    if (this.formTelefone.valid) {
      const novoTelefone = this.formTelefone.getRawValue();
      const telefoneExistente = this.telefones.find(t => novoTelefone.numero === t.numero);
      if (telefoneExistente) {
        alert('Telefone já cadastrado!');
        this.messageService.add({
          severity: 'warn',
          summary: 'Não é possível adicionar esse telefone!',
          detail: 'Número ' + novoTelefone.numero + ' já cadastrado.'
        });
      } else {
        this.telefones.push(novoTelefone);
        this.novo();
      }
    }
  }

  removerTelefone(indiceTelefone) {
    this.telefones.splice(indiceTelefone, 1);
  }
}
