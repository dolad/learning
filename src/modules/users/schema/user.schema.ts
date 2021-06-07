import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  ASSESSMENT,
  BRANCH,
  COURSE,
  DEPARTMENT,
  UserRoles,
  UserTypes,
} from 'src/common';

export type UserDocument = User & mongoose.Document;

@Schema({
  timestamps: true,
  collection: 'users',
  toJSON: {
    virtuals: true,
    transform: (_doc: any, ret: any): void => {
      delete ret._id;
      delete ret.__v;
      delete ret.password;
    },
  },
})
export class User {
  @ApiProperty({
    type: String,
    description: 'id',
  })
  id?: string;
  @ApiProperty({
    type: String,
    description: 'Email',
  })
  @Prop({
    type: String,
    unique: true,
  })
  @Prop({
    type: String,
  })
  email: string;
  @ApiProperty({
    type: String,
    description: 'Password',
  })
  @Prop({
    type: String,
  })
  password: string;
  @ApiProperty({
    type: String,
    description: 'First Name',
  })
  @Prop({
    type: String,
  })
  first_name?: string;
  @ApiProperty({
    type: String,
    description: 'Last Name',
  })
  @Prop({
    type: String,
  })
  last_name?: string;
  @ApiProperty({
    type: String,
    description: 'Branch Object',
  })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: BRANCH,
  })
  branch_id?: string;
  @ApiProperty({
    type: String,
    description: 'gender',
  })
  @Prop({
    type: String,
  })
  gender?: string;

  @ApiProperty({
    type: String,
    description: 'phone_no',
  })
  @Prop({
    type: String,
  })
  phone_no?: string;

  @ApiProperty({
    type: String,
    description: 'joining_date',
  })
  @Prop({
    type: String,
  })
  joining_date?: string;

  @ApiProperty({
    type: String,
    description: 'date_of_birth',
  })
  @Prop({
    type: String,
  })
  date_of_birth?: string;
  @ApiProperty({
    type: String,
    description: 'Department Object',
  })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: DEPARTMENT,
  })
  department_id?: string;
  @ApiProperty({
    type: String,
    description: 'confirm_status',
  })
  @Prop({
    type: String,
  })
  confirm_status?: string;

  @Prop({
    type: String,
    enum: UserTypes,
    default: UserTypes.Employee,
  })
  user_type?: string;

  @Prop({
    type: String,
    enum: UserRoles,
    default: UserRoles.User,
  })
  user_roles?: string;
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
    description: 'Assesment Object',
  })
  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: ASSESSMENT,
    },
  ])
  assesments?: [];
  @ApiProperty({
    type: String,
    description: 'Course Object',
  })
  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: COURSE,
    },
  ])
  courses?: [];
}

export const UserSchema = SchemaFactory.createForClass(User);
