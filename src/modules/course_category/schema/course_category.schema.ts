import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { COURSE } from 'src/common';
export type CourseCategoryDocument = CourseCategory & mongoose.Document;

@Schema({
  timestamps: true,
  collection: 'course-category',
  toJSON: {
    virtuals: true,
    transform: (_doc: any, ret: any): void => {
      delete ret._id;
      delete ret.__v;
      delete ret.createdAt;
      delete ret.updatedAt;
    },
  },
})
export class CourseCategory {
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
    description: 'description',
  })
  @Prop({
    type: String,
  })
  description?: string;
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
  @ApiProperty({
    type: String,
    description: 'assesment_id',
  })
  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: COURSE,
    },
  ])
  courses?: string[];
}

export const CourseCategorySchema = SchemaFactory.createForClass(
  CourseCategory,
);
