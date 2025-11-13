import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-cadastro',
  standalone: false, 
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css', '../../../styles.css']
})
export class CadastroComponent {

  mostrarSenha: boolean = false;
  mostrarConfirmarSenha: boolean = false;
  carregando = false;

  tiposSangue = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  usuario = {
    nome: '',
    email: '',
    telefone: '',
    tipoSanguineo: '',
    sexo: '',
    senha: '',
    confirmarSenha: ''
  };

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  cadastrar() {

    this.carregando = true;

    this.usuarioService.cadastrarUsuario(this.usuario)
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

  formatarTelefone(valor: string): string {
    if (!valor) return '';
    valor = valor.replace(/\D/g, ''); // remove tudo que não é número
    valor = valor.replace(/^(\d{2})(\d)/, '($1) $2');
    valor = valor.replace(/(\d{5})(\d{4})$/, '$1-$2');
    return valor;
  }
}
