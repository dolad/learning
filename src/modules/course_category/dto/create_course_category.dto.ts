import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseCategory {
  @IsString()
  @IsOptional()
  @ApiProperty()
  description?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
