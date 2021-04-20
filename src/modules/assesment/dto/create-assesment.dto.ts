import {
  IsString,
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsDateString,
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
  @IsNotEmpty()
  @ApiProperty()
  instruction: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  assesment_type: AssesmentType;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  is_enabled?: boolean;

  @IsDateString()
  @IsOptional()
  @ApiPropertyOptional()
  month?: Date;

  @IsObject()
  @IsNotEmpty()
  @ApiProperty()
  durations: IDuration;
}
