import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IOptions } from '../interface/options.interface';

export type QuestionDocument = Question & Document;

@Schema({
  timestamps: true,
  collection: 'question',
  toJSON: {
    virtuals: true,
    transform: (_doc: any, ret: any): void => {
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class Question {
  @ApiProperty({
    type: String,
    description: 'question',
  })
  @Prop({
    type: String,
    unique: true,
  })
  question: string;
  @ApiProperty({
    type: Number,
    description: 'question_number',
  })
  @Prop({
    type: Number,
  })
  question_number: number;
  @ApiProperty({
    type: String,
    description: 'answer',
  })
  @Prop({
    type: String,
  })
  instruction: string;
  @ApiProperty({
    type: String,
    description: 'explanations',
  })
  @Prop({
    type: String,
  })
  explanation?: string;
  @Prop({
    type: Object,
  })
  @ApiProperty({
    type: Object,
    description: 'option',
  })
  @Prop({
    type: Object,
  })
  options: IOptions;
  @ApiProperty({
    type: String,
    description: 'is_enabled',
  })
  is_enabled?: boolean;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
