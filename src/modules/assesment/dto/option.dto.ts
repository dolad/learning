import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOptionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  A: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  B: string;

  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  C?: string;

  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  D?: string;

  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  E?: string;
}
