import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private apiUrl = 'https://localhost:7013/api/usuario';

  constructor(private http: HttpClient) { }

  /** Buscar dados do usuário logado */
  getPerfil(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`);
  }

  /** Atualizar informações básicas do perfil */
  updatePerfil(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/atualizar`, data);
  }

  /** Atualizar preferências do usuário */
  updatePreferencias(preferencias: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/preferencias`, preferencias);
  }

  /** Alterar senha */
  atualizarSenha(data: { senhaAtual: string; senhaNova: string; }): Observable<any> {
    return this.http.put(`${this.apiUrl}/alterar-senha`, data);
  }

  /** Excluir a conta do usuário */
  excluirConta(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/excluir`);
  }
}
