import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CATEGORIAS, PRIORIDADES, Tarefa } from '../../models/tarefa.model';
import { TarefaService } from '../../services/tarefa.service';

@Component({
  selector: 'app-tarefa-lista',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './tarefa-lista.component.html',
  styleUrl: './tarefa-lista.component.css'
})
export class TarefaListaComponent {
  categorias = CATEGORIAS;
  prioridades = PRIORIDADES;

  filtroCategoria = 'Todas';
  filtroPrioridade = 'Todas';
  filtroStatus = 'Todas';
  termoBusca = '';

  constructor(private tarefaService: TarefaService) {}

  get tarefasFiltradas(): Tarefa[] {
    return this.tarefaService.listarTodas().filter(tarefa => {
      const categoriaOk = this.filtroCategoria === 'Todas' || tarefa.categoria === this.filtroCategoria;
      const prioridadeOk = this.filtroPrioridade === 'Todas' || tarefa.prioridade === this.filtroPrioridade;
      const statusOk =
        this.filtroStatus === 'Todas' ||
        (this.filtroStatus === 'Pendentes' && !tarefa.concluida) ||
        (this.filtroStatus === 'Concluídas' && tarefa.concluida);

      const busca = this.termoBusca.trim().toLowerCase();
      const buscaOk =
        busca === '' ||
        tarefa.titulo.toLowerCase().includes(busca) ||
        tarefa.descricao.toLowerCase().includes(busca);

      return categoriaOk && prioridadeOk && statusOk && buscaOk;
    });
  }

  alternarConclusao(id: number): void {
    this.tarefaService.alternarConclusao(id);
  }

  excluir(id: number): void {
    const confirmou = confirm('Tem certeza que deseja excluir esta tarefa?');

    if (confirmou) {
      this.tarefaService.excluir(id);
    }
  }
}
