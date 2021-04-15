import {
  IsString,
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsDateString,
  IsDate,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IDuration } from '../interface/assessment.schema';

export class CreateAssesmentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  instruction: string;

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
