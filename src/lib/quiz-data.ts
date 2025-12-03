/**
 * Quiz AtiveMind - Versão Atualizada
 * 
 * Total: 11 perguntas focadas em saúde física, emocional e objetivos
 */

export interface QuizQuestion {
  id: string;
  type: 'text' | 'date' | 'multiple-choice' | 'multiple-select' | 'scale';
  question: string;
  options?: string[];
  placeholder?: string;
  min?: number;
  max?: number;
}

export const quizData: QuizQuestion[] = [
  // 1. Nome
  {
    id: 'q1',
    type: 'text',
    question: 'Qual é o seu nome?',
    placeholder: 'Digite seu nome'
  },

  // 2. Data de nascimento
  {
    id: 'q2',
    type: 'date',
    question: 'Qual é a sua data de nascimento?',
    placeholder: 'DD/MM/AAAA'
  },

  // 3. Como você se sente hoje? (com emojis)
  {
    id: 'q3',
    type: 'multiple-choice',
    question: 'Como você se sente hoje?',
    options: [
      '😃 Bem',
      '😐 Normal',
      '😔 Cansado',
      '😫 Estressado'
    ]
  },

  // 4. Nível de atividade física
  {
    id: 'q4',
    type: 'multiple-choice',
    question: 'Nível de atividade física:',
    options: [
      'Nenhuma',
      'Leve 1-2x/semana',
      'Moderada 3-4x/semana',
      'Intensa 5x ou mais/semana'
    ]
  },

  // 5. Incômodos físicos (múltipla escolha)
  {
    id: 'q5',
    type: 'multiple-select',
    question: 'Incômodos físicos (pode marcar mais de um):',
    options: [
      'Coluna',
      'Pescoço',
      'Ombros',
      'Joelhos',
      'Nenhum'
    ]
  },

  // 6. Humor atualmente (escala 1 a 5)
  {
    id: 'q6',
    type: 'scale',
    question: 'Como está seu humor atualmente?',
    min: 1,
    max: 5
  },

  // 7. Objetivo principal
  {
    id: 'q7',
    type: 'multiple-choice',
    question: 'Qual é o seu objetivo principal?',
    options: [
      'Emagrecer',
      'Ganhar massa muscular',
      'Reduzir estresse',
      'Melhorar disposição',
      'Outro'
    ]
  },

  // 8. Tempo disponível por dia
  {
    id: 'q8',
    type: 'multiple-choice',
    question: 'Tempo disponível por dia:',
    options: [
      'Menos de 10 min',
      '10–20 min',
      '20–40 min',
      'Mais de 40 min'
    ]
  },

  // 9. O que quer mudar
  {
    id: 'q9',
    type: 'multiple-choice',
    question: 'O que você mais quer mudar?',
    options: [
      'Energia',
      'Sono',
      'Peso',
      'Postura',
      'Outro'
    ]
  },

  // 10. O que te atrapalha
  {
    id: 'q10',
    type: 'multiple-choice',
    question: 'O que mais te atrapalha?',
    options: [
      'Falta de tempo',
      'Desmotivação',
      'Falta de orientação',
      'Cansaço',
      'Outro'
    ]
  },

  // 11. Frase que mais combina com você
  {
    id: 'q11',
    type: 'multiple-choice',
    question: 'Frase que mais combina com você:',
    options: [
      'Quero me sentir mais confiante',
      'Preciso ter mais energia',
      'Quero cuidar do meu corpo e mente',
      'Quero transformar minha rotina'
    ]
  }
];

export default quizData;
