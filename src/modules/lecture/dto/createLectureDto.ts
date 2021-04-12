import {
  IsString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsDate,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLectureDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  author: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  notes?: string;

  @IsBoolean()
  @ApiProperty()
  @IsOptional()
  is_video?: boolean;

  @IsString()
  @ApiProperty()
  video_url?: string;

  @IsString()
  @ApiProperty()
  html_content?: string;

  @IsBoolean()
  @ApiProperty()
  has_completed?: boolean;

  @IsBoolean()
  @ApiProperty()
  @IsOptional()
  is_deleted?: boolean;

  @IsDate()
  @ApiProperty()
  deleted_at?: Date;
}
