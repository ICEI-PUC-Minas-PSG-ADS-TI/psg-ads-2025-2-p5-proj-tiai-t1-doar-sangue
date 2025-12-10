import { Component, AfterViewInit } from '@angular/core';
import { CommonModule, NgClass, NgFor } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-instituicao-dashboard',
  standalone: true,
  imports: [CommonModule, NgFor, NgClass],
  templateUrl: './instituicao-dashboard.component.html',
  styleUrls: ['./instituicao-dashboard.component.css']
})
export class InstituicaoDashboardComponent implements AfterViewInit {

  campanhas = [
    { nome: 'Campanha Vida +', status: 'ativo', views: 1523, confirmacoes: 87, publico: 'BH' },
    { nome: 'Doe Hoje', status: 'pausado', views: 734, confirmacoes: 22, publico: 'RJ' },
    { nome: 'Sangue Salva', status: 'finalizado', views: 1990, confirmacoes: 145, publico: 'SP' }
  ];

  ngAfterViewInit(): void {
    this.createEstoqueChart();
    this.createTipoSangueChart();
  }

  createEstoqueChart() {
    const ctx = document.getElementById('estoqueChart') as HTMLCanvasElement;

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
