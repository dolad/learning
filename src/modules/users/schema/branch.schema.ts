import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type BranchDocument = Branch & mongoose.Document;

@Schema({
  timestamps: true,
  collection: 'branch',
  toJSON: {
    virtuals: true,
    transform: (_doc: any, ret: any): void => {
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class Branch {
  @ApiProperty({
    type: String,
    description: 'state',
  })
  @Prop({
    type: String,
    unique: true,
  })
  state?: string;
  @ApiProperty({
    type: String,
    description: 'title',
  })
  @Prop({
    type: String,
  })
  title: string;
}

export const BranchSchema = SchemaFactory.createForClass(Branch);
