import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CampanhaService } from '../../services/campanha.service';

@Component({
  selector: 'app-criar-campanha',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './criar-campanha.component.html',
  styleUrls: ['./criar-campanha.component.css']
})
export class CriarCampanhaComponent {

  carregando = false;

  // Objeto modelo da campanha
  campanha = {
    nome: '',
    descricao: '',
    dataInicio: '',
    dataFim: '',
    metaDoadores: null,
    cidade: '',
    estado: ''
  };

  constructor(
    private campanhaService: CampanhaService,
    private router: Router
  ) {}

  onSubmit() {
    // Validação básica
    if (!this.campanha.nome || !this.campanha.dataInicio) {
      alert('Por favor, preencha os campos obrigatórios.');
      return;
    }

    this.carregando = true;

    this.campanhaService.criarCampanha(this.campanha).subscribe({
      next: (res) => {
        this.carregando = false;
        alert('Campanha criada com sucesso!');
        this.router.navigate(['/instituicao']); // Volta para o Dashboard
      },
      error: (err) => {
        this.carregando = false;
        console.error(err);
        alert('Erro ao criar campanha. Verifique o console.');
      }
    });
  }
}