import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule, NgClass, NgFor } from '@angular/common';
import Chart from 'chart.js/auto';
import { RouterLink } from '@angular/router';
import { CampanhaService } from '../../services/campanha.service'; // 1. Importa o Service

@Component({
  selector: 'app-instituicao-dashboard',
  standalone: true,
  imports: [CommonModule, NgFor, NgClass],
  templateUrl: './instituicao-dashboard.component.html',
  styleUrls: ['./instituicao-dashboard.component.css']
})
export class InstituicaoDashboardComponent implements OnInit, AfterViewInit { // 2. Implementa OnInit

  // 3. Remove os dados fictícios e define a lista como array vazio
  campanhas: any[] = []; 

  constructor(private campanhaService: CampanhaService) {} // 4. Injeta o Service

  ngOnInit(): void {
    this.carregarCampanhas(); // 5. Chama a função de busca ao inicializar
  }

  ngAfterViewInit(): void {
    // Adicionei uma verificação de segurança (if (ctx)) nos métodos do gráfico
    this.createEstoqueChart();
    this.createTipoSangueChart();
  }

  /**
   * Busca a lista de campanhas do backend através do CampanhaService
   */
  carregarCampanhas() {
    this.campanhaService.listarCampanhas().subscribe({
      next: (dados) => {
        // O Angular preenche a lista e o *ngFor no HTML exibe os dados
        this.campanhas = dados;
        console.log('Campanhas carregadas:', dados);
      },
      error: (erro) => {
        console.error('Erro ao buscar campanhas:', erro);
        // Opcional: Mostrar uma mensagem de erro na interface
      }
    });
  }

  createEstoqueChart() {
    const ctx = document.getElementById('estoqueChart') as HTMLCanvasElement;
    if (!ctx) return; // Se o elemento não existe, evita erro

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
    if (!ctx) return; // Se o elemento não existe, evita erro

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