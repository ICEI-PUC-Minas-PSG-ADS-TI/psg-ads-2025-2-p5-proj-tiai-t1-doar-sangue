import { Component } from '@angular/core';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css']
})
export class AgendamentoComponent {

  aceitouRequisitos = false;

  instituicoes = [
    { nome: 'Instituição Ihene' },
    { nome: 'Instituição Sabin' },
    { nome: 'Instituição Hermece' }
  ];

  horarios = [
    '08:00', '08:30', '09:00', '09:30',
    '10:00', '10:30', '11:00', '14:00',
    '14:30', '15:00', '15:30', '16:00'
  ];

  instituicaoSelecionada = '';
  dataSelecionada = '';
  horarioSelecionado = '';
  agendamentoConfirmado = false;

  confirmarAgendamento() {
    if (!this.instituicaoSelecionada || !this.dataSelecionada || !this.horarioSelecionado) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    this.agendamentoConfirmado = true;
  }
}
