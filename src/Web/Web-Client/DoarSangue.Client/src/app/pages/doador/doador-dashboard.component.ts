import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doador-dashboard',
  standalone: false, 
  templateUrl: './doador-dashboard.component.html',
  styleUrls: ['./doador-dashboard.component.css', '../../../styles.css'] 
})
export class DoadorDashboardComponent implements OnInit {

  userName: string = 'Nome do Doador';
  isMenuOpen: boolean = false;
  constructor() { }

  ngOnInit(): void {

  }
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  agendarDoacao(): void {
    console.log('Navegar para Agendar Doação');
    this.isMenuOpen = false;
  }

  verHistorico(): void {
    console.log('Navegar para Histórico');
    this.isMenuOpen = false;
  }

  verNotificacoes(): void {
    console.log('Navegar para Notificações');
    this.isMenuOpen = false;
  }

  verPerfil(): void {
    console.log('Navegar para Perfil do Usuário');
    this.isMenuOpen = false;
  }
  sobreNos():void{
    console.log('Navegar sobre nós');
    this.isMenuOpen = false;
  }
  
}