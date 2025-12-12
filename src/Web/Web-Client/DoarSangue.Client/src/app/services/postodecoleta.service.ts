import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PostoColeta {
  id?: number;
  nome: string;
  email: string;
  contato: string;
  endereco: string;
  horarioFuncionamento: string;
  cnpj: string;
  authUid?: string;
  latitude?: number;
  longitude?: number;
}

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

  getPostos(): Observable<PostoColeta[]> {
    return this.http.get<PostoColeta[]>(this.apiUrl);
  }

  getPostoById(id: number): Observable<PostoColeta> {
    return this.http.get<PostoColeta>(`${this.apiUrl}/${id}`);
  }
}
