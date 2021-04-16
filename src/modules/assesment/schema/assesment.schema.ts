import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { QUESTION } from 'src/common';
import { IDuration } from '../interface/assessment.schema';

export type AssessmentDocument = Assessment & Document;

@Schema({
  timestamps: true,
  collection: 'assesment',
  toJSON: {
    virtuals: true,
    transform: (_doc: any, ret: any): void => {
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class Assessment {
  @ApiProperty({
    type: String,
    description: 'name',
  })
  @Prop({
    type: String,
    unique: true,
  })
  name: string;
  @ApiProperty({
    type: String,
    description: 'instruction',
  })
  @Prop({
    type: String,
  })
  instruction: string;
  @ApiProperty({
    type: Date,
    description: 'month',
  })
  @Prop({
    type: Date,
  })
  month: Date;
  @ApiProperty({
    type: String,
    description: 'is_enabled',
    default: false,
  })
  @Prop({
    type: String,
  })
  is_enabled?: string;
  @ApiProperty({
    type: String,
    description: 'Question Object',
  })
  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: QUESTION,
      autopopulate: true,
    },
  ])
  questions?: [];
  @Prop({
    type: Object,
    default: false,
  })
  @ApiProperty({
    type: Object,
    description: 'durations',
  })
  durations?: IDuration;
}

export const AssessmentSchema = SchemaFactory.createForClass(Assessment);
