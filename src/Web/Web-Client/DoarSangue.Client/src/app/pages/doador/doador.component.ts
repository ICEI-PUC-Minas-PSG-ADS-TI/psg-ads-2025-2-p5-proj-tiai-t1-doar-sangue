import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostoService } from '../../services/postodecoleta.service';

declare var google: any;

export interface PostoColeta {
  id?: number;
  nome: string;
  email: string;
  contato: string;
  endereco: string;
  horarioFuncionamento: string;
  cnpj: string;
}

@Component({
  selector: 'app-doador',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doador.component.html',
  styleUrls: ['./doador.component.css']
})
export class DoadorComponent implements OnInit {

  instituicoes: PostoColeta[] = [];
  loading: boolean = true;
  openSection: string | null = null;
  mapLoaded: boolean = false;

  constructor(private postoService: PostoService) {}

  ngOnInit(): void {
    this.carregarInstituicoes();
    this.checkGoogleMapsLoaded();
  }

  checkGoogleMapsLoaded(): void {
    const checkInterval = setInterval(() => {
      if (typeof google !== 'undefined' && google.maps) {
        this.mapLoaded = true;
        clearInterval(checkInterval);

        if (this.instituicoes.length > 0) {
          this.initMap();
        }
      }
    }, 100);

    setTimeout(() => {
      clearInterval(checkInterval);
      if (!this.mapLoaded) {
        console.error('Google Maps não foi carregado');
      }
    }, 10000);
  }

  carregarInstituicoes(): void {
    this.loading = true;

    this.postoService.getPostos().subscribe({
      next: (dados) => {
        this.instituicoes = dados;
        this.loading = false;

        if (this.mapLoaded) {
          setTimeout(() => this.initMap(), 300);
        }
      },
      error: (erro) => {
        console.error('Erro ao carregar instituições:', erro);
        this.loading = false;
      }
    });
  }

  toggleSection(section: string): void {
    this.openSection = this.openSection === section ? null : section;
  }

  abrirModalInfo() {
    document.getElementById('modal-info')?.classList.add('ativo');
  }

  fecharModalInfo() {
    document.getElementById('modal-info')?.classList.remove('ativo');
  }

  initMap(): void {
    if (!this.mapLoaded) return;

    const mapElement = document.getElementById('mapa-google');
    if (!mapElement) return;

    const map = new google.maps.Map(mapElement, {
      center: { lat: -19.912998, lng: -43.940933 },
      zoom: 12,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ]
    });

    this.instituicoes.forEach((inst, index) => {
      const offsetLat = (index % 3 - 1) * 0.02;
      const offsetLng = Math.floor(index / 3) * 0.02;

      const marker = new google.maps.Marker({
        position: {
          lat: -19.912998 + offsetLat,
          lng: -43.940933 + offsetLng
        },
        map,
        title: inst.nome,
        animation: google.maps.Animation.DROP
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="font-family: 'Poppins', sans-serif;">
            <h4>${inst.nome}</h4>
            <p><strong>Endereço:</strong> ${inst.endereco}</p>
            <p><strong>Telefone:</strong> ${inst.contato}</p>
            <p><strong>Horário:</strong> ${inst.horarioFuncionamento}</p>
          </div>
        `
      });

      marker.addListener('click', () => infoWindow.open(map, marker));
    });
  }
}
