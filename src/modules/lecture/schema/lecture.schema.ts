import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { COURSEMODULES } from 'src/common';

export type LectureDocument = Lecture & mongoose.Document;

@Schema({
  timestamps: true,
  collection: 'lecture',
  toJSON: {
    virtuals: true,
    transform: (_doc: any, ret: any): void => {
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class Lecture {
  @ApiProperty({
    type: String,
    description: 'title',
  })
  @Prop({
    type: String,
  })
  title: string;
  @ApiProperty({
    type: String,
    description: 'description',
  })
  @Prop({
    type: String,
  })
  description?: string;
  @ApiProperty({
    type: String,
    description: 'notes',
  })
  @Prop({
    type: String,
  })
  notes?: string;
  @ApiProperty({
    type: Boolean,
    description: 'is_video',
  })
  @Prop({
    type: Boolean,
  })
  is_video?: boolean;
  @ApiProperty({
    type: Boolean,
    description: 'video_url',
  })
  @Prop({
    type: String,
  })
  video_url?: string;
  @ApiProperty({
    type: Boolean,
    description: 'html_content',
  })
  @Prop({
    type: String,
  })
  html_content?: string;
  @ApiProperty({
    type: Boolean,
    description: 'has_completed',
  })
  @Prop({
    type: Boolean,
  })
  has_completed?: boolean;
  @ApiProperty({
    type: String,
    description: 'Course Module Object',
  })
  @Prop({
    type: mongoose.Schema.Types.ObjectId || String,
    ref: COURSEMODULES,
    autopopulate: true,
  })
  course_modules?: string;
  @Prop({
    type: Boolean,
    default: false,
  })
  is_deleted?: boolean;
  @Prop({
    type: Date,
    default: null,
  })
  deleted_at?: Date;
}

export const LectureSchema = SchemaFactory.createForClass(Lecture);
