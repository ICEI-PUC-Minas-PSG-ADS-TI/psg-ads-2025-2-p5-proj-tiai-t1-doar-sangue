import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-cadastro',
  standalone: false, 
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css', '../../../styles.css']
})
export class CadastroComponent {

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

  constructor(private usuarioService: UsuarioService) { }

  cadastrar() {
    this.usuarioService.cadastrarUsuario(this.usuario).subscribe(
      r => alert("Usuário cadastrado com sucesso!"),
      e => alert("Erro ao cadastrar")
    );
  }
}
