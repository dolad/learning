import { CreateAssesmentDto } from './create-assesment.dto';
import { IsArray, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty, PartialType, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAssesmentDto extends PartialType(CreateAssesmentDto) {
  @IsArray()
  @IsOptional()
  @ApiProperty()
  anwers?: Array<string>;

  @IsDateString()
  @IsOptional()
  @ApiPropertyOptional()
  start_date?: Date;

  @IsDateString()
  @IsOptional()
  @ApiPropertyOptional()
  end_date?: Date;
}

export class SubmittingAssesment {
  @IsArray()
  @IsOptional()
  @ApiProperty()
  data?: Array<any>;
}
