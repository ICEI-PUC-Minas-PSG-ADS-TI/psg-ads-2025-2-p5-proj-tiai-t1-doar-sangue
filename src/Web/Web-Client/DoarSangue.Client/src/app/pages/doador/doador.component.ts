import { Component, OnInit, AfterViewInit } from '@angular/core';
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
  standalone: false,
  selector: 'app-doador',
  templateUrl: './doador.component.html',
  styleUrls: ['./doador.component.css']
})
export class DoadorComponent implements OnInit {
  instituicoes: PostoColeta[] = [];
  loading: boolean = true;
  openSection: string | null = null;
  mapLoaded: boolean = false;

  constructor(private postoService: PostoService) { }

  ngOnInit(): void {
    this.carregarInstituicoes();
    this.checkGoogleMapsLoaded();
  }

  // Verifica se o Google Maps foi carregado
  checkGoogleMapsLoaded(): void {
    const checkInterval = setInterval(() => {
      if (typeof google !== 'undefined' && google.maps) {
        this.mapLoaded = true;
        clearInterval(checkInterval);

        // Inicializa o mapa se já tiver instituições
        if (this.instituicoes.length > 0) {
          this.initMap();
        }
      }
    }, 100);

    // Timeout após 10 segundos
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
        console.log('✅ Instituições carregadas:', dados);
        this.instituicoes = dados;
        this.loading = false;

        // Inicializa o mapa se já estiver carregado
        if (this.mapLoaded) {
          setTimeout(() => this.initMap(), 300);
        }
      },
      error: (erro) => {
        console.error('❌ Erro ao carregar instituições:', erro);
        this.loading = false;
      }
    });
  }

  toggleSection(section: string): void {
    this.openSection = this.openSection === section ? null : section;
  }

  abrirModalInfo() {
    const modal = document.getElementById('modal-info');
    modal?.classList.add('ativo');
  }

  fecharModalInfo() {
    const modal = document.getElementById('modal-info');
    modal?.classList.remove('ativo');
  }


  initMap(): void {
    if (!this.mapLoaded) {
      console.warn('Google Maps ainda não foi carregado');
      return;
    }

    const mapElement = document.getElementById('mapa-google');
    if (!mapElement) {
      console.error('Elemento do mapa não encontrado');
      return;
    }

    const mapOptions = {
      center: { lat: -19.912998, lng: -43.940933 },
      zoom: 12,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ]
    };

    const map = new google.maps.Map(mapElement, mapOptions);

    console.log(`📍 Adicionando ${this.instituicoes.length} marcadores ao mapa`);

    this.instituicoes.forEach((inst, index) => {
      const offsetLat = (index % 3 - 1) * 0.02;
      const offsetLng = Math.floor(index / 3) * 0.02;

      const posicao = {
        lat: -19.912998 + offsetLat,
        lng: -43.940933 + offsetLng
      };

      const marker = new google.maps.Marker({
        position: posicao,
        map,
        title: inst.nome,
        animation: google.maps.Animation.DROP,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: '#065e5e',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2
        }
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="font-family: 'Poppins', sans-serif; max-width: 250px; padding: 10px;">
            <h4 style="margin:0 0 10px 0; color:#065e5e; font-size: 16px;">${inst.nome}</h4>
            <p style="margin:5px 0; font-size: 13px;">
              <strong>📍 Endereço:</strong><br>${inst.endereco}
            </p>
            <p style="margin:5px 0; font-size: 13px;">
              <strong>📞 Telefone:</strong> ${inst.contato}
            </p>
            <p style="margin:5px 0; font-size: 13px;">
              <strong>🕐 Horário:</strong><br>${inst.horarioFuncionamento}
            </p>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });
    });
  }
}
