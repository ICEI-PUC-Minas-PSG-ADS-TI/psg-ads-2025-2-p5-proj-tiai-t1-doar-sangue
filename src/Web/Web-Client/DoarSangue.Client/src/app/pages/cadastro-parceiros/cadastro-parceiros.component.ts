import { Component } from '@angular/core';
import { PostoService } from 'src/app/services/posto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-parceiros',
  templateUrl: './cadastro-parceiros.component.html',
  styleUrls: ['./cadadastro-parceiros.component.css']
})
export class CadastroParceirosComponent {

  posto: any = {
    contato: '',
    cnpj: '',
    senha: ''
  };

  confirmarSenha = '';
  mostrarSenha = false;
  mostrarConfirmarSenha = false;
  carregando = false;

  constructor(private postoService: PostoService, private router: Router) { }

  formatarTelefone(event: any) {
    let valor = event.target.value;
    if (!valor) return;

    valor = valor.replace(/\D/g, '');
    valor = valor.replace(/^(\d{2})(\d)/, '($1) $2');
    valor = valor.replace(/(\d{5})(\d{4})$/, '$1-$2');

    this.posto.contato = valor;
  }

  formatarCnpj() {
    if (!this.posto.cnpj) return;

    let valor = this.posto.cnpj.replace(/\D/g, '');
    valor = valor.substring(0, 14);

    valor = valor.replace(/^(\d{2})(\d)/, '$1.$2');
    valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    valor = valor.replace(/\.(\d{3})(\d)/, '.$1/$2');
    valor = valor.replace(/(\d{4})(\d{1,2})$/, '$1-$2');

    this.posto.cnpj = valor;
  }

  cadastrar() {
    if (this.posto.senha !== this.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    this.carregando = true;

    this.postoService.cadastrarPosto(this.posto).subscribe({
      next: () => {
        this.carregando = false;
        alert('Cadastro realizado com sucesso!');
        this.router.navigate(['/login']);
      },
      error: err => {
        this.carregando = false;
        alert('Erro ao cadastrar: ' + (err.error?.message || err.message));
      }
    });
  }

  verificarSenhas() {
    // força atualização do Angular
  }
}
