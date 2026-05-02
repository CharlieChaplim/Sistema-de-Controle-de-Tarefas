import { Injectable } from '@angular/core';
import { Tarefa } from '../models/tarefa.model';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  private tarefas: Tarefa[] = [
    {
      id: 1,
      titulo: 'Estudar Angular',
      descricao: 'Revisar material de Data Binding',
      categoria: 'Estudos',
      prioridade: 'Alta',
      concluida: false,
      dataCriacao: new Date('2024-04-20')
    },
    {
      id: 2,
      titulo: 'Fazer compras',
      descricao: 'Arroz, feijão, café',
      categoria: 'Pessoal',
      prioridade: 'Média',
      concluida: true,
      dataCriacao: new Date('2024-04-21'),
      dataConclusao: new Date('2024-04-22')
    },
    {
      id: 3,
      titulo: 'Reunião com time',
      descricao: 'Daily às 10h',
      categoria: 'Trabalho',
      prioridade: 'Alta',
      concluida: false,
      dataCriacao: new Date('2024-04-23')
    },
    {
      id: 4,
      titulo: 'Ler documentação TypeScript',
      descricao: 'Capítulos 5 e 6',
      categoria: 'Estudos',
      prioridade: 'Baixa',
      concluida: false,
      dataCriacao: new Date('2024-04-24')
    },
    {
      id: 5,
      titulo: 'Ligar para dentista',
      descricao: 'Agendar consulta',
      categoria: 'Pessoal',
      prioridade: 'Média',
      concluida: false,
      dataCriacao: new Date('2024-04-25')
    }
  ];

  listarTodas(): Tarefa[] {
    return [...this.tarefas];
  }

  buscarPorId(id: number): Tarefa | undefined {
    return this.tarefas.find(tarefa => tarefa.id === id);
  }

  cadastrar(tarefa: Omit<Tarefa, 'id' | 'concluida' | 'dataCriacao' | 'dataConclusao'>): void {
    const novaTarefa: Tarefa = {
      id: this.gerarProximoId(),
      ...tarefa,
      concluida: false,
      dataCriacao: new Date()
    };

    this.tarefas.push(novaTarefa);
  }

  editar(id: number, tarefaAtualizada: Omit<Tarefa, 'id' | 'concluida' | 'dataCriacao' | 'dataConclusao'>): void {
    const tarefa = this.buscarPorId(id);

    if (!tarefa) {
      return;
    }

    tarefa.titulo = tarefaAtualizada.titulo;
    tarefa.descricao = tarefaAtualizada.descricao;
    tarefa.categoria = tarefaAtualizada.categoria;
    tarefa.prioridade = tarefaAtualizada.prioridade;
  }

  excluir(id: number): void {
    this.tarefas = this.tarefas.filter(tarefa => tarefa.id !== id);
  }

  alternarConclusao(id: number): void {
    const tarefa = this.buscarPorId(id);

    if (!tarefa) {
      return;
    }

    tarefa.concluida = !tarefa.concluida;

    if (tarefa.concluida) {
      tarefa.dataConclusao = new Date();
    } else {
      tarefa.dataConclusao = undefined;
    }
  }

  contarTotal(): number {
    return this.tarefas.length;
  }

  contarPendentes(): number {
    return this.tarefas.filter(tarefa => !tarefa.concluida).length;
  }

  contarConcluidas(): number {
    return this.tarefas.filter(tarefa => tarefa.concluida).length;
  }

  contarPorPrioridade(prioridade: string): number {
    return this.tarefas.filter(tarefa => tarefa.prioridade === prioridade).length;
  }

  private gerarProximoId(): number {
    if (this.tarefas.length === 0) {
      return 1;
    }

    return Math.max(...this.tarefas.map(tarefa => tarefa.id)) + 1;
  }
}
