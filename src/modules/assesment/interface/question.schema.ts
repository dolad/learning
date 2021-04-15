import { Document } from 'mongoose';

export interface IQuestion extends Document {
  question: string;
  question_number: number;
  options: [];
  answer: string;
  is_enable: boolean;
  explanation: string;
}
