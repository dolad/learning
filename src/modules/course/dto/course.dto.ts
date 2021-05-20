import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
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
  @ApiProperty()
  background_image?: string;
}
