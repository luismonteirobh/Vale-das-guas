import { Question, QuestionType } from './types';

export const TOTAL_STEPS = 8;

export const QUESTIONS: Question[] = [
  {
    id: 1,
    title: "Se você fosse sócio, o que gostaria de curtir primeiro?",
    type: QuestionType.MULTIPLE_CHOICE,
    options: [
      { id: 'warm_pools', label: "Piscinas quentinhas", value: "Piscinas quentinhas" },
      { id: 'wave_pool', label: "Piscina de ondas", value: "Piscina de ondas" },
      { id: 'slides', label: "Tobogãs e atrações", value: "Tobogãs e atrações" },
      { id: 'kids', label: "Área infantil com as crianças", value: "Área infantil com as crianças" },
    ]
  },
  {
    id: 2,
    title: "Como sócio, com que frequência você viria?",
    type: QuestionType.MULTIPLE_CHOICE,
    options: [
      { id: '1x', label: "1x por mês", value: "1x por mês" },
      { id: '2x', label: "2x por mês", value: "2x por mês" },
      { id: 'weekend', label: "Todo fim de semana", value: "Todo fim de semana" },
      { id: 'always', label: "Sempre que puder", value: "Sempre que puder" },
    ]
  },
  {
    id: 3,
    title: "Acesso ilimitado ajudaria a economizar?",
    type: QuestionType.MULTIPLE_CHOICE,
    options: [
      { id: 'alot', label: "Muito", value: "Muito" },
      { id: 'medium', label: "Médio", value: "Médio" },
      { id: 'special', label: "Só em datas especiais", value: "Só em datas especiais" },
      { id: 'heat', label: "Principalmente no calor", value: "Principalmente no calor" },
    ]
  },
  {
    id: 4,
    title: "Quantas pessoas usariam o passaporte?",
    type: QuestionType.MULTIPLE_CHOICE,
    options: [
      { id: '1', label: "1", value: "1" },
      { id: '2', label: "2", value: "2" },
      { id: '3', label: "3", value: "3" },
      { id: '4plus', label: "4 ou mais", value: "4 ou mais" },
    ]
  },
  {
    id: 5,
    title: "Se surgisse uma oferta imperdível para ser sócio, você aproveitaria?",
    type: QuestionType.MULTIPLE_CHOICE,
    options: [
      { id: 'yes_offer', label: "Sim", value: "Sim" },
      { id: 'depends', label: "Depende das condições", value: "Depende das condições" },
    ]
  },
  {
    id: 6,
    title: "Quer receber os valores e benefícios?",
    type: QuestionType.MULTIPLE_CHOICE,
    options: [
      { id: 'yes', label: "Sim, quero agora", value: "Sim, quero agora" },
      { id: 'conditions', label: "Quero ver as condições", value: "Quero ver as condições" },
    ]
  },
  {
    id: 7,
    title: "Qual é o seu nome?",
    type: QuestionType.TEXT,
    placeholder: "Digite seu nome completo",
    icon: 'user'
  },
  {
    id: 8,
    title: "Qual é o seu WhatsApp?",
    type: QuestionType.PHONE,
    placeholder: "(DD) 99999-9999",
    icon: 'phone'
  }
];