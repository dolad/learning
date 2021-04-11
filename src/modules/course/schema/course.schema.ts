import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { COURSEMODULES } from 'src/common';

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
    description: 'Modules Object',
  })
  @Prop({
    type: mongoose.Schema.Types.ObjectId || String,
    ref: COURSEMODULES,
    autopopulate: true,
  })
  modules?: string;
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
