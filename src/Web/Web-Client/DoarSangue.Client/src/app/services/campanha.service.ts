import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampanhaService {


  private apiUrl = 'http://localhost:5181/api/campanha';

  constructor(private http: HttpClient) { }

  criarCampanha(campanha: any): Observable<any> {
    return this.http.post(this.apiUrl, campanha);
  }
}