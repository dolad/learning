import { Document } from 'mongoose';

export interface IOptions extends Document {
  A: string;
  B: string;
  C?: string;
  D?: string;
  E?: string;
}
