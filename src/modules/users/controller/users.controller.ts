import { Body, Res, Param, Controller, Patch, Post, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Users')
@Controller('users')
export class UserController {
  //   constructor() {}

  @Get('/test')
  @ApiResponse({ status: 200, description: 'Successfully tested' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async getTest(): Promise<string> {
    return 'yes';
  }
}
