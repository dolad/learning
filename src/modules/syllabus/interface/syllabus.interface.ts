import { Document } from 'mongoose';

export interface ISyllabus extends Document {
  title: string;
  description: string;
  author: string;
  has_completed?: boolean;
  lecture?: [];
  course?: [];
  is_delete?: boolean;
  deleted_at?: Date;
  time_to_complete?: string;
}
