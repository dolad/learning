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
    description: 'id',
  })
  @Prop({
    type: String,
    unique: true,
  })
  id?: string;
  @ApiProperty({
    type: String,
    description: 'name',
  })
  @Prop({
    type: String,
  })
  name: string;
}

export const BranchSchema = SchemaFactory.createForClass(Branch);
