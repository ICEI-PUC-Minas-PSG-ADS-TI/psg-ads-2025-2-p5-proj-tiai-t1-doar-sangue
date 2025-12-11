import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../../services/perfil.service';

@Component({
  standalone: false,
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  // ======== CAMPOS QUE O HTML USA ========
  usuario = {
    nome: '',
    email: '',
    telefone: '',
    endereco: ''
  };

  // Backup para cancelar edição
  usuarioBackup = {
    nome: '',
    email: '',
    telefone: '',
    endereco: ''
  };

  editandoDados = false;

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

  constructor(private perfilService: PerfilService) { }

  ngOnInit(): void {
    this.carregarDados();
  }

  // ========= BUSCAR PERFIL ==========
  carregarDados() {
    this.perfilService.getPerfil().subscribe({
      next: (data) => {
        this.usuario = {
          nome: data.nome,
          email: data.email,
          telefone: data.telefone,
          endereco: data.endereco
        };
        // inicializa backup
        this.usuarioBackup = { ...this.usuario };
      },
      error: () => {
        alert("Erro ao carregar dados");
      }
    });
  }

  // ========= ATIVAR EDIÇÃO ==========
  ativarEdicao() {
    this.editandoDados = true;
    this.usuarioBackup = { ...this.usuario }; // backup atual
  }

  cancelarEdicao() {
    this.usuario = { ...this.usuarioBackup }; // restaura backup
    this.editandoDados = false;
  }

  // ========= SALVAR DADOS BÁSICOS ==========
  salvarDados() {
    this.perfilService.updatePerfil(this.usuario).subscribe({
      next: () => {
        alert("Informações atualizadas!");
        this.editandoDados = false;
      },
      error: () => alert("Erro ao atualizar perfil.")
    });
  }

  // ========= ATUALIZAR SENHA ==========
  atualizarSenha() {
    if (!this.seguranca.senhaAtual || !this.seguranca.senhaNova) {
      alert("Preencha as senhas");
      return;
    }

    alert("Senha atualizada! (exemplo, implementar no backend)");
  }

  // ========= EXCLUIR CONTA ==========
  excluirConta() {
    if (!confirm("Deseja realmente excluir sua conta?")) return;

    this.perfilService.excluirConta().subscribe({
      next: () => alert("Conta excluída"),
      error: () => alert("Erro ao excluir conta.")
    });
  }

  // ========= SCROLL SUAVE PARA A SIDEBAR ==========
  scrollTo(cardId: string) {
    const el = document.getElementById(cardId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  // ========= CHECKLIST ==========
  confirmarChecklist() {
    const tudoOK = Object.values(this.checklist).every(v => v === true);

    if (!tudoOK) {
      alert("⚠️ Você precisa marcar todos os requisitos para prosseguir!");
      return;
    }

    alert("✅ Requisitos confirmados com sucesso!");
  }
}
