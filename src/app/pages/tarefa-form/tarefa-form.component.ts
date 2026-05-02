import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CATEGORIAS, PRIORIDADES } from '../../models/tarefa.model';
import { TarefaService } from '../../services/tarefa.service';

@Component({
  selector: 'app-tarefa-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './tarefa-form.component.html',
  styleUrl: './tarefa-form.component.css'
})
export class TarefaFormComponent implements OnInit {
  categorias = CATEGORIAS;
  prioridades = PRIORIDADES;
  modoEdicao = false;
  tarefaId?: number;

  formulario = this.formBuilder.group({
    titulo: ['', [Validators.required, Validators.minLength(3)]],
    descricao: [''],
    categoria: ['', Validators.required],
    prioridade: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private tarefaService: TarefaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.modoEdicao = true;
      this.tarefaId = Number(id);
      this.carregarTarefa(this.tarefaId);
    }
  }

  salvar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const dadosFormulario = {
      titulo: this.formulario.value.titulo ?? '',
      descricao: this.formulario.value.descricao ?? '',
      categoria: this.formulario.value.categoria as 'Trabalho' | 'Pessoal' | 'Estudos' | 'Outros',
      prioridade: this.formulario.value.prioridade as 'Alta' | 'Média' | 'Baixa'
    };

    if (this.modoEdicao && this.tarefaId) {
      this.tarefaService.editar(this.tarefaId, dadosFormulario);
    } else {
      this.tarefaService.cadastrar(dadosFormulario);
    }

    this.router.navigate(['/tarefas']);
  }

  campoInvalido(campo: string): boolean {
    const controle = this.formulario.get(campo);
    return !!controle && controle.invalid && controle.touched;
  }

  private carregarTarefa(id: number): void {
    const tarefa = this.tarefaService.buscarPorId(id);

    if (!tarefa) {
      this.router.navigate(['/tarefas']);
      return;
    }

    this.formulario.patchValue({
      titulo: tarefa.titulo,
      descricao: tarefa.descricao,
      categoria: tarefa.categoria,
      prioridade: tarefa.prioridade
    });
  }
}
