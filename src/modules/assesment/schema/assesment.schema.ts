import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AssesmentType, QUESTION, USER } from 'src/common';
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
      delete ret.users;
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
  })
  name: string;
  @ApiProperty({
    type: String,
    description: 'instruction',
  })
  @Prop({
    type: String,
  })
  instruction?: string;
  @ApiProperty({
    type: Date,
    description: 'start_date',
  })
  @Prop({
    type: Date,
  })
  start_date: Date;
  @ApiProperty({
    type: Date,
    description: 'end_date',
  })
  @Prop({
    type: Date,
  })
  end_date: Date;
  @ApiProperty({
    type: String,
    description: 'is_enabled',
    default: false,
  })
  @Prop({
    type: Boolean,
  })
  is_enabled?: boolean;
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
    default: null,
  })
  @ApiProperty({
    type: Object,
    description: 'durations',
  })
  durations?: IDuration;
  @ApiProperty({
    type: String,
    description: 'Assesment_type',
  })
  @Prop({
    type: String,
    enum: AssesmentType,
    default: AssesmentType.General,
  })
  assesment_type?: string;
  @ApiProperty({
    type: String,
    description: 'User Object',
  })
  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: USER,
      autopopulate: true,
    },
  ])
  users?: [];
}

export const AssessmentSchema = SchemaFactory.createForClass(Assessment);
