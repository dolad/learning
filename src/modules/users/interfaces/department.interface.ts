import { Document } from 'mongoose';

export interface IDepartment extends Document {
  id: string;
  name: string;
}

export interface IBranch extends Document {
  id: string;
  name: string;
}
