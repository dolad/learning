import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { COURSE, LECTURES } from 'src/common';

export type CourseModuleDocument = CourseModule & mongoose.Document;

@Schema({
  timestamps: true,
  collection: 'course-module',
  toJSON: {
    virtuals: true,
    transform: (_doc: any, ret: any): void => {
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class CourseModule {
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
    type: Boolean,
    description: 'has_completed',
  })
  @Prop({
    type: Boolean,
  })
  has_completed?: boolean;
  @ApiProperty({
    type: Boolean,
    description: 'time_to_complete',
  })
  @Prop({
    type: String,
  })
  time_to_complete?: string;
  @ApiProperty({
    type: String,
    description: 'Lecture Object',
  })
  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId || String,
      ref: LECTURES,
      autopopulate: true,
    },
  ])
  lectures?: string;
  @ApiProperty({
    type: String,
    description: 'Course Object',
  })
  @Prop({
    type: mongoose.Schema.Types.ObjectId || String,
    ref: COURSE,
    autopopulate: true,
  })
  course?: string;
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

export const CourseModuleSchema = SchemaFactory.createForClass(CourseModule);
