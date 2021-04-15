import { Document, SchemaTypes } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type OptionDocuments = Option & Document;

@Schema({
  timestamps: true,
  collection: 'option',
  toJSON: {
    virtuals: true,
    transform: (_doc: any, ret: any): void => {
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class Option {
  @ApiProperty({
    type: String,
    description: 'A',
  })
  @Prop({
    type: String,
  })
  A: string;

  @ApiProperty({
    type: String,
    description: 'B',
  })
  @Prop({
    type: String,
  })
  B: string;
  @ApiProperty({
    type: String,
    description: 'C',
  })
  @Prop({
    type: String,
  })
  C?: string;

  @ApiProperty({
    type: String,
    description: 'D',
  })
  @Prop({
    type: String,
  })
  D?: string;

  @ApiProperty({
    type: String,
    description: 'E',
  })
  @Prop({
    type: String,
  })
  E?: string;
}

export const OptionSchema = SchemaFactory.createForClass(Option);
