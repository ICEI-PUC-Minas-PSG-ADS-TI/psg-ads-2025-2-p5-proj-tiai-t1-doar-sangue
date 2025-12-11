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
  isLoading: boolean = false;

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
    console.log('🔵 onSubmit chamado');
    console.log('🔵 Form válido?', this.loginForm.valid);
    console.log('🔵 Form values:', this.loginForm.value);

    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      const loginData = this.loginForm.value;

      console.log('🟢 Enviando requisição de login...');

      this.usuarioService.login(loginData).subscribe({
        next: (response) => {
          console.log('✅ Login bem-sucedido!');
          console.log('✅ Response completa:', response);
          console.log('✅ Response.data:', response.data);

          if (response && response.data) {
            this.saveUserAndRedirect(response.data);
          } else {
            console.error('❌ Resposta sem dados:', response);
            this.errorMessage = 'Erro ao processar resposta do servidor';
          }

          this.isLoading = false;
        },
        error: (error) => {
          console.error('❌ Erro no login:', error);
          console.error('❌ Error.error:', error.error);
          console.error('❌ Status:', error.status);

          this.errorMessage = error.error?.message || 'Login e senha inválidos.';
          this.isLoading = false;
        },
        complete: () => {
          console.log('🔵 Observable completo');
        }
      });
    } else {
      console.warn('⚠️ Formulário inválido');
      this.errorMessage = 'Por favor, preencha todos os campos corretamente.';

      // Mostra quais campos estão inválidos
      Object.keys(this.loginForm.controls).forEach(key => {
        const control = this.loginForm.get(key);
        if (control?.invalid) {
          console.warn(`⚠️ Campo inválido: ${key}`, control.errors);
        }
      });
    }
  }

  saveUserAndRedirect(userData: any): void {
    console.log('💾 Salvando usuário no localStorage...');
    console.log('💾 Dados do usuário:', userData);
    console.log('💾 usuarioTipo:', userData.usuarioTipo);

    try {
      localStorage.setItem('user', JSON.stringify(userData));
      console.log('✅ Usuário salvo no localStorage');

      const savedUser = localStorage.getItem('user');
      console.log('🔍 Verificando localStorage:', savedUser);
    } catch (e) {
      console.error('❌ Erro ao salvar no localStorage:', e);
    }

    console.log('🔀 Redirecionando...');

    switch (userData.usuarioTipo) {
      case 0: // doador
        console.log('➡️ Redirecionando para /doador');
        this.router.navigate(['/doador']).then(success => {
          console.log('Navegação para /doador:', success ? '✅ Sucesso' : '❌ Falhou');
        });
        break;
      case 1: // posto de coleta
        console.log('➡️ Redirecionando para /instituicao');
        this.router.navigate(['/instituicao']).then(success => {
          console.log('Navegação para /instituicao:', success ? '✅ Sucesso' : '❌ Falhou');
        });
        break;
      default:
        console.warn('⚠️ usuarioTipo desconhecido:', userData.usuarioTipo);
        console.log('➡️ Redirecionando para /');
        this.router.navigate(['/']).then(success => {
          console.log('Navegação para /:', success ? '✅ Sucesso' : '❌ Falhou');
        });
    }
  }

  toggleSenha(): void {
    this.mostrarSenha = !this.mostrarSenha;
  }
}
