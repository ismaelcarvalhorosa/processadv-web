import { Cliente } from './cliente';

export interface ClienteContato {
    contato_id?: number;
    cliente?: Cliente;
    descricao?: string;
    telefone?: string;
    status?: number;
}
