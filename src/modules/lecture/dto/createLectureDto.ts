import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsDate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
  @IsOptional()
  video_url?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  html_content?: string;

  @IsBoolean()
  @ApiProperty()
  @IsOptional()
  has_completed?: boolean;

  @IsBoolean()
  @ApiProperty()
  @IsOptional()
  is_deleted?: boolean;

  @IsDate()
  @ApiProperty()
  @IsOptional()
  deleted_at?: Date;
}
