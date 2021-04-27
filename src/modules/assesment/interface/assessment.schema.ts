import { Document } from 'mongoose';

export interface IDuration {
  hour: number;
  minutes: number;
  seconds: number;
}

export interface IAssesments extends Document {
  name: string;
  instruction: string;
  start_date?: Date;
  end_date?: Date;
  is_enabled: boolean;
  questions: [];
  durations: IDuration;
  users: Array<string>;
}
