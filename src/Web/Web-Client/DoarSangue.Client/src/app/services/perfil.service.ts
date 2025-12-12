import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private apiUrl = 'https://localhost:7013/api/usuario';

  constructor(private http: HttpClient) { }

  /** Buscar dados do usuário logado */
  getPerfil(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user.id) {
      console.error('❌ Nenhum ID encontrado no localStorage');
      return throwError(() => new Error('Usuário não encontrado no localStorage'));
    }

    console.log('🔍 Buscando perfil do usuário:', user.id);
    return this.http.get(`${this.apiUrl}/${user.id}`);
  }

  /** Atualizar informações básicas do perfil */
  updatePerfil(data: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user.id) {
      return throwError(() => new Error('Usuário não encontrado'));
    }

    console.log('💾 Atualizando perfil:', data);
    return this.http.put(`${this.apiUrl}/${user.id}`, data);
  }

  /** Alterar senha */
  atualizarSenha(data: { senhaAtual: string; senhaNova: string; }): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user.id) {
      return throwError(() => new Error('Usuário não encontrado'));
    }

    console.log('🔒 Alterando senha do usuário:', user.id);
    return this.http.put(`${this.apiUrl}/${user.id}/alterar-senha`, data);
  }

  /** Excluir a conta do usuário */
  excluirConta(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user.id) {
      return throwError(() => new Error('Usuário não encontrado'));
    }

    console.log('🗑️ Excluindo conta do usuário:', user.id);
    return this.http.delete(`${this.apiUrl}/${user.id}`);
  }

  solicitarRedefinirSenha(email: string): Observable<any> {
    console.log('📧 Solicitando redefinição de senha para:', email);
    return this.http.post(`${this.apiUrl}/solicitar-redefinir-senha`, { email });
  }
}
