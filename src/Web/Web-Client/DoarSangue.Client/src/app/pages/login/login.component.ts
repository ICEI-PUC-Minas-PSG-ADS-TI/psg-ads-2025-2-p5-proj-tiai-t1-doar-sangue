import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  mostrarSenha: boolean = false;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;

      this.usuarioService.login(loginData).subscribe({
        next: (response) => {
          localStorage.setItem('user', JSON.stringify(response.data));

          // Redireciona baseado no tipo de usuário
          switch (response.data.usuarioTipo) {
            case 0: // doador
              this.router.navigate(['/doador']);
              break;
            case 1: // posto de coleta
              this.router.navigate(['/dash']);
              break;
            default:
              this.router.navigate(['/']);
          }
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Login e senha inválidos.';
        }
      });
    }
  }
}
