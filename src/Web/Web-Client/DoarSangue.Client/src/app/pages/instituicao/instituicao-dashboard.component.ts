import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule, NgClass, NgFor, DatePipe } from '@angular/common'; // Adicionado DatePipe para formatação de data
import Chart from 'chart.js/auto';
import { RouterLink } from '@angular/router'; // Importado para usar routerLink no HTML
import { CampanhaService } from '../../services/campanha.service';

@Component({
  selector: 'app-instituicao-dashboard',
  standalone: true,
  // CORRIGIDO: RouterLink deve ser importado para que o botão funcione
  // DatePipe deve ser importado para usar o pipe de data no template
  imports: [CommonModule, NgFor, NgClass, RouterLink, DatePipe], 
  templateUrl: './instituicao-dashboard.component.html',
  styleUrls: ['./instituicao-dashboard.component.css']
})
export class InstituicaoDashboardComponent implements OnInit, AfterViewInit {

  // Lista para armazenar as campanhas carregadas do backend
  campanhas: any[] = []; 

  constructor(private campanhaService: CampanhaService) {}

  ngOnInit(): void {
    this.carregarCampanhas();
  }

  ngAfterViewInit(): void {
    // Inicializa os gráficos após a visualização
    this.createEstoqueChart();
    this.createTipoSangueChart();
  }

  /**
   * Busca a lista de campanhas do backend através do CampanhaService
   */
  carregarCampanhas() {
    this.campanhaService.listarCampanhas().subscribe({
      next: (dados) => {
        // O Angular preenche a lista
        this.campanhas = dados;
        console.log('Campanhas carregadas:', dados);
      },
      error: (erro) => {
        console.error('Erro ao buscar campanhas:', erro);
        // Exemplo: alert('Falha ao carregar campanhas.');
      }
    });
  }

  // Métodos de criação de gráficos (mantidos inalterados)
  createEstoqueChart() {
    const ctx = document.getElementById('estoqueChart') as HTMLCanvasElement;
    if (!ctx) return; 

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['O+', 'A+', 'B+', 'AB+', 'O−', 'A−', 'B−', 'AB−'],
        datasets: [{
          label: 'Unidades em Estoque',
          data: [45, 30, 12, 8, 20, 15, 5, 3],
          backgroundColor: '#00897b'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  createTipoSangueChart() {
    const ctx = document.getElementById('sangueChart') as HTMLCanvasElement;
    if (!ctx) return;

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['O+', 'A+', 'B+', 'AB+', 'O−', 'A−', 'B−', 'AB−'],
        datasets: [{
          label: 'Distribuição',
          data: [38, 30, 15, 5, 4, 3, 3, 2],
          backgroundColor: [
            '#004d45', '#006f62', '#00897b', '#00a896',
            '#4db6ac', '#80cbc4', '#a7ffeb', '#c8fff4'
          ]
        }]
      },
      options: {
        responsive: true
      }
    });
  }
}