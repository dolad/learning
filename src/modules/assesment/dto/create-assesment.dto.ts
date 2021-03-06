import {
  IsString,
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsDateString,
  IsArray,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IDuration } from '../interface/assessment.schema';
import { AssesmentType } from 'src/common';

export class CreateAssesmentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  instruction?: string;

  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  assesment_type?: AssesmentType;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  is_enabled?: boolean;

  @IsDateString()
  @IsOptional()
  @ApiPropertyOptional()
  start_date?: Date;

  @IsDateString()
  @IsOptional()
  @ApiPropertyOptional()
  end_date?: Date;

  @IsObject()
  @IsNotEmpty()
  @ApiProperty()
  durations: IDuration;

  @IsArray()
  @IsOptional()
  @ApiPropertyOptional()
  users: [];

  @IsArray()
  @IsNotEmpty()
  @ApiPropertyOptional()
  question: Array<any>;
}
