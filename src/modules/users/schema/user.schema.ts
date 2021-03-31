import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
  password: string;
  @ApiProperty({
    type: String,
    description: 'First Name',
  })
  @Prop({
    type: String,
  })
  firstname?: string;
  @ApiProperty({
    type: String,
    description: 'Last Name',
  })
  @Prop({
    type: String,
  })
  lastname?: string;
  @ApiProperty({
    type: Boolean,
    description: 'Roles',
  })
  @Prop({
    type: Boolean,
  })
  is_admin?: string;
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

export const UserSchema = SchemaFactory.createForClass(User);
