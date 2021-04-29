import { Document } from 'mongoose';

export interface IUserAssesment extends Document {
  id: string;
  status: string;
  score?: string;
  assesments_id?: string;
  user_id: string;
  completed_at?: Date;
}
