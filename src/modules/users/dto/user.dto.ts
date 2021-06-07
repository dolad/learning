import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MakeAdmin {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;
}

export class ChangePassword {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}

export class UpdateUserDTO {
  @IsString()
  @IsOptional()
  @ApiProperty()
  department_id?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  branch_id?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  gender?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  phone_no?: string;
}
