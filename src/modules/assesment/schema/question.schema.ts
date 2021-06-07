import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IOptions } from '../interface/options.interface';
import { ASSESSMENT } from 'src/common';
import { Document } from 'mongoose';

export type QuestionDocument = Question & Document;

@Schema({
  timestamps: true,
  collection: 'question',
  toJSON: {
    virtuals: true,
    transform: (_doc: any, ret: any): void => {
      delete ret._id;
      delete ret.__v;
      delete ret.answer;
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
  })
  question: string;
  @ApiProperty({
    type: Number,
    description: 'question_number',
  })
  @Prop({
    type: Number,
  })
  question_number?: number;
  @ApiProperty({
    type: String,
    description: 'instruction',
  })
  @Prop({
    type: String,
  })
  instruction: string;
  @ApiProperty({
    type: String,
    description: 'answer',
  })
  @Prop({
    type: String,
  })
  answer: string;
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
    default: null,
  })
  @ApiProperty({
    type: Object,
    description: 'options',
  })
  @Prop({
    type: Object,
  })
  options?: IOptions;
  @ApiProperty({
    type: String,
    description: 'is_enabled',
  })
  is_enabled?: boolean;
  @ApiProperty({
    type: String,
    description: 'Asssesment Object',
  })
  @Prop({
    type: mongoose.SchemaTypes.ObjectId || String,
    ref: ASSESSMENT,
  })
  assesment_id: string;
}
export const QuestionSchema = SchemaFactory.createForClass(Question);
