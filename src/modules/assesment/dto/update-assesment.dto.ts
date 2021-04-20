import { CreateAssesmentDto } from './create-assesment.dto';
import { IsArray, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UpdateAssesmentDto extends PartialType(CreateAssesmentDto) {
  @IsArray()
  @IsOptional()
  @ApiProperty()
  anwers?: Array<string>;
}

export class SubmittingAssesment {
  @IsArray()
  @IsOptional()
  @ApiProperty()
  data?: Array<any>;
}
