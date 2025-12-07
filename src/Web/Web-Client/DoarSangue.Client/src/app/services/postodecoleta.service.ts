import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostoService {

  private apiUrl = 'https://localhost:7013/api/postodecoleta';

  constructor(private http: HttpClient) { }

  cadastrarPosto(posto: any): Observable<any> {
    return this.http.post(this.apiUrl, posto);
  }

  login(loginData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, loginData);
  }
}
