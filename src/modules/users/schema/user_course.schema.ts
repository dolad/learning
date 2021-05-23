import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CourseStatus, CourseType, COURSE, USER } from 'src/common';

export type UserCourseDocument = User_Course & mongoose.Document;

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
export class User_Course {
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
    description: 'course_id',
  })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: COURSE,
  })
  course_id: string;
  @ApiProperty({
    type: Number,
    description: 'completed',
  })
  @Prop({
    type: Boolean,
  })
  completed?: boolean;
  @ApiProperty({
    type: String,
    description: 'Course Status',
  })
  @Prop({
    type: String,
    enum: CourseStatus,
    default: CourseStatus.Inactive,
  })
  status?: string;

  @ApiProperty({
    type: String,
    description: 'Course Type',
  })
  @Prop({
    type: String,
    enum: CourseType.Enrolled,
    default: CourseType,
  })
  course_type?: string;

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

export const UserCourseSchema = SchemaFactory.createForClass(User_Course);
