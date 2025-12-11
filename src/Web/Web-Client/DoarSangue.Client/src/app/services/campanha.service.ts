import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampanhaService {

 
  private apiUrl = 'http://localhost:5181/api/campanha';

  constructor(private http: HttpClient) { }

  // Método para buscar todas as campanhas (usado no Dashboard)
  listarCampanhas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Método para cadastrar uma nova campanha (usado na tela de Nova Campanha)
  criarCampanha(campanha: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, campanha);
  }
}