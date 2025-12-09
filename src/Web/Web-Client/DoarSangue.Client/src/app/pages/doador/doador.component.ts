import { Component, AfterViewInit } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-doador',
  templateUrl: './doador.component.html',
  styleUrls: ['./doador.component.css']
})
export class DoadorComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    this.initMap();
  }
  
  
  openSection: string | null = null;

toggleSection(section: string) {
  this.openSection = this.openSection === section ? null : section;
}


  initMap() {
    const mapOptions = {
      center: { lat: -19.912998, lng: -43.940933 },
      zoom: 12
    };

    const map = new google.maps.Map(
      document.getElementById('mapa-google'),
      mapOptions
    );

    // ====== POSTOS MOCKADOS ======
    const instituicoes = [
      {
        nome: "Instituição Ihene",
        endereco: "Rua A, 123",
        telefone: "(31) 1234-5678",
        horario: "Seg à Sex: 08h às 17h",
        posicao: { lat: -19.915, lng: -43.93 }
      },
      {
        nome: "Instituição Sabin",
        endereco: "Rua B, 456",
        telefone: "(31) 8765-4321",
        horario: "Seg à Sáb: 07h às 16h",
        posicao: { lat: -19.92, lng: -43.94 }
      },
      {
        nome: "Instituição Hermece",
        endereco: "Rua C, 789",
        telefone: "(31) 1122-3344",
        horario: "Seg à Sex: 09h às 18h",
        posicao: { lat: -19.91, lng: -43.96 }
      }
    ];

    // ====== ADICIONAR MARCADORES ======
    instituicoes.forEach(inst => {

      const marker = new google.maps.Marker({
        position: inst.posicao,
        map,
        title: inst.nome
      });

      // InfoWindow com informações completas
      const info = new google.maps.InfoWindow({
        content: `
          <div style="font-family: Poppins; max-width: 220px;">
            <h4 style="margin:0; color:#065e5e;">${inst.nome}</h4>
            <p style="margin:4px 0;"><strong>Endereço:</strong> ${inst.endereco}</p>
            <p style="margin:4px 0;"><strong>Telefone:</strong> ${inst.telefone}</p>
            <p style="margin:4px 0;"><strong>Horário:</strong> ${inst.horario}</p>
          </div>
        `
      });

      marker.addListener("click", () => {
        info.open({
          anchor: marker,
          map,
          shouldFocus: false
        });
      });

    });
  }
}
