import { Document } from 'mongoose';

export interface ILecture extends Document {
  title: string;
  description?: string;
  notes?: string;
  is_video?: boolean;
  video_url?: string;
  html_content?: string;
  has_completed?: boolean;
  is_deleted?: boolean;
  course_module: [];
  deleted_at?: Date;
}
