export interface Option {
  id: string;
  label: string;
  value: string;
}

export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  TEXT = 'TEXT',
  PHONE = 'PHONE'
}

export interface Question {
  id: number;
  title: string;
  type: QuestionType;
  options?: Option[];
  placeholder?: string;
  icon?: 'user' | 'phone';
}

export interface UserResponses {
  [key: number]: string;
}

export interface WebhookPayload {
  name: string;
  whatsapp: string;
  responses: UserResponses;
  timestamp: string;
}