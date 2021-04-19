import { Document } from 'mongoose';
import { IOptions } from './options.interface';

export interface IQuestion extends Document {
  question: string;
  question_number: number;
  options: IOptions;
  answer: string;
  is_enable: boolean;
  explanation: string;
}
