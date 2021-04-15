import { PartialType } from '@nestjs/swagger';
import { CreateAssesmentDto } from './create-assesment.dto';

export class UpdateAssesmentDto extends PartialType(CreateAssesmentDto) {}
