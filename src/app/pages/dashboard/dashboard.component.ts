import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TarefaService } from '../../services/tarefa.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private tarefaService: TarefaService) {}

  get totalTarefas(): number {
    return this.tarefaService.contarTotal();
  }

  get tarefasPendentes(): number {
    return this.tarefaService.contarPendentes();
  }

  get tarefasConcluidas(): number {
    return this.tarefaService.contarConcluidas();
  }

  get tarefasAlta(): number {
    return this.tarefaService.contarPorPrioridade('Alta');
  }

  get tarefasMedia(): number {
    return this.tarefaService.contarPorPrioridade('Média');
  }

  get tarefasBaixa(): number {
    return this.tarefaService.contarPorPrioridade('Baixa');
  }
}
