import {
  IsString,
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  question: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  answer: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  is_enabled?: boolean;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  question_number?: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  explanation: string;
}

export class UpdateQuestionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  question?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  answer?: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  is_enabled?: boolean;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  explanation?: string;
}
