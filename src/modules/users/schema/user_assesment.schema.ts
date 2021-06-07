import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AssesmentStatus, ASSESSMENT, USER } from 'src/common';

export type UserAssesmentDocument = User_Assesments & mongoose.Document;

@Schema({
  timestamps: true,
  collection: 'user_assesments',
  toJSON: {
    virtuals: true,
    transform: (_doc: any, ret: any): void => {
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class User_Assesments {
  @ApiProperty({
    type: String,
    description: 'id',
  })
  id?: string;
  @ApiProperty({
    type: String,
    description: 'user_id',
  })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: USER,
  })
  user_id: string;
  @ApiProperty({
    type: String,
    description: 'assesment_id',
  })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: ASSESSMENT,
    autopopulate: true,
  })
  assesments_id: string;
  @ApiProperty({
    type: Number,
    description: 'score',
  })
  @Prop({
    type: Number,
  })
  score?: number;
  @ApiProperty({
    type: String,
    description: 'Assesment_status',
  })
  @Prop({
    type: String,
    enum: AssesmentStatus,
    default: AssesmentStatus.Inactive,
  })
  status?: string;

  @ApiProperty({
    type: String,
    description: 'Completed_at',
  })
  @Prop({
    type: String,
    default: null,
  })
  completed_at?: Date;
}

export const UserAssessmentSchema = SchemaFactory.createForClass(
  User_Assesments,
);
