import { Document } from 'mongoose';

export interface ICourse extends Document {
  title: string;
  description: string;
  author: string;
  background_image?: string;
  has_completed?: boolean;
  modules?: [];
  is_delete?: boolean;
  deleted_at?: Date;
}
