import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
    description: 'id',
  })
  @Prop({
    type: String,
    unique: true,
  })
  id: string;
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
