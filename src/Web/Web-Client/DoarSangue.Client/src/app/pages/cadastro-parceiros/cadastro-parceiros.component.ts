import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostoService } from '../../services/postodecoleta.service';

@Component({
  selector: 'app-cadastro-parceiros',
  templateUrl: './cadastro-parceiros.component.html',
  styleUrls: ['./cadastro-parceiros.component.css'],
  standalone: false
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

    let valor = this.posto.cnpj.replace(/\D/g, ''); // remove tudo que não é número
    valor = valor.substring(0, 14); // limita a 14 dígitos

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

    this.postoService.cadastrarPosto(this.posto)
      .subscribe({
        next: () => {
          this.carregando = false;
          alert('Cadastro realizado com sucesso!');
          this.router.navigate(['/login']); // redireciona para login
        },
        error: err => {
          this.carregando = false;
          alert('Erro ao cadastrar: ' + (err.error?.message || err.message));
        }
      });
  }

  verificarSenhas() {
    // apenas força o Angular a atualizar o binding, não precisa retornar nada
  }
}
