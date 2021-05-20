import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BRANCH, SYLLABUS, DEPARTMENT } from 'src/common';

export type CourseDocument = Course & mongoose.Document;

@Schema({
  timestamps: true,
  collection: 'course',
  toJSON: {
    virtuals: true,
    transform: (_doc: any, ret: any): void => {
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class Course {
  @ApiProperty({
    type: String,
    description: 'title',
  })
  @Prop({
    type: String,
    unique: true,
  })
  title: string;
  @ApiProperty({
    type: String,
    description: 'author',
  })
  @Prop({
    type: String,
  })
  author: string;
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
    description: 'background_image',
  })
  @Prop({
    type: String,
  })
  background_image?: string;
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
    description: 'Syllabus',
  })
  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: SYLLABUS,
      autopopulate: true,
    },
  ])
  course_modules?: [];
  @ApiProperty({
    type: String,
    description: 'Branch Object',
  })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: BRANCH,
  })
  branch_id?: [];
  @ApiProperty({
    type: String,
    description: 'Department Object',
  })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: DEPARTMENT,
  })
  department_id?: [];
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

export const CourseSchema = SchemaFactory.createForClass(Course);
