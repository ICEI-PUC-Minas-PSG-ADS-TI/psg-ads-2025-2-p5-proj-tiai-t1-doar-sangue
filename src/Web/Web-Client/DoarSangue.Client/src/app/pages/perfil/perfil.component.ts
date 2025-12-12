import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../../services/perfil.service';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuario = {
    nome: '',
    email: '',
    telefone: '',
    sexo: ''
  };

  usuarioBackup = {
    nome: '',
    email: '',
    telefone: '',
    sexo: ''
  };

  editandoDados = false;
  emailRedefinicao: string = '';

  seguranca = {
    senhaAtual: '',
    senhaNova: ''
  };

  checklist = {
    idade: false,
    peso: false,
    saude: false,
    descanso: false,
    alimentacao: false
  };

  constructor(
    private perfilService: PerfilService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log('🔵 Iniciando componente de perfil');
    this.carregarDados();
  }

  // ========= BUSCAR PERFIL ==========
  carregarDados() {
    console.log('🔍 Carregando dados do perfil...');

    this.perfilService.getPerfil().subscribe({
      next: (data) => {
        console.log('✅ Dados recebidos:', data);

        this.usuario = {
          nome: data.nome || '',
          email: data.email || '',
          telefone: data.telefone || '',
          sexo: data.sexo || ''
        };

        this.usuarioBackup = { ...this.usuario };
      },
      error: (error) => {
        console.error('❌ Erro ao carregar dados:', error);
        alert("Erro ao carregar dados. Verifique se você está logado.");
      }
    });
  }

  // ========= ATIVAR EDIÇÃO ==========
  ativarEdicao() {
    this.editandoDados = true;
    this.usuarioBackup = { ...this.usuario };
  }

  cancelarEdicao() {
    this.usuario = { ...this.usuarioBackup };
    this.editandoDados = false;
  }

  // ========= SALVAR DADOS BÁSICOS ==========
  salvarDados() {
    console.log('💾 Salvando dados:', this.usuario);

    this.perfilService.updatePerfil(this.usuario).subscribe({
      next: () => {
        console.log('✅ Dados salvos com sucesso');
        alert("Informações atualizadas!");

        // Atualiza o localStorage
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const updatedUser = { ...user, ...this.usuario };
        localStorage.setItem('user', JSON.stringify(updatedUser));

        this.usuarioBackup = { ...this.usuario };
        this.editandoDados = false;
      },
      error: (error) => {
        console.error('❌ Erro ao salvar:', error);
        alert("Erro ao atualizar perfil.");
      }
    });
  }

  // ========= ATUALIZAR SENHA ==========
  atualizarSenha() {
    if (!this.seguranca.senhaAtual || !this.seguranca.senhaNova) {
      alert("⚠️ Preencha ambas as senhas");
      return;
    }

    if (this.seguranca.senhaNova.length < 8) {
      alert("⚠️ A nova senha deve ter no mínimo 8 caracteres");
      return;
    }

    console.log('🔒 Atualizando senha...');

    this.perfilService.atualizarSenha({
      senhaAtual: this.seguranca.senhaAtual,
      senhaNova: this.seguranca.senhaNova
    }).subscribe({
      next: () => {
        console.log('✅ Senha atualizada');
        alert("✅ Senha atualizada com sucesso!");
        this.seguranca.senhaAtual = '';
        this.seguranca.senhaNova = '';
      },
      error: (error) => {
        console.error('❌ Erro ao atualizar senha:', error);
        const message = error.error?.message || 'Erro ao atualizar senha';
        alert(`❌ ${message}`);
      }
    });
  }

  // ========= EXCLUIR CONTA ==========
  excluirConta() {
    if (!confirm("⚠️ ATENÇÃO: Deseja realmente excluir sua conta? Esta ação não pode ser desfeita!")) {
      return;
    }

    console.log('🗑️ Excluindo conta...');

    this.perfilService.excluirConta().subscribe({
      next: () => {
        console.log('✅ Conta excluída');
        alert("✅ Conta excluída com sucesso!");

        // Limpar localStorage e redirecionar
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('❌ Erro ao excluir conta:', error);
        alert("❌ Erro ao excluir conta.");
      }
    });
  }

  // ========= SCROLL SUAVE PARA A SIDEBAR ==========
  scrollTo(cardId: string) {
    const el = document.getElementById(cardId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  // ========= CHECKLIST ==========
  confirmarChecklist() {
    const tudoOK = Object.values(this.checklist).every(v => v === true);

    if (!tudoOK) {
      alert("⚠️ Você precisa marcar todos os requisitos para prosseguir!");
      return;
    }

    console.log('✅ Checklist confirmado');
    alert("✅ Requisitos confirmados! Você está apto para doar sangue.");

    // Resetar checklist
    this.checklist = {
      idade: false,
      peso: false,
      saude: false,
      descanso: false,
      alimentacao: false
    };
  }

  solicitarRedefinirSenha() {
    const email = this.usuario.email;

    if (!email) {
      alert("⚠️ Email não encontrado. Faça login novamente.");
      return;
    }

    console.log('=== INICIANDO SOLICITAÇÃO DE REDEFINIÇÃO ===');
    console.log('📧 Email do usuário:', email);

    if (!confirm(`Enviar link de redefinição para ${email}?`)) {
      return;
    }

    console.log('📤 Chamando service...');

    this.perfilService.solicitarRedefinirSenha(email).subscribe({
      next: (response) => {
        console.log('✅ SUCESSO - Resposta completa:', response);
        alert(`✅ ${response.message || 'Link de redefinição enviado!'}\n\nVerifique sua caixa de entrada e spam.`);
      },
      error: (error) => {
        console.error('❌ ERRO COMPLETO:', error);
        console.error('❌ Status:', error.status);
        console.error('❌ StatusText:', error.statusText);
        console.error('❌ Error.error:', error.error);
        console.error('❌ URL chamada:', error.url);

        let message = 'Erro ao enviar email de redefinição';

        if (error.status === 0) {
          message = 'Erro de conexão com o servidor. Verifique se o backend está rodando.';
        } else if (error.status === 404) {
          message = 'Endpoint não encontrado. URL: ' + error.url;
        } else if (error.error?.message) {
          message = error.error.message;
        }

        alert(`❌ ${message}`);
      }
    });
  }

  sairDaConta() {
    console.log('🚪 Saindo da conta...');

    // Limpar localStorage
    localStorage.removeItem('user');

    // Redirecionar para login
    this.router.navigate(['/login']).then(() => {
      console.log('✅ Logout realizado');
    });
  }
}
