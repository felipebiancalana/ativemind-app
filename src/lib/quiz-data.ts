/**
 * Quiz AtiveMind - Versão Atualizada
 * 
 * Total: 10 perguntas focadas em saúde física, emocional e objetivos
 */

export interface QuizQuestion {
  id: string;
  type: 'text' | 'date' | 'multiple-choice' | 'multiple-select';
  question: string;
  options?: string[];
  placeholder?: string;
}

export const quizData: QuizQuestion[] = [
  // 1. Nome
  {
    id: 'nome',
    type: 'text',
    question: 'Qual é o seu nome?',
    placeholder: 'Digite seu nome'
  },

  // 2. Data de nascimento
  {
    id: 'data_nascimento',
    type: 'date',
    question: 'Qual é a sua data de nascimento?',
    placeholder: 'DD/MM/AAAA'
  },

  // 3. Como você se sente hoje?
  {
    id: 'sentimento_hoje',
    type: 'multiple-choice',
    question: 'Como você se sente hoje?',
    options: [
      'Cheio(a) de energia',
      'Normal',
      'Cansado(a)',
      'Exausto(a)',
      'Estressado(a)'
    ]
  },

  // 4. Nível atual de atividade física
  {
    id: 'nivel_atividade',
    type: 'multiple-choice',
    question: 'Seu nível atual de atividade física:',
    options: [
      'Sedentário(a)',
      'Leve (1–2x por semana)',
      'Moderado (3–4x por semana)',
      'Alto (5x ou mais por semana)'
    ]
  },

  // 5. Incômodo físico (múltipla seleção)
  {
    id: 'incomodo_fisico',
    type: 'multiple-select',
    question: 'Você sente algum incômodo físico?',
    options: [
      'Dor nas costas',
      'Dor no pescoço',
      'Joelhos',
      'Ombros',
      'Nenhum incômodo'
    ]
  },

  // 6. Como está seu humor ultimamente?
  {
    id: 'humor',
    type: 'multiple-choice',
    question: 'Como está seu humor ultimamente?',
    options: [
      'Motivado(a)',
      'Desanimado(a)',
      'Ansioso(a)',
      'Sobrecarregado(a)',
      'Tranquilo(a)'
    ]
  },

  // 7. Principal objetivo agora
  {
    id: 'objetivo_principal',
    type: 'multiple-choice',
    question: 'Qual é o seu principal objetivo agora?',
    options: [
      'Emagrecer',
      'Ganhar condicionamento',
      'Melhorar dor física',
      'Aumentar energia',
      'Reduzir estresse'
    ]
  },

  // 8. Tempo disponível por dia
  {
    id: 'tempo_disponivel',
    type: 'multiple-choice',
    question: 'Quanto tempo você tem por dia para cuidar de você?',
    options: [
      '5 minutos',
      '10 minutos',
      '20 minutos',
      '30+ minutos'
    ]
  },

  // 9. O que você mais quer mudar nos próximos 30 dias?
  {
    id: 'mudar_30_dias',
    type: 'multiple-choice',
    question: 'O que você mais quer mudar nos próximos 30 dias?',
    options: [
      'Meu corpo',
      'Minha energia',
      'Minha mente',
      'Minha disciplina',
      'Minha rotina'
    ]
  },

  // 10. O que mais te atrapalha hoje?
  {
    id: 'atrapalha_hoje',
    type: 'multiple-choice',
    question: 'O que mais te atrapalha hoje?',
    options: [
      'Falta de tempo',
      'Falta de energia',
      'Falta de motivação',
      'Dor física',
      'Stress'
    ]
  }
];

export default quizData;
