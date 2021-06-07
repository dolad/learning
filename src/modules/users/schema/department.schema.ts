import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type DepartmentDocument = Department & mongoose.Document;

@Schema({
  timestamps: true,
  collection: 'department',
  toJSON: {
    virtuals: true,
    transform: (_doc: any, ret: any): void => {
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class Department {
  @ApiProperty({
    type: String,
    description: 'description',
  })
  @Prop({
    type: String,
    unique: true,
  })
  description?: string;
  @ApiProperty({
    type: String,
    description: 'title',
  })
  @Prop({
    type: String,
  })
  title: string;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
