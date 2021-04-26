import { IsString, IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MakeAdmin {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;
}
