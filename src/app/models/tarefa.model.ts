export interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  categoria: Categoria;
  prioridade: Prioridade;
  concluida: boolean;
  dataCriacao: Date;
  dataConclusao?: Date;
}

export type Categoria = 'Trabalho' | 'Pessoal' | 'Estudos' | 'Outros';
export type Prioridade = 'Alta' | 'Média' | 'Baixa';

export const CATEGORIAS: Categoria[] = [
  'Trabalho',
  'Pessoal',
  'Estudos',
  'Outros'
];

export const PRIORIDADES: Prioridade[] = [
  'Alta',
  'Média',
  'Baixa'
];
