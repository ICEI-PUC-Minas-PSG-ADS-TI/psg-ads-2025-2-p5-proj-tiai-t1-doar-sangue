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

  initMap() {
    const mapOptions = {
      center: { lat: -19.912998, lng: -43.940933 },
      zoom: 12
    };

    const map = new google.maps.Map(
      document.getElementById('mapa-google'),
      mapOptions
    );

    new google.maps.Marker({
      position: { lat: -19.912998, lng: -43.940933 },
      map,
      title: "Hospital 1"
    });
  }
}
